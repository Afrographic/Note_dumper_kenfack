import Utils from "../../globals/Utils";
import Repo_School_Config from "./RepoSchoolConfig";

export default class ServiceSchoolConfig {
  static schoolConfig = {
    name: "",
    logo: null,
  };

  static async saveInfo(schoolInfo) {
    let insertedId = await Repo_School_Config.save(schoolInfo);
    return insertedId;
  }

  static async init_config() {
    let schoolConfigs = await Repo_School_Config.get_all();
    if (schoolConfigs.length > 0) {
      // Prefill the form with the first config
      let schoolConfig = schoolConfigs[0];
      let logoSchool = document.querySelector(".logo-school");
      if (logoSchool != undefined)
        logoSchool.style.backgroundImage = `url(${URL.createObjectURL(schoolConfig.logo)})`;

      let nameInput = document.querySelector("#schoolNameInput");
      if (nameInput != undefined) nameInput.value = schoolConfig.name;
      //Save school Info for global access
      ServiceSchoolConfig.schoolConfig = schoolConfig;
      return true;
    }
    return false;
  }
}
