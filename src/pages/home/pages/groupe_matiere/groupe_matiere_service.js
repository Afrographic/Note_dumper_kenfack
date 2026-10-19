import GroupeMatiereRepo from "./groupe_matiere_repo";

export default class GroupeMatiereService {
  static async create(groupe_matiere) {
    await GroupeMatiereRepo.add(groupe_matiere);
  }

  static async getAll() {
    return await GroupeMatiereRepo.getAll();
  }

  static async delete(groupe_matiere) {
    await GroupeMatiereRepo.delete(groupe_matiere.id);
  }

  static async edit(groupe_matiere) {
    await GroupeMatiereRepo.edit(groupe_matiere);
  }
}
