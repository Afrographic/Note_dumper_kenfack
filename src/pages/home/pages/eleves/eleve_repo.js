export default class EleveRepo {
  static con = new JsStore.Connection();
  static async init() {
    var table = {
      name: "eleves",
      columns: {
        id: {
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        classe_id: {
          notNull: true,
          dataType: "number",
        },
        name: {
          notNull: true,
          dataType: "string",
        },
        dateDeNaissance: {
          notNull: true,
          dataType: "string",
        },
        lieuDeNaissance: {
          notNull: true,
          dataType: "string",
        },
        matricule: {
          notNull: true,
          dataType: "string",
        },
        nomDuParent: {
          notNull: true,
          dataType: "string",
        },
        numeroDuParent: {
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
      name: "eleves_db",
      tables: [table],
    });
  }

  static async add(classe) {
    await this.init();
    await this.con.insert({
      into: "eleves",
      values: [classe],
    });
  }

  static async getAll() {
    await this.init();
    return await this.con.select({
      from: "eleves",
      order: {
        by: "name",
        type: "asc",
      },
    });
  }
  static async getByClasse(classe_id) {
    await this.init();
    return await this.con.select({
      from: "eleves",
      order: {
        by: "name",
        type: "asc",
      },
      where: {
        classe_id: classe_id,
      },
    });
  }

  static async delete(id) {
    await this.init();
    await this.con.remove({
      from: "eleves",
      where: {
        id: id,
      },
    });
  }

  static async edit(eleve) {
    await this.con.update({
      in: "eleves",
      set: {
        classe_id: eleve.classe_id,
        name: eleve.name,
        dateDeNaissance: eleve.dateDeNaissance,
        lieuDeNaissance: eleve.lieuDeNaissance,
        sex: eleve.sex,
      },
      where: {
        id: eleve.id,
      },
    });
  }
}
