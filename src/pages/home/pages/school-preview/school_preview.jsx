import { useEffect, useState } from "react";
import DumperService from "../../dumper_service";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./school_preview.css";
import backImage from "./../../../../assets/images/back.svg";

export default function SchoolPreview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState({
    data: { school: "Chargement", matieres: [] },
  });
  useEffect(() => {
    getSchool();
  }, []);

  async function getSchool() {
    let schools = await DumperService.getOne(parseInt(searchParams.get("id")));
    if (schools.length > 0) {
      setSchool(schools[0]);
    } else {
      history.back();
      toast.error("Cette ecole n'existe pas!");
    }
  }

  function loadMatiere(index) {
    navigate(
      `/preview-cours?cours_id=${searchParams.get("id")}&course_index=${index}`,
    );
  }

  function loadPresence(index) {
    console.log(school.data.matieres[index].evaluations[0].eleves);
    navigate(
      `/presences?school_id=${searchParams.get("id")}&course_index=${index}`,
    );
  }

  return (
    <div className="p16">
      <img src="./images/back.svg" alt="" width={24} onClick={() => history.back()} />
      <h3>{school.data.school}</h3>
      {school.data.matieres.map((item, index) => {
        return (
          <div key={item.id} className="cours-item">
            <div>{item.name}</div>
            <div className="c-main">{item.classe.name}</div>
            <div className="button-wrapper">
              <button onClick={() => loadPresence(index)}>Presences</button>
              <button onClick={() => loadMatiere(index)}>Notes</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
