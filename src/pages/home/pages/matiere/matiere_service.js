import ProfService from "../prof/ProfService.js";
import MatiereRepo from "./matiere_repo.js";

export default class MatiereService {
  static async create(matiere) {
    await MatiereRepo.add(matiere);
  }

  static async getAll() {
    return await MatiereRepo.getAll();
  }
  static async getByClasse(classe_id) {
    let matieres = await MatiereRepo.getByClasse(classe_id);
    let profs = await ProfService.get_profs();
    for (let i = 0; i <= matieres.length - 1; i++) {
      for (let j = 0; j <= profs.length - 1; j++) {
        if(matieres[i].prof_id == profs[j].id){
          matieres[i].professeur = profs[j].name
        }
      }
    }
    return matieres;
  }

  static async delete(matiere) {
    await MatiereRepo.delete(matiere.id);
  }

  static async edit(matiere) {
    await MatiereRepo.edit(matiere);
  }
}
