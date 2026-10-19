export default class ClassesRepository {
  static con = new JsStore.Connection();
  static async init() {
    var table = {
      name: "classes",
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
        prof_id: {
          notNull: true,
          dataType: "number",
        },
      },
    };

    await this.con.initDb({
      name: "classes_db",
      tables: [table],
    });
  }

  static async add(classe) {
    await this.init();
    await this.con.insert({
      into: "classes",
      values: [classe],
    });
  }

  static async getAll() {
    await this.init();
    return await this.con.select({
      from: "classes",
      order: {
        by: "name",
        type: "asc",
      },
    });
  }

  static async delete(id) {
    await this.init();
    await this.con.remove({
      from: "classes",
      where: {
        id: id,
      },
    });
  }

  static async edit(classe) {
    await this.con.update({
      in: "classes",
      set: {
        name: classe.name,
        prof_id: classe.prof_id,
      },
      where: {
        id: classe.id,
      },
    });
  }
}
