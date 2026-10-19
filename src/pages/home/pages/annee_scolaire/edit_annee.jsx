import { useEffect, useState } from "react";
import close_icon from "./../../../../assets/images/close.svg";
import PrimaryButton from "../../../../components/primary_button/primary_button";
import Utils from "../../../../globals/Utils";

import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import toast from "react-hot-toast";
import YearService from "./YearService";


export default function EditAnnee({ year, show, onClose, onEdit }) {
  const [name, setName] = useState(year.name);
  const id = year.id;

  let active_class = "";
  if (!show) {
    active_class = "inactive";
  }

  async function save() {
    let item = {
      id: id,
      name: name,
    };


    if (name.trim().length == 0) {
      toast.error("Nom invalide!");
      return;
    }
    

    await YearService.edit(item);
    toast.success("Classe editer avec succes!");

    //Reset Form
    onClose();
    onEdit();
  }


  return (
    <div className="create-prof">
      <div className="create-prof-header">
        <h2>Editer une annee scolaire</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez editer le formulaire ci-dessous</p>

      <div className="create-prof-form-content">
        <FormItem label="Nom" value={name} onChange={(val) => setName(val)} />
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
