export default class MatiereRepo {
  static con = new JsStore.Connection();
  static async init() {
    var table = {
      name: "matieres",
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
        competence: {
          notNull: true,
          dataType: "string",
        },
        classe_id: {
          notNull: true,
          dataType: "number",
        },
        prof_id: {
          notNull: true,
          dataType: "number",
        },
        group_id: {
          notNull: true,
          dataType: "number",
        },
        coef: {
          notNull: true,
          dataType: "number",
        },
      },
    };

    await this.con.initDb({
      name: "matiere_db",
      tables: [table],
    });
  }

  static async add(matiere) {
    await this.init();
    await this.con.insert({
      into: "matieres",
      values: [matiere],
    });
  }

  static async getAll() {
    await this.init();
    return await this.con.select({
      from: "matieres",
      order: {
        by: "name",
        type: "desc",
      },
    });
  }

  static async getByClasse(classe_id) {
    await this.init();
    return await this.con.select({
      from: "matieres",
      order: {
        by: "name",
        type: "desc",
      },
      where: {
        classe_id: classe_id,
      },
    });
  }

  static async delete(id) {
    await this.init();
    await this.con.remove({
      from: "matieres",
      where: {
        id: id,
      },
    });
  }

  static async edit(matiere) {
    await this.con.update({
      in: "matieres",
      set: {
        name: matiere.name,
        classe_id: matiere.classe_id,
        prof_id: matiere.prof_id,
        coef: matiere.coef,
        competence: matiere.competence,
      },
      where: {
        id: matiere.id,
      },
    });
  }
}
