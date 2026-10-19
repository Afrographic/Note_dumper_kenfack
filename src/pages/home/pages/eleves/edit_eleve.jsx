import { useEffect, useState } from "react";
import close_icon from "./../../../../assets/images/close.svg";
import PrimaryButton from "../../../../components/primary_button/primary_button";
import Utils from "../../../../globals/Utils";

import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import toast from "react-hot-toast";
import EleveService from "./eleve_service";
import ClassesService from "../classes/classesService";

export default function EditEleve({ eleve, show, onClose, onEdit }) {
  const [name, setName] = useState(eleve.name);
  const [sex, setSex] = useState(eleve.sex);
  const [classe_id, set_classe_id] = useState(eleve.classe_id);
  const [dateDeNaissance, setDateDeNaissance] = useState(eleve.dateDeNaissance);
  const [lieuDeNaissance, setLieuDeNaissance] = useState(eleve.lieuDeNaissance);
  const [nomDuParent, setNomDuParent] = useState(eleve.nomDuParent);
  const [numeroDuParent, setNumeroDuParent] = useState(eleve.numeroDuParent);
  const [classes, setClasses] = useState([]);
  
  const id = eleve.id;

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

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    let classes = await ClassesService.getAll();
    let classesToInsert = [];
    for (let item of classes) {
      classesToInsert.push({
        label: item.name,
        value: item.id,
      });
    }
    setClasses(classesToInsert);
  }

  let active_class = "";
  if (!show) {
    active_class = "inactive";
  }

  async function save() {
    let item = {
      id: id,
      name: Utils.Ucase(name),
      sex,
      classe_id,
      dateDeNaissance,
      lieuDeNaissance,
      nomDuParent,
      numeroDuParent,
    };

    if (name.trim().length == 0) {
      toast.error("Nom Invalide!");
      return;
    }
    if (classe_id == null) {
      toast.error("Veuillez selectionner la classe!");
      return;
    }
    if (dateDeNaissance.trim().length == 0) {
      toast.error("Date de naissance Invalide!");
      return;
    }
    if (lieuDeNaissance.trim().length == 0) {
      toast.error("Lieu de naissance Invalide!");
      return;
    }
    if (nomDuParent.trim().length == 0) {
      toast.error("Nom du parent Invalide!");
      return;
    }
    if (numeroDuParent.trim().length == 0) {
      toast.error("Numero du parent Invalide!");
      return;
    }

    await EleveService.edit(item);
    toast.success("Classe editer avec succes!");

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
          label="Sexe"
          value={sex}
          data={sex_data}
          onChange={(val) => setSex(val)}
        ></Select>
        <Select
          label="Classe"
          value={classe_id}
          data={classes}
          onChange={(val) => set_classe_id(val)}
        ></Select>
        <FormItem
          type="date"
          label="Date de naissance"
          value={dateDeNaissance}
          onChange={(val) => setDateDeNaissance(val)}
        />
        <FormItem
          label="Lieu de naissance"
          value={lieuDeNaissance}
          onChange={(val) => setLieuDeNaissance(val)}
        />
        <FormItem
          label="Nom du parent"
          value={nomDuParent}
          onChange={(val) => setNomDuParent(val)}
        />
        <FormItem
          label="Numero du parent"
          value={numeroDuParent}
          onChange={(val) => setNumeroDuParent(val)}
        />
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
