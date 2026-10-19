import { useEffect, useState } from "react";
import EmptyState from "../../../../components/empty_state/EmptyState";
import PrimaryButton from "../../../../components/primary_button/primary_button";
import CreateProf from "./CreateProf";
import ProfService from "./ProfService";
import ProfItem from "./ProfItem";
import EditProf from "./EditProf";
import Utils from "../../../../globals/Utils";
import "./prof.css";

export default function Prof() {
  const [show_create_prof, set_show_create_prof] = useState(false);
  const [profs, set_profs] = useState([]);
  const [editing, set_editing] = useState(false);
  const [prof_to_edit, set_prof_to_edit] = useState({});

  function create_prof() {
    set_show_create_prof(true);
  }

  function load_prof() {
    async function load_profs() {
      let profs = await ProfService.get_profs();
      set_profs(profs);
    }
    load_profs();
  }

  useEffect(() => {
    load_prof();
  }, []);

  async function delete_prof(prof) {
    if (confirm("Voulez vous vraiment supprimer le professeur ?")) {
      await ProfService.delete_prof(prof);
      load_prof();
    }
  }

  async function edit_prof(prof) {
    set_editing(false);
    await Utils.sleep(50);
    set_prof_to_edit(prof);
    set_editing(true);
  }

  return (
    <div>
      <div className="prof-header">
        <h2>{profs.length} Professeurs</h2>
        <PrimaryButton
          label="Ajouter un Professeur"
          onClick={() => create_prof()}
        />
      </div>
      <EmptyState
        visible={profs.length == 0}
        message="Aucun professeur pour l'instant"
      />

      <CreateProf
        show={show_create_prof}
        onClose={() => {
          set_show_create_prof(false);
        }}
        onCreate={() => load_prof()}
      />

      {editing && (
        <EditProf
          prof={prof_to_edit}
          onClose={() => {
            set_editing(false);
          }}
          onEdit={() => {
            load_prof();
          }}
        ></EditProf>
      )}

      {/* Profs Listing */}
      <div className="prof-item-container">
        {profs.map((prof) => {
          return (
            <ProfItem
              key={prof.id}
              prof={prof}
              onDelete={() => delete_prof(prof)}
              onEdit={() => edit_prof(prof)}
            />
          );
        })}
      </div>
    </div>
  );
}
