export default class Repo_School_Config {
  static con = new JsStore.Connection();
  static async init() {
    var table = {
      name: "school_config",
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
        logo: {
          notNull: true,
          dataType: "object",
        },
      },
    };

    await this.con.initDb({
      name: "school_config_db",
      tables: [table],
    });
  }

  static async get_all() {
    await this.init();
    let schoolConfigs = await this.con.select({
      from: "school_config",
    });
    return schoolConfigs;
  }

  static async save(schoolConfig) {
    let configs = await this.get_all();
    if (configs.length > 0) {
      schoolConfig.id = configs[0].id;
      await this.con.update({
        in: "school_config",
        set: schoolConfig,
        where: {
          id: schoolConfig.id,
        },
      });
      return schoolConfig.id;
    }
    let insertedId = await this.con.insert({
      into: "school_config",
      values: [schoolConfig],
    });
    return insertedId;
  }
}


