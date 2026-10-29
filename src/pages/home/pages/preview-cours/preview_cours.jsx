import { useEffect, useState } from "react";
import DumperService from "../../dumper_service";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import backImage from "./../../../../assets/images/back.svg";

import "./preview_cours.css";

export default function PreviewCours() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
    let schools = await DumperService.getOne(cours_id);
    if (schools.length > 0) {
      setCours(
        schools[0].data.matieres[parseInt(searchParams.get("course_index"))],
      );
    } else {
      history.back();
      toast.error("Cette matiere n'existe pas!");
    }
  }

  function loadEvaluations(index) {
    navigate(
      `/note-dumper?cours_id=${searchParams.get("cours_id")}&course_index=${searchParams.get("course_index")}&evaluation_index=${index}`,
    );
  }

  return (
    <div className="p16">
      <img src={backImage} alt="" width={24} onClick={() => history.back()} />

      <h2 style={{margin:'0px',marginTop:'16px'}}>{cours.name}</h2>
      <div className="c-main" style={{marginBottom:'16px'}}>{cours.classe.name}</div>
     
      {cours.evaluations.map((item, index) => {
        return (
          <div
            key={item.id}
            className="evaluation-item"
            onClick={() => loadEvaluations(index)}
          >
            <div> {item.name}</div>
          </div>
        );
      })}
    </div>
  );
}
