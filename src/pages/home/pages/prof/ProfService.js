import ProfRepo from "./ProfRepo";

export default class ProfService {
  static async create_prof(prof) {
    await ProfRepo.add_prof(prof);
  }
  
  static async get_profs() {
    return await ProfRepo.get_profs();
  }

  static async delete_prof(prof) {
    await ProfRepo.delete_prof(prof.id);
  }

  static async edit_prof(prof){
    await ProfRepo.edit_prof(prof);
  }
}
