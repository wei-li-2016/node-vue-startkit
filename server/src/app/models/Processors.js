import Sequelize, { Model } from "sequelize";

class Processors extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        marca_id: Sequelize.INTEGER,
        socket: Sequelize.STRING,
        nucleos: Sequelize.INTEGER,
        threads: Sequelize.INTEGER,
        frequency: Sequelize.STRING,
        frequency_max: Sequelize.STRING,
        tdp: Sequelize.STRING
      },
      {
        sequelize,
        tableName: "tb_processors"
      }
    );

    return this;
  }
}

export default Processors;
