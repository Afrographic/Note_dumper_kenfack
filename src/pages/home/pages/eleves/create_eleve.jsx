import PrimaryButton from "../../../../components/primary_button/primary_button";
import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import close_icon from "./../../../../assets/images/close.svg";
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import EleveService from "./eleve_service";
import ClassesService from "../classes/classesService";
import Utils from "../../../../globals/Utils";
import { TotalStudentContext } from "../../../../App";

export default function CreateEleve({ show, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("M");
  const [classe_id, set_classe_id] = useState(null);
  const [dateDeNaissance, setDateDeNaissance] = useState("");
  const [lieuDeNaissance, setLieuDeNaissance] = useState("");
  const [nomDuParent, setNomDuParent] = useState("");
  const [numeroDuParent, setNumeroDuParent] = useState("");
  const [classes, setClasses] = useState([]);

  const [totalStudent, setTotalStudent] = useContext(TotalStudentContext);

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

  async function create() {
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

    await EleveService.create({
      name: Utils.Ucase(name),
      sex,
      classe_id,
      dateDeNaissance,
      lieuDeNaissance,
      nomDuParent,
      numeroDuParent,
    });
    toast.success("Eleve cree avec succes!");

    let eleves = await EleveService.getAll();
    setTotalStudent(eleves.length);

    //Reset Form
    onClose();
    onCreate();
    setName("");
    setDateDeNaissance("");
    setLieuDeNaissance("");
    setNomDuParent("");
    setNumeroDuParent("");
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
    <div className={"create-prof " + active_class}>
      <div className="create-prof-header">
        <h2>Ajouter un eleve</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez remplir le formulaire ci-dessous</p>
      <form action="" id="create-prof-form">
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
      </form>

      <div className="button-wrapper">
        <PrimaryButton
          label="Ajouter un eleve"
          onClick={() => create()}
        ></PrimaryButton>
      </div>
    </div>
  );
}
