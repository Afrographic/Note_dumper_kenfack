import PrimaryButton from "../../../../components/primary_button/primary_button";
import EmptyState from "../../../../components/empty_state/EmptyState";
import "./classes.css";
import { useEffect, useState } from "react";
import ClassesService from "./ClassesService";
import CreateClasses from "./create_classes";
import edit_icon from "./../../../../assets/images/edit.svg";
import delete_icon from "./../../../../assets/images/delete.svg";
import EditClasse from "./edit_classe";
import Utils from "../../../../globals/Utils";

export default function Classes() {
  const [show_create_classe, set_show_create_classe] = useState(false);
  const [classes, set_classes] = useState([]);
  const [editing, set_editing] = useState(false);
  const [to_edit, set_to_edit] = useState({});

  async function load() {
    let classes = await ClassesService.getAll();
    set_classes(classes);
  }

  useEffect(() => {
    load();
  }, []);

  async function delete_item(classe) {
    if (confirm("Voulez vous vraiment supprimer la classe ?")) {
      await ClassesService.delete(classe);
      load();
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
      <div className="page-title">
        <h2>{classes.length} Classes</h2>
        <PrimaryButton
          label="Ajouter une classe"
          onClick={() => {
            set_show_create_classe(true);
          }}
        />
      </div>
      <EmptyState
        visible={classes.length == 0}
        message="Aucune classe pour l'instant"
      />

      <CreateClasses
        show={show_create_classe}
        onClose={() => {
          set_show_create_classe(false);
        }}
        onCreate={() => load()}
      />

      {editing && (
        <EditClasse
          classe={to_edit}
          onClose={() => {
            set_editing(false);
          }}
          onEdit={() => {
            load();
          }}
        ></EditClasse>
      )}

      {/* Classes Listing */}
      <div className="prof-item-container">
        {classes.map((classe) => {
          return (
            <div key={classe.id} className="classe-item">
              <div>
                <div> {classe.name}</div>
                <div className=" f1 small row g8">
                  <span className="grey">Professeur Titulaire - </span>
                  <span className="c-main"> {classe.prof_titulaire}</span>
                </div>
              </div>

              <div className="prof-actions">
                <img
                  src={edit_icon}
                  alt=""
                  title="Editer"
                  onClick={() => {
                    edit(classe);
                  }}
                />
                <img
                  src={delete_icon}
                  alt=""
                  title="Supprimer"
                  onClick={() => {
                    delete_item(classe);
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
