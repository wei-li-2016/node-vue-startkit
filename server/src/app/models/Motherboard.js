import Sequelize, { Model } from "sequelize";

class Motherboard extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        chipset: Sequelize.STRING,
        marca_id: Sequelize.INTEGER,
        memory: Sequelize.STRING,
        socket: Sequelize.STRING,
        format: Sequelize.STRING,
        rgb: Sequelize.INTEGER,
        platform: Sequelize.STRING
      },
      {
        sequelize,
        tableName: "tb_motherboards"
      }
    );

    return this;
  }
}

export default Motherboard;
