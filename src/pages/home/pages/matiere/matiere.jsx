import PrimaryButton from "../../../../components/primary_button/primary_button";
import EmptyState from "../../../../components/empty_state/EmptyState";
import "./matiere.css";
import { useEffect, useState, useContext } from "react";
import edit_icon from "./../../../../assets/images/edit.svg";
import delete_icon from "./../../../../assets/images/delete.svg";
import Utils from "../../../../globals/Utils";
import searchImage from "./../../../../assets/images/search.svg";
import ClassesService from "../classes/classesService";
import Select from "../../../../components/select/Select";
import CreateMatiere from "./create_matiere";
import EditMatiere from "./edit_matiere";
import MatiereService from "./matiere_service";

export default function Matiere() {
  const [show_create, set_show_create] = useState(false);
  const [matieres, set_matieres] = useState([]);
  const [editing, set_editing] = useState(false);
  const [to_edit, set_to_edit] = useState({});

  const [classes, setClasses] = useState([]);
  const [classe_id, set_classe_id] = useState(null);

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
    let matieres = await MatiereService.getByClasse(classe_id);
    set_matieres(matieres);
  }

  useEffect(() => {
    loadClasses();
  }, []);

  async function delete_item(classe) {
    if (confirm("Voulez vous vraiment supprimer l'eleve ?")) {
      await MatiereService.delete(classe);
      load(classe_id);
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
        <h2>{matieres.length} Matieres</h2>
        <Select
          label="Classe"
          value={classe_id}
          data={classes}
          onChange={(val) => loadStudents(val)}
        ></Select>

        <PrimaryButton
          label="Ajouter une matiere"
          onClick={() => {
            set_show_create(true);
          }}
        />
      </div>

      <EmptyState
        visible={matieres.length == 0}
        message="Aucune matiere pour l'instant"
      />

      <CreateMatiere
        show={show_create}
        onClose={() => {
          set_show_create(false);
        }}
        onCreate={() => load(classe_id)}
      />

      {editing && (
        <EditMatiere
          matiere={to_edit}
          onClose={() => {
            set_editing(false);
          }}
          onEdit={() => {
            load(classe_id);
          }}
        ></EditMatiere>
      )}

      {/* Classes Listing */}
      <div className="prof-item-container">
        {matieres.map((matiere) => {
          return (
            <div key={matiere.id} className="classe-item">
              <div>
                <div>{matiere.name}</div>
                <div className="small">{matiere.competence}</div>
                <div className=" f1 small row g8">
                  <span className="grey">Coef - </span>
                  <span className="c-main"> {matiere.coef}</span>
                  <span className="grey">Professeur - </span>
                  <span className="c-main"> {matiere.professeur}</span>
                </div>
              </div>
              <div className="prof-actions">
                <img
                  src={edit_icon}
                  alt=""
                  title="Editer"
                  onClick={() => {
                    edit(matiere);
                  }}
                />
                <img
                  src={delete_icon}
                  alt=""
                  title="Supprimer"
                  onClick={() => {
                    delete_item(matiere);
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
