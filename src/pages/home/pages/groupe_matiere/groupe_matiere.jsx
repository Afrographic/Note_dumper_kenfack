import PrimaryButton from "../../../../components/primary_button/primary_button";
import EmptyState from "../../../../components/empty_state/EmptyState";
import "./groupe_matiere.css";
import { useEffect, useState } from "react";
import edit_icon from "./../../../../assets/images/edit.svg";
import delete_icon from "./../../../../assets/images/delete.svg";
import Utils from "../../../../globals/Utils";
import GroupeMatiereService from "./groupe_matiere_service";
import EditGroupeMatiere from "./edit_groupe_matiere";
import CreateGroupeMatiere from "./create_groupe_matiere";

export default function GroupeMatiere() {
  const [show_create, set_show_create] = useState(false);
  const [groupe_matieres, set_groupe_matieres] = useState([]);
  const [editing, set_editing] = useState(false);
  const [to_edit, set_to_edit] = useState({});

  async function load() {
    let groupe_matieres = await GroupeMatiereService.getAll();
    set_groupe_matieres(groupe_matieres);
  }

  useEffect(() => {
    load();
  }, []);

  async function delete_item(groupe_matiere) {
    if (confirm("Voulez vous vraiment supprimer le groupe de matiere ?")) {
      await GroupeMatiereService.delete(groupe_matiere);
      load();
    }
  }

  async function edit(year) {
    set_editing(false);
    await Utils.sleep(50);
    set_to_edit(year);
    set_editing(true);
  }

  return (
    <div>
      <div className="page-title">
        <h2>{groupe_matieres.length} Groupes de matieres</h2>
        <PrimaryButton
          label="Ajouter un groupe de matiere"
          onClick={() => {
            set_show_create(true);
          }}
        />
      </div>

      <EmptyState
        visible={groupe_matieres.length == 0}
        message="Aucun groupe de matiere disponible pour l'instant"
      />

      <CreateGroupeMatiere
        show={show_create}
        onClose={() => {
          set_show_create(false);
        }}
        onCreate={() => load()}
      />

      {editing && (
        <EditGroupeMatiere
          year={to_edit}
          onClose={() => {
            set_editing(false);
          }}
          onEdit={() => {
            load();
          }}
        />
      )}

      {/* Classes Listing */}
      <div className="prof-item-container">
        {groupe_matieres.map((groupe_matiere) => {
          return (
            <div key={groupe_matiere.id} className="classe-item">
              <div>{groupe_matiere.name}</div>
              <div className="prof-actions">
                <img
                  src={edit_icon}
                  alt=""
                  title="Editer"
                  onClick={() => {
                    edit(groupe_matiere);
                  }}
                />
                <img
                  src={delete_icon}
                  alt=""
                  title="Supprimer"
                  onClick={() => {
                    delete_item(groupe_matiere);
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
