import ServiceSchoolConfig from "../../../school-config/ServiceSchoolConfig.js";
import EleveRepo from "./eleve_repo.js";

export default class EleveService {
  static async create(eleve) {
    let schoolName = ServiceSchoolConfig.schoolConfig.name.trim().toUpperCase();
    let eleves = await this.getAll();
    let matricule = `${schoolName[0]}${schoolName[1]}-${eleves.length}-${Math.floor(Math.random()*1000)}`;
    eleve.matricule = matricule;
    await EleveRepo.add(eleve);
  }

  static async getAll() {
    return await EleveRepo.getAll();
  }
  static async getByClasse(classe_id) {
    return await EleveRepo.getByClasse(classe_id);
  }

  static async delete(eleve) {
    await EleveRepo.delete(eleve.id);
  }

  static async edit(eleve) {
    await EleveRepo.edit(eleve);
  }
}
