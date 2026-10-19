export default class GroupeMatiereRepo {
  static con = new JsStore.Connection();
  static async init() {
    var table = {
      name: "groupe_matieres",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          notNull: true,
          dataType: "string",
        },
      },
    };

    await this.con.initDb({
      name: "groupe_matiere_db",
      tables: [table],
    });
  }

  static async add(year) {
    await this.init();
    await this.con.insert({
      into: "groupe_matieres",
      values: [year],
    });
  }

  static async getAll() {
    await this.init();
    return await this.con.select({
      from: "groupe_matieres",
      order: {
        by: "id",
        type: "desc",
      },
    });
  }

  static async delete(id) {
    await this.init();
    await this.con.remove({
      from: "groupe_matieres",
      where: {
        id: id,
      },
    });
  }

  static async edit(year) {
    await this.con.update({
      in: "groupe_matieres",
      set: {
        name: year.name,
      },
      where: {
        id: year.id,
      },
    });
  }
}
