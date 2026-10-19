import PrimaryButton from "../../../../components/primary_button/primary_button";
import EmptyState from "../../../../components/empty_state/EmptyState";
import "./annee_scolaire.css";
import { useEffect, useState } from "react";
import edit_icon from "./../../../../assets/images/edit.svg";
import delete_icon from "./../../../../assets/images/delete.svg";
import Utils from "../../../../globals/Utils";
import CreateAnnee from "./create_annee";
import EditAnnee from "./edit_annee";
import YearService from "./YearService";

export default function AnneeScolaire() {
  const [show_create, set_show_create] = useState(false);
  const [years, set_years] = useState([]);
  const [editing, set_editing] = useState(false);
  const [to_edit, set_to_edit] = useState({});

  async function load() {
    let years = await YearService.getAll();
    set_years(years);
  }

  useEffect(() => {
    load();
  }, []);

  async function delete_item(year) {
    if (confirm("Voulez vous vraiment supprimer l'annee scolaire ?")) {
      await YearService.delete(year);
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
        <h2>{years.length} Annee Scolaire</h2>
        <PrimaryButton
          label="Ajouter une annee scolaire"
          onClick={() => {
            set_show_create(true);
          }}
        />
      </div>
      <EmptyState
        visible={years.length == 0}
        message="Aucune annee scolaire pour l'instant"
      />

      <CreateAnnee
        show={show_create}
        onClose={() => {
          set_show_create(false);
        }}
        onCreate={() => load()}
      />

      {editing && (
        <EditAnnee
          year={to_edit}
          onClose={() => {
            set_editing(false);
          }}
          onEdit={() => {
            load();
          }}
        ></EditAnnee>
      )}

      {/* Classes Listing */}
      <div className="prof-item-container">
        {years.map((year) => {
          return (
            <div key={year.id} className="classe-item">
              <div>{year.name}</div>
              <div className="prof-actions">
                <img
                  src={edit_icon}
                  alt=""
                  title="Editer"
                  onClick={() => {
                    edit(year);
                  }}
                />
                <img
                  src={delete_icon}
                  alt=""
                  title="Supprimer"
                  onClick={() => {
                    delete_item(year);
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
