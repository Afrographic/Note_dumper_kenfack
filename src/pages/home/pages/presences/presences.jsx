import { useEffect, useState } from "react";
import DumperService from "../../dumper_service";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import "./presences.css";
import FormItem from "../../../../components/form_item/form_item";
import Utils from "../../../../globals/Utils";
import ToggleButtonComponent from "../../../../components/ToggleButton/ToggleButton";
import backImage from "./../../../../assets/images/back.svg";

export default function Presences() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cours_id, setCoursId] = useState(-1);
  const [evaluation_index, set_evaluation_index] = useState(-1);
  const [course_index, set_course_index] = useState(-1);
  const [evaluation_name, set_evaluation_name] = useState("Chargement...");
  const [eleves, setEleves] = useState([]);
  const [elevesBackup, setElevesBackup] = useState([]);
  const [searchToken, setSearchToken] = useState("");
  const [date, set_date] = useState("");

  const [cours, setCours] = useState({
    name: "Chargement...",
    classe: {
      name: "chargement...",
    },
    evaluations: [],
  });

  useEffect(() => {
    getCours();
    //Compute current date
  }, []);

  async function getCours() {
    let cours_id = parseInt(searchParams.get("school_id"));
    setCoursId(cours_id);
    let schools = await DumperService.getOne(cours_id);
    if (schools.length > 0) {
      setCours(
        schools[0].data.matieres[parseInt(searchParams.get("course_index"))],
      );
      let eleves =
        schools[0].data.matieres[parseInt(searchParams.get("course_index"))]
          .evaluations[0].eleves;
      for (let i = 0; i <= eleves.length - 1; i++) {
        eleves[i].present = false;
        eleves[i].cours_id =
          schools[0].data.matieres[
            parseInt(searchParams.get("course_index"))
          ].id;
      }
      setEleves(eleves);
      setElevesBackup(eleves);
    } else {
      //history.back();
      toast.error("Cette matiere n'existe pas!");
    }
  }

  async function exportFicheAppel() {
    let schools = await DumperService.getOne(
      parseInt(searchParams.get("school_id")),
    );
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    for (let i = 0; i <= eleves.length - 1; i++) {
      eleves[i].year = year;
      eleves[i].month = month;
      eleves[i].day = day;
    }

    Utils.downloadJSON(
      eleves,
      `Presences_du_${year}_${month}_${day}_${cours.name}_${cours.classe.name}_${schools[0].data.name}.json`,
    );
  }

  return (
    <div className="p16">
      <img src={backImage} alt="" width={24} onClick={() => history.back()} />

      <h2>Appel au cours de {cours.name}</h2>
      <div className="row g16">
        <div className="c-main">{cours.classe.name}</div>
      </div>
      <center>
        <div className="bold" style={{ marginTop: "16px" }}>
          {Utils.getCurrentDateInFrench()}
        </div>
      </center>

      <div style={{ height: "16px" }}></div>
      <center>
        <button onClick={() => exportFicheAppel()}>
          Exporter la fiche d'appel
        </button>
      </center>
      <div style={{ height: "16px" }}></div>

      {eleves.map((item, index) => {
        return (
          <div key={item.id} className="presence-item">
            <div> {item.name}</div>
            <ToggleButtonComponent
              onChange={(val) => {
                let newEleves = [...eleves];
                newEleves[index].present = val;
                setEleves(newEleves);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
