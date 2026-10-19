import PrimaryButton from "../../../../components/primary_button/primary_button";
import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import close_icon from "./../../../../assets/images/close.svg";

import ProfService from "./ProfService";
import { useState } from "react";
import toast from "react-hot-toast";
import Utils from "../../../../globals/Utils";

export default function CreateProf({ show, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("M");

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

  let active_class = "";
  if (!show) {
    active_class = "inactive";
  }

  async function create_prof() {
    if (name.trim().length == 0) {
      toast.error("Nom Invalide!");
      return;
    }
    if (email.trim().length == 0 || !email.includes("@")) {
      toast.error("Email Invalide!");
      return;
    }
    if (phone.trim().length == 0) {
      toast.error("Telephone Invalide!");
      return;
    }

    await ProfService.create_prof({
      name: Utils.Ucase(name),
      phone: phone,
      email: email,
      sex: sex,
    });
    toast.success("Professeur cree avec succes!");

    //Reset Form
    onClose();
    onCreate();
    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <div className={"create-prof " + active_class}>
      <div className="create-prof-header">
        <h2>Ajouter un Professeur</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez remplir le formulaire ci-dessous</p>
      <form action="" id="create-prof-form">
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
      </form>

      <div className="button-wrapper">
        <PrimaryButton
          label="Ajouter le professeur"
          onClick={() => create_prof()}
        ></PrimaryButton>
      </div>
    </div>
  );
}
