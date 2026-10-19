import PrimaryButton from "../../../../components/primary_button/primary_button";
import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import close_icon from "./../../../../assets/images/close.svg";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import MatiereService from "./matiere_service";
import Utils from "../../../../globals/Utils";
import ClassesService from "../classes/classesService";
import ProfService from "../prof/ProfService";
import GroupeMatiereService from "../groupe_matiere/groupe_matiere_service";

export default function CreateMatiere({ show, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [competence, setCompetence] = useState("");
  const [coef, setCoef] = useState(1);
  const [classes, setClasses] = useState([]);
  const [profs, setProfs] = useState([]);
  const [classe_id, set_classe_id] = useState();
  const [prof_id, set_prof_id] = useState(null);
  const [groupe_matieres, set_groupe_matieres] = useState([]);
  const [group_id, set_group_id] = useState(null);

  useEffect(() => {
    loadClasses();
    loadProfs();
    loadGroups();
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
  async function loadGroups() {
    let groupe_matieres = await GroupeMatiereService.getAll();
    let to_Insert = [];
    for (let item of groupe_matieres) {
      to_Insert.push({
        label: item.name,
        value: item.id,
      });
    }
    set_groupe_matieres(to_Insert);
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

    if (prof_id == null) {
      toast.error("Veuillez selectionner le professeur!");
      return;
    }

    await MatiereService.create({
      name: Utils.Ucase(name),
      classe_id: classe_id,
      prof_id: prof_id,
      group_id: group_id,
      coef: parseInt(coef),
      competence: competence,
    });
    toast.success("Matiere cree avec succes!");

    //Reset Form
    onClose();
    onCreate();
    setName("");
    setCompetence("");
    setCoef(1);
  }

  return (
    <div className={"create-prof " + active_class}>
      <div className="create-prof-header">
        <h2>Ajouter une matiere</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez remplir le formulaire ci-dessous</p>
      <form action="" id="create-prof-form">
        <div className="create-prof-form-content">
          <FormItem label="Nom" value={name} onChange={(val) => setName(val)} />
          <FormItem
            label="Competence evalue"
            value={competence}
            onChange={(val) => setCompetence(val)}
          />
          <FormItem
            label="Coeficient"
            value={coef}
            type="number"
            onChange={(val) => setCoef(val)}
          />
          <Select
            label="Classe"
            value={classe_id}
            data={classes}
            onChange={(val) => set_classe_id(val)}
          ></Select>
          <Select
            label="Professeur"
            value={prof_id}
            data={profs}
            onChange={(val) => set_prof_id(val)}
          ></Select>
          <Select
            label="Groupe"
            value={group_id}
            data={groupe_matieres}
            onChange={(val) => set_group_id(val)}
          ></Select>
        </div>
      </form>

      <div className="button-wrapper">
        <PrimaryButton label="Ajouter" onClick={() => create()}></PrimaryButton>
      </div>
    </div>
  );
}
