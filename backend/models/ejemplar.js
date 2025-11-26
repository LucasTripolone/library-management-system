import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Ejemplar = sequelize.define("Ejemplar", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idLibro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Libro",
      key: "id",
    },
  },
  fechaCompra: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "La fecha de compra es requerida",
      },
      isDate: {
        args: true,
        msg: "La fecha de compra debe tener un formato válido",
      },
    },
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "El estado es requerido",
      },
    },
  }
}, {
  tableName: 'Ejemplar',
  timestamps: false
});

export default Ejemplar;