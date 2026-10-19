import { useEffect, useState } from "react";
import close_icon from "./../../../../assets/images/close.svg";
import PrimaryButton from "../../../../components/primary_button/primary_button";
import Utils from "../../../../globals/Utils";

import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import toast from "react-hot-toast";
import classesService from "./classesService";
import ProfService from "../prof/ProfService";

export default function EditClasse({ classe, show, onClose, onEdit }) {
  const [name, setName] = useState(classe.name);
  const id = classe.id;

  const [profs, setProfs] = useState([]);
  const [prof_id, set_prof_id] = useState(classe.prof_id);

  useEffect(() => {
    loadProfs();
  }, []);

  async function loadProfs() {
    let profs = await ProfService.get_profs();
    let to_Insert = [];
    for (let item of profs) {
      to_Insert.push({
        label: item.name,
        value: item.id,
      });
    }
    setProfs(to_Insert);
  }

  let active_class = "";
  if (!show) {
    active_class = "inactive";
  }

  async function save() {
    let item = {
      id: id,
      name: name,
      prof_id: prof_id,
    };

    if (name.trim().length == 0) {
      toast.error("Nom invalide!");
      return;
    }

    if (prof_id == null) {
      toast.error("Veuillez selectionner le professeur titulaire!");
      return;
    }

    await classesService.edit(item);
    toast.success("Classe edite avec succes!");

    //Reset Form
    onClose();
    onEdit();
  }

  return (
    <div className="create-prof">
      <div className="create-prof-header">
        <h2>Editer une classe</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez editer le formulaire ci-dessous</p>

      <div className="create-prof-form-content">
        <FormItem label="Nom" value={name} onChange={(val) => setName(val)} />
        <Select
          label="Professeur Titulaire"
          value={prof_id}
          data={profs}
          onChange={(val) => set_prof_id(val)}
        ></Select>
      </div>

      <div className="button-wrapper">
        <PrimaryButton
          label="Enregistrer"
          onClick={() => save()}
        ></PrimaryButton>
      </div>
    </div>
  );
}
