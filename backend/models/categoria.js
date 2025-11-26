import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Categoria = sequelize.define("Categoria", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Categoria',
  timestamps: false
});

export default Categoria;