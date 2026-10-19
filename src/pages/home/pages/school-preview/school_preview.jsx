import { useEffect, useState } from "react";
import DumperService from "../../dumper_service";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./school_preview.css";

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
    console.log(schools[0]);
  }

  function loadMatiere(index){
    navigate(`/preview-cours?cours_id=${searchParams.get("id")}&course_index=${index}`)
  }

  return (
    <div className="p16">
      <button onClick={() => history.back()}>Retour</button>
      <h3>{school.data.school}</h3>
      <hr />
      {school.data.matieres.map((item,index) => {
        return (
          <div key={item.id} className="cours-item" onClick={()=>loadMatiere(index)}>
            <div>{item.name}</div>
            <div className="c-main">{item.classe.name}</div>
          </div>
        );
      })}
    </div>
  );
}
