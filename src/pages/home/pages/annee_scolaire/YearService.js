import YearRepo from "./YearRepo";

export default class YearService {
  static async create(year) {
    await YearRepo.add(year);
  }

  static async getAll() {
    return await YearRepo.getAll();
  }

  static async delete(year) {
    await YearRepo.delete(year.id);
  }

  static async edit(year) {
    await YearRepo.edit(year);
  }
}
