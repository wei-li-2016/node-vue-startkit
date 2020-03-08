import Sequelize, { Model } from "sequelize";

class Marca extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING
      },
      {
        sequelize,
        tableName: "tb_marca"
      }
    );

    return this;
  }
}

export default Marca;
