import Sequelize, { Model } from 'sequelize'

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        ra: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      }
      , { sequelize })
  }
}

export default Student