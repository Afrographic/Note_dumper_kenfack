import { useEffect, useState } from "react";
import close_icon from "./../../../../assets/images/close.svg";
import PrimaryButton from "../../../../components/primary_button/primary_button";
import Utils from "../../../../globals/Utils";
import FormItem from "./../../../../components/form_item/form_item";
import Select from "../../../../components/select/Select";
import toast from "react-hot-toast";
import MatiereService from "./matiere_service";
import ClassesService from "../classes/classesService";
import ProfService from "../prof/ProfService";
import GroupeMatiereService from "../groupe_matiere/groupe_matiere_service";

export default function EditMatiere({ matiere, show, onClose, onEdit }) {
  const [name, setName] = useState(matiere.name);
  const [competence, setCompetence] = useState(matiere.competence);
  const [coef, setCoef] = useState(matiere.coef);
  const id = matiere.id;
  const [classes, setClasses] = useState([]);
  const [profs, setProfs] = useState([]);
  const [classe_id, set_classe_id] = useState(matiere.classe_id);
  const [prof_id, set_prof_id] = useState(matiere.prof_id);
  const [groupe_matieres, set_groupe_matieres] = useState([]);
  const [group_id, set_group_id] = useState(matiere.group_id);

  useEffect(() => {
    loadClasses();
    loadProfs();
    loadGroups();
  }, []);

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

  let active_class = "";
  if (!show) {
    active_class = "inactive";
  }

  async function save() {
    if (name.trim().length == 0) {
      toast.error("Nom Invalide!");
      return;
    }

    if (classe_id == null) {
      toast.error("Veuillez selectionner la classe!");
      return;
    }

    let item = {
      id: id,
      name: Utils.Ucase(name),
      classe_id: classe_id,
      prof_id: prof_id,
      group_id: group_id,
      coef: parseInt(coef),
      competence: competence,
    };

    if (name.trim().length == 0) {
      toast.error("Nom invalide!");
      return;
    }

    await MatiereService.edit(item);
    toast.success("Matiere edite avec succes!");

    //Reset Form
    onClose();
    onEdit();
  }

  return (
    <div className="create-prof">
      <div className="create-prof-header">
        <h2>Editer une matiere</h2>
        <img src={close_icon} alt="" onClick={onClose} />
      </div>

      <p>Veuillez editer le formulaire ci-dessous</p>

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

      <div className="button-wrapper">
        <PrimaryButton
          label="Enregistrer"
          onClick={() => save()}
        ></PrimaryButton>
      </div>
    </div>
  );
}
