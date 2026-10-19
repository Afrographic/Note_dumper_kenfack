export default class YearRepo {
  static con = new JsStore.Connection();
  static async init() {
    var table = {
      name: "years",
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
      name: "year_db_2",
      tables: [table],
    });
  }

  static async add(year) {
    await this.init();
    await this.con.insert({
      into: "years",
      values: [year],
    });
  }

  static async getAll() {
    await this.init();
    return await this.con.select({
      from: "years",
      order: {
        by: "id",
        type: "desc",
      },
    });
  }

  static async delete(id) {
    await this.init();
    await this.con.remove({
      from: "years",
      where: {
        id: id,
      },
    });
  }

  static async edit(year) {
    await this.con.update({
      in: "years",
      set: {
        name: year.name,
      },
      where: {
        id: year.id,
      },
    });
  }
}
