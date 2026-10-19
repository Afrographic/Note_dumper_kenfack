import { useEffect, useState } from "react";
import close_icon from "./../../../../assets/images/close.svg";
import PrimaryButton from "../../../../components/primary_button/primary_button";
import ProfService from "./ProfService";
import Utils from "../../../../globals/Utils";

import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import toast from "react-hot-toast";

export default function EditProf({ prof, show, onClose, onEdit }) {
  const [name, setName] = useState(prof.name);
  const [sex, setSex] = useState(prof.sex);
  const [phone, setPhone] = useState(prof.phone);
  const [email, setEmail] = useState(prof.email);
  const id = prof.id;

  let active_class = "";
  if (!show) {
    active_class = "inactive";
  }

  async function save() {

    
    let prof_item = {
      id: id,
      name: name,
      sex: sex,
      phone: phone,
      email: email,
    };


    if (prof_item.name.trim().length == 0) {
      toast.error("Nom invalide!");
      return;
    }
    if (prof_item.email.trim().length == 0 || !prof_item.email.includes("@")) {
      toast.error("Email invalide!");
      return;
    }
    if (prof_item.phone.trim().length == 0) {
      toast.error("Phone invalide!");
      return;
    }

    await ProfService.edit_prof(prof_item);
    toast.success("Professeur editer avec succes!");

    //Reset Form
    onClose();
    onEdit();
  }

  let sex_data = [
    {
      label: "Masculin",
      value: "M",
    },
    {
      label: "Feminin",
      value: "F",
    },
  ];

  return (
    <div className="create-prof">
      <div className="create-prof-header">
        <h2>Editer un Professeur</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez editer le formulaire ci-dessous</p>

      <div className="create-prof-form-content">
        <FormItem label="Nom" value={name} onChange={(val) => setName(val)} />
        <FormItem
          label="Email"
          value={email}
          onChange={(val) => setEmail(val)}
        />
        <FormItem
          label="Téléphone"
          value={phone}
          onChange={(val) => setPhone(val)}
        />
        <Select
          label="Sexe"
          value={sex}
          data={sex_data}
          onChange={(val) => setSex(val)}
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
