import DumperRepo from "./dumper_repo";

export default class DumperService {
  static async create(data) {
    await DumperRepo.add(data);
  }

  static async getAll() {
    return await DumperRepo.getAll();
  }
  static async getOne(id) {
    return await DumperRepo.getOne(id);
  }

  static async delete(data) {
    await DumperRepo.delete(data.id);
  }

  static async edit(data) {
    await DumperRepo.edit(data);
  }
}
