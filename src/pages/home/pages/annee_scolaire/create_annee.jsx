import PrimaryButton from "../../../../components/primary_button/primary_button";
import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import close_icon from "./../../../../assets/images/close.svg";
import { useState } from "react";
import toast from "react-hot-toast";
import YearService from "./YearService";

export default function CreateAnnee({ show, onClose, onCreate }) {
  const [name, setName] = useState(""); 

  let active_class = "";
  if (!show) {
    active_class = "inactive";
  }

  async function create_prof() {
    if (name.trim().length == 0) {
      toast.error("Nom Invalide!");
      return;
    }
   
    await YearService.create({
      name: name,
    });
    toast.success("Classe cree avec succes!");

    //Reset Form
    onClose();
    onCreate();
    setName("");
  }

  return (
    <div className={"create-prof " + active_class}>
      <div className="create-prof-header">
        <h2>Ajouter une annee scolaire</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez remplir le formulaire ci-dessous</p>
      <form action="" id="create-prof-form">
        <div className="create-prof-form-content">
          <FormItem label="Nom" value={name} onChange={(val) => setName(val)} />
        </div>
      </form>

      <div className="button-wrapper">
        <PrimaryButton
          label="Ajouter"
          onClick={() => create_prof()}
        ></PrimaryButton>
      </div>
    </div>
  );
}
