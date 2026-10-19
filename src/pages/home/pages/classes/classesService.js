import ProfService from "../prof/ProfService.js";
import ClassesRepository from "./classesRepository.js";

export default class ClassesService {
  static async create(classe) {
    await ClassesRepository.add(classe);
  }

  static async getAll() {
    let classes = await ClassesRepository.getAll();
    let profs = await ProfService.get_profs();
    for (let i = 0; i <= classes.length - 1; i++) {
      for (let j = 0; j <= profs.length - 1; j++) {
        if(classes[i].prof_id == profs[j].id){
          classes[i].prof_titulaire = profs[j].name;
        }
      }
    }
    return classes;
  }

  static async delete(classe) {
    await ClassesRepository.delete(classe.id);
  }

  static async edit(classe) {
    await ClassesRepository.edit(classe);
  }
}
