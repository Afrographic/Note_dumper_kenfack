import PrimaryButton from "../../../../components/primary_button/primary_button";
import EmptyState from "../../../../components/empty_state/EmptyState";
import "./eleves.css";
import { useEffect, useState, useContext } from "react";
import edit_icon from "./../../../../assets/images/edit.svg";
import delete_icon from "./../../../../assets/images/delete.svg";
import Utils from "../../../../globals/Utils";
import EleveService from "./eleve_service";
import EditEleve from "./edit_eleve";
import CreateEleve from "./create_eleve";
import searchImage from "./../../../../assets/images/search.svg";
import ClassesService from "../classes/classesService";
import Select from "../../../../components/select/Select";
import { TotalStudentContext } from "../../../../App";

import male from "./../../../../assets/images/male.svg";
import female from "./../../../../assets/images/female.svg";

export default function Eleves() {
  const [show_create, set_show_create] = useState(false);
  const [eleves, set_eleves] = useState([]);
  const [editing, set_editing] = useState(false);
  const [to_edit, set_to_edit] = useState({});

  const [classes, setClasses] = useState([]);
  const [classe_id, set_classe_id] = useState(null);

  const [totalStudent, setTotalStudent] = useContext(TotalStudentContext);

  function loadStudents(val) {
    set_classe_id(val);
    load(val);
  }

  async function loadClasses() {
    let classes = await ClassesService.getAll();
    let classesToInsert = [];
    for (let item of classes) {
      classesToInsert.push({
        label: item.name,
        value: item.id,
      });
    }
    if (classesToInsert.length > 0) {
      set_classe_id(classesToInsert[0].value);
      load(classesToInsert[0].value);
    }

    setClasses(classesToInsert);
  }

  async function load(classe_id) {
    let eleves = await EleveService.getByClasse(classe_id);
    set_eleves(eleves);
  }

  useEffect(() => {
    loadClasses();
  }, []);

  async function delete_item(classe) {
    if (confirm("Voulez vous vraiment supprimer l'eleve ?")) {
      await EleveService.delete(classe);
      load(classe_id);
      let eleves = await EleveService.getAll();
      setTotalStudent(eleves.length);
    }
  }

  async function edit(classe) {
    set_editing(false);
    await Utils.sleep(50);
    set_to_edit(classe);
    set_editing(true);
  }

  return (
    <div>
      <div className="page-title eleve-title">
        <h2>{eleves.length} Eleves</h2>
        <Select
          label="Classe"
          value={classe_id}
          data={classes}
          onChange={(val) => loadStudents(val)}
        ></Select>

        <div className="search-box">
          <input type="text" placeholder="Recherche..." />
          <img src={searchImage} alt="" />
        </div>
        <PrimaryButton
          label="Ajouter un eleve"
          onClick={() => {
            set_show_create(true);
          }}
        />
      </div>
      <EmptyState
        visible={eleves.length == 0}
        message="Aucun eleve pour l'instant"
      />

      <CreateEleve
        show={show_create}
        onClose={() => {
          set_show_create(false);
        }}
        onCreate={() => load(classe_id)}
      />

      {editing && (
        <EditEleve
          eleve={to_edit}
          onClose={() => {
            set_editing(false);
          }}
          onEdit={() => {
            load();
          }}
        ></EditEleve>
      )}

      {/* Classes Listing */}
      <div className="prof-item-container">
        {eleves.map((eleve) => {
          return (
            <div key={eleve.id} className="classe-item">
              <div className="eleve-item">
                {eleve.sex === "M" ? (
                  <img src={male} alt="" className="prof-sex-image" />
                ) : (
                  <img src={female} alt="" className="prof-sex-image" />
                )}
                <div>
                  <div>{eleve.name}</div>

                  <div className=" f1 small row g8">
                    <span className="grey">Matricule - </span>
                    <span className="c-main"> {eleve.matricule}</span>
                  </div>
                </div>
              </div>

              <div className="prof-actions">
                <img
                  src={edit_icon}
                  alt=""
                  title="Editer"
                  onClick={() => {
                    edit(eleve);
                  }}
                />
                <img
                  src={delete_icon}
                  alt=""
                  title="Supprimer"
                  onClick={() => {
                    delete_item(eleve);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
