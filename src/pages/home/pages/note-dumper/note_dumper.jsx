import { useEffect, useState } from "react";
import DumperService from "../../dumper_service";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import "./note_dumper.css";
import FormItem from "../../../../components/form_item/form_item";
import Utils from "../../../../globals/Utils";

export default function NoteDumper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cours_id, setCoursId] = useState(-1);
  const [evaluation_index, set_evaluation_index] = useState(-1);
  const [course_index, set_course_index] = useState(-1);
  const [evaluation_name, set_evaluation_name] = useState("Chargement...");
  const [eleves, setEleves] = useState([]);
  const [elevesBackup, setElevesBackup] = useState([]);
  const [searchToken,setSearchToken] = useState("");

  const [cours, setCours] = useState({
    name: "Chargement...",
    classe: {
      name: "chargement...",
    },
    evaluations: [],
  });

  useEffect(() => {
    getCours();
  }, []);

  async function getCours() {
    let cours_id = parseInt(searchParams.get("cours_id"));
    setCoursId(cours_id);
    let evaluation_index = parseInt(searchParams.get("evaluation_index"));
    set_evaluation_index(evaluation_index);
    set_course_index(parseInt(searchParams.get("course_index")));
    let schools = await DumperService.getOne(cours_id);
    if (schools.length > 0) {
      setCours(
        schools[0].data.matieres[parseInt(searchParams.get("course_index"))],
      );
      let eleves =
        schools[0].data.matieres[parseInt(searchParams.get("course_index"))]
          .evaluations[evaluation_index].eleves;
      setEleves(eleves);
      setElevesBackup(eleves);
      set_evaluation_name(
        schools[0].data.matieres[parseInt(searchParams.get("course_index"))]
          .evaluations[evaluation_index].name,
      );
      console.log(
        schools[0].data.matieres[parseInt(searchParams.get("course_index"))],
      );
    } else {
      history.back();
      toast.error("Cette matiere n'existe pas!");
    }
  }

  async function save_note(note, eleve_id) {
    let newEleves = [...elevesBackup];
    for (let i = 0; i <= newEleves.length - 1; i++) {
      if (newEleves[i].id == eleve_id) {
        newEleves[i].note = note;
      }
    }
    setElevesBackup(newEleves);
    let schools = await DumperService.getOne(cours_id);
    schools[0].data.matieres[course_index].evaluations[
      evaluation_index
    ].eleves = newEleves;
    await DumperService.edit(schools[0]);
  }

  async function exportNotes() {
    let schools = await DumperService.getOne(cours_id);
    console.log(schools[0].data);
    schools[0].data.matieres[course_index].evaluations =
      schools[0].data.matieres[course_index].evaluations[evaluation_index];
    Utils.downloadJSON(
      schools[0].data,
      `Notes_${evaluation_name}_${cours.name}_${cours.classe.name}_${schools[0].data.name}.json`,
    );
  }

  return (
    <div className="p16">
      <button onClick={() => history.back()}>Retour</button>
      <h2>
        Notes de {cours.name} -{" "}
        <span className="c-main">{evaluation_name}</span>
      </h2>
      <div className="row g16">
        <div className="c-main">{cours.classe.name}</div>

        <button onClick={() => exportNotes()}>Exporter les notes</button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Rechercher un eleve..."
          className="f1"
          value={searchToken}
          onChange={(el) => {
            let token = el.target.value;
            setSearchToken(token);
            if (token.length > 0) {
              let newEleves = elevesBackup.filter((item) => {
                return item.name.toLowerCase().includes(token.toLowerCase());
              });
              setEleves(newEleves);
            } else {
              setEleves(elevesBackup);
            }
          }}
        />
        <button>Fermer le rechercher</button>
      </div>

      <hr />
      {eleves.map((item, index) => {
        return (
          <div key={item.id} className="evaluation-item">
            <div> {item.name}</div>
            <input
              placeholder="Inserez la note ici..."
              value={item.note}
              onChange={(el) => {
                let note = el.target.value;
                save_note(note, item.id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
