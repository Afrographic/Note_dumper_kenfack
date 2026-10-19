export default class ProfRepo {
  static con = new JsStore.Connection();
  static async init() {
    var table = {
      name: "profs",
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
        phone: {
          notNull: true,
          dataType: "string",
        },
        email: {
          notNull: true,
          dataType: "string",
        },
        sex: {
          notNull: true,
          dataType: "string",
        },
      },
    };

    await this.con.initDb({
      name: "profs_db",
      tables: [table],
    });
  }

  static async add_prof(prof) {
    await this.init();
    await this.con.insert({
      into: "profs",
      values: [prof],
    });
  }

  static async get_profs() {
    await this.init();
    return await this.con.select({
      from: "profs",
      order: {
        by: "name",
        type: "asc",
      },
    });
  }

  static async delete_prof(id) {
    await this.init();
    await this.con.remove({
      from: "profs",
      where: {
        id: id,
      },
    });
  }

  static async edit_prof(prof) {
    await this.con.update({
      in: "profs",
      set: {
        name: prof.name,
        phone: prof.phone,
        email: prof.email,
        sex: prof.sex,
      },
      where: {
        id: prof.id,
      },
    });
  }
}
