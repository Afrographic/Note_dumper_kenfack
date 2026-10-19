import FormItem from "../../components/form_item/form_item";
import PrimaryButton from "../../components/primary_button/primary_button";
import add_image_image from "../../assets/images/add-image.svg";
import ServiceSchoolConfig from "./ServiceSchoolConfig";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import YearService from "../home/pages/annee_scolaire/YearService";
import toast from "react-hot-toast";

export default function SchoolSetup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);

  let schoolInfo = {
    name: "",
    logo: "",
  };

  useEffect(() => {
    async function init() {
      let inited = await ServiceSchoolConfig.init_config();
      schoolInfo = ServiceSchoolConfig.schoolConfig;
      setName(schoolInfo.name);
      setLogo(schoolInfo.logo);
      if (inited) {
        let redirect = params.get("redirect");
        if (redirect === "true" || redirect == null) {
          navigate("/home");
        }
      }
    }
    init();
  }, []);

  async function saveInfo() {
    if (logo == null) {
      toast.error("Logo requis");
      return;
    }

    if (name.trim().length == 0) {
      toast.error("Nom de l'ecole requis");
      return;
    }

    await ServiceSchoolConfig.saveInfo({
      name: name,
      logo: logo,
    });
    toast.success("Informations de l'ecole enregistrées avec succès");
    navigate("/home");
  }

  function triggerLogoImport() {
    let logoFileImporter = document.querySelector("#logoFileImporter");
    logoFileImporter.click();
  }

  function getLogo(e) {
    let file = e.target.files[0];
    let logoSchool = document.querySelector(".logo-school");
    logoSchool.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    setLogo(file);
  }

  function getName(e) {
    schoolInfo.name = e.target.value;
  }

  return (
    <div className="container">
      <div className="c-main">Kenfack</div>
      <h1>Configuration</h1>
      <p>Veuillez inserez les informations de votre ecole</p>
      <div className="content-school-setup">
        {/* School Logo */}
        <div className="logo-school-holder">
          <input
            type="file"
            hidden
            id="logoFileImporter"
            accept="image/*"
            onChange={(e) => getLogo(e)}
          />
          <div className="logo-school" onClick={() => triggerLogoImport()}>
            <img src={add_image_image} alt="" />
          </div>
        </div>
        <div className="small tac">Cliquez pour importer le logo</div>
        <FormItem
          label="Nom de l'ecole"
          value={name}
          onChange={(val) => setName(val)}
        />
        <div className="button-wrapper">
          <PrimaryButton label="Enregistrer" onClick={() => saveInfo()} />
        </div>
      </div>
    </div>
  );
}
