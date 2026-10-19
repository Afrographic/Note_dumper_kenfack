import { Outlet } from "react-router-dom";
import YearService from "./pages/annee_scolaire/YearService";
import { useEffect, useState, useContext } from "react";
import ServiceSchoolConfig from "../school-config/ServiceSchoolConfig";
import { useNavigate } from "react-router-dom";
import { TotalStudentContext } from "../../App";
import EleveService from "./pages/eleves/eleve_service";

export default function Home() {
  const navigate = useNavigate();

  const [school_year, set_school_year] = useState("");

  const [totalStudent, setTotalStudent] = useContext(TotalStudentContext);

  function go_to_config() {
    navigate("/?redirect=false");
  }

  function goToClasses() {
    navigate("/home/classes");
  }

  function goToProf() {
    navigate("/home");
  }

  function goToMatiere() {
    navigate("/home/matiere");
  }

  function goToGroupeMatiere() {
    navigate("/home/groupe-matiere");
  }

  function goToEleves() {
    navigate("/home/eleves");
  }

  function goToYear() {
    navigate("/home/annee-scolaire");
  }
  function goToNote() {
    navigate("/home/note");
  }

  useEffect(() => {
    async function set_school_name_and_logo() {
      await ServiceSchoolConfig.init_config();
      let eleves = await EleveService.getAll();
      setTotalStudent(eleves.length);

      let schoolConfig = ServiceSchoolConfig.schoolConfig;
      if (schoolConfig) {
        let logoSchool = document.querySelector("#school-logo");
        logoSchool.style.backgroundImage = `url(${URL.createObjectURL(schoolConfig.logo)})`;
        let nameSchoolUI = document.querySelector("#school-name");
        nameSchoolUI.innerHTML = schoolConfig.name;
      }
    }
    set_school_name_and_logo();
  }, []);

  return (
    <div className="home">
      <div className="side-bar">
        <div className="c-main title">Kenfack</div>
        <div className="side-bar-btn-block">
          <div className="side-bar-btn" onClick={() => goToYear()}>
            <div>Annee Scolaire</div>
          </div>
          <div className="side-bar-btn" onClick={() => goToClasses()}>
            <div>Classes</div>
          </div>
          <div className="side-bar-btn" onClick={() => goToProf()}>
            <div>Professeurs</div>
          </div>
          <div className="side-bar-btn" onClick={() => goToEleves()}>
            <div>Eleves</div>
          </div>

          <div className="side-bar-btn" onClick={() => goToGroupeMatiere()}>
            <div>Groupe de Matieres</div>
          </div>
          <div className="side-bar-btn" onClick={() => goToMatiere()}>
            <div>Matieres</div>
          </div>

          <div className="side-bar-btn" onClick={() => goToNote()}>
            <div>Sequences</div>
          </div>
          
          <div className="side-bar-btn" onClick={() => goToNote()}>
            <div>Notes</div>
          </div>

          <div className="side-bar-btn" onClick={() => goToEleves()}>
            <div>Bulletins</div>
          </div>

          <div className="f1"></div>

          <div className="side-bar-btn" onClick={() => go_to_config()}>
            <div>Configuration</div>
          </div>
        </div>
      </div>

      <div className="f1">
        <div className="school-header">
          <div id="school-logo"></div>
          <div>
            <div id="school-name">Lycee Bilingue de Dschang</div>
            <div>{totalStudent} Eleves</div>
          </div>
          <div className="f1"></div>
          {/* <div className="c-main">Annee Scolaire {school_year}</div> */}
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
