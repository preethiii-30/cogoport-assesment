const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const Configuration = sequelize.define('Configuration', {
  country_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  requirements: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

const initializeDatabase = async () => {
  await sequelize.sync({ force: false });
};

module.exports = {
  Configuration,
  initializeDatabase,
  sequelize,
};
