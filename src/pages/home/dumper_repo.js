import { data } from "framer-motion/m";

export default class DumperRepo {
  static con = new JsStore.Connection();
  static async init() {
    var table = {
      name: "note_dumper",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        data: {
          notNull: true,
          dataType: "object",
        },
      },
    };

    await this.con.initDb({
      name: "note_dumper_db",
      tables: [table],
    });
  }

  static async add(data) {
    await this.init();
    await this.con.insert({
      into: "note_dumper",
      values: [data],
    });
  }

  static async getAll() {
    await this.init();
    return await this.con.select({
      from: "note_dumper",
      order: {
        by: "id",
        type: "asc",
      },
    });
  }
  static async getOne(id) {
    await this.init();
    return await this.con.select({
      from: "note_dumper",
      order: {
        by: "id",
        type: "asc",
      },
      where:{
        id:id
      }
    });
  }
    

  static async delete(id) {
    await this.init();
    await this.con.remove({
      from: "note_dumper",
      where: {
        id: id,
      },
    });
  }

  static async edit(data) {
    await this.con.update({
      in: "note_dumper",
      set: {
        data: data.data,
      },
      where: {
        id: data.id,
      },
    });
  }
}
