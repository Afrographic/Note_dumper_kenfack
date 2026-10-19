import { useNavigate } from "react-router-dom";
import Utils from "../../globals/Utils";
import "./home.css";
import { useState, useEffect } from "react";
import DumperService from "./dumper_service";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);

  async function importProfil() {
    try {
      const data = await Utils.importJSON();
      if (data.matieres && data.school) {
        await DumperService.create({ data: data });
      } else {
        toast.error("Profile corrumpu!");
      }
      loadSchools();
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    loadSchools();
  }, []);

  async function loadSchools() {
    let schools = await DumperService.getAll();
    setSchools(schools);
    console.log(schools);
  }

  async function delete_item(school) {
    if (
      confirm("Voulez vous vraiment supprimer votre profil pour cette ecole?")
    ) {
      await DumperService.delete(school);
      loadSchools();
    }
  }

  function loadSchoolView(school) {
    navigate(`/preview-school?id=${school.id}`);
  }

  return (
    <div className="p16">
      <h2>Note dumper</h2>

      <button onClick={() => importProfil()}>Importer un profil</button>
      <hr />
      <div>
        <h2>{schools.length} Ecoles</h2>
        {schools.map((school) => {
          return (
            <div key={school.id} className="school-item">
              <div className="f1" onClick={() => loadSchoolView(school)}>
                <div>
                  {" "}
                  {school.data.school} -{" "}
                  <span className="c-main">
                    {school.data.matieres.length} Cours
                  </span>{" "}
                </div>
                <div className="c-main small">M. {school.data.name}</div>
              </div>
              <button onClick={() => delete_item(school)}>Supprimer</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
