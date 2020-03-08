import Sequelize from "sequelize";
import User from "../app/models/User";
import Marca from "../app/models/Marca";
import Motherboard from "../app/models/Motherboard";
import Processors from "../app/models/Processors";

import databaseConfig from "../config/database";

const models = [User, Marca, Motherboard, Processors];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
