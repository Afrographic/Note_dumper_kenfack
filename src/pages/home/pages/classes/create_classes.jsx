import PrimaryButton from "../../../../components/primary_button/primary_button";
import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import close_icon from "./../../../../assets/images/close.svg";
import classesService from "./classesService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProfService from "../prof/ProfService";

export default function CreateClasses({ show, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [profs, setProfs] = useState([]);
  const [prof_id, set_prof_id] = useState(null);

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

  async function create() {
    if (name.trim().length == 0) {
      toast.error("Nom Invalide!");
      return;
    }

    if (prof_id == null) {
      toast.error("Veuillez selectionner le professeur titulaire!");
      return;
    }

    await classesService.create({
      name: name,
      prof_id: prof_id,
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
        <h2>Ajouter une classe</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez remplir le formulaire ci-dessous</p>
      <form action="" id="create-prof-form">
        <div className="create-prof-form-content">
          <FormItem label="Nom" value={name} onChange={(val) => setName(val)} />
          <Select
            label="Professeur Titulaire"
            value={prof_id}
            data={profs}
            onChange={(val) => set_prof_id(val)}
          ></Select>
        </div>
      </form>

      <div className="button-wrapper">
        <PrimaryButton
          label="Ajouter la classe"
          onClick={() => create()}
        ></PrimaryButton>
      </div>
    </div>
  );
}
