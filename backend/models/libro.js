import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Libro = sequelize.define("Libro", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "El título es requerido",
      },
      len: {
        args: [1, 255],
        msg: "El título debe tener entre 1 y 255 caracteres",
      },
    },
  },
  autor: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "El autor es requerido",
      },
      len: {
        args: [1, 255],
        msg: "El autor debe tener entre 1 y 255 caracteres",
      },
    },
  },
  fechaPubli: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: {
        args: true,
        msg: "La fecha de publicación debe tener un formato válido",
      },
    },
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Categoria", key: "id" },
    validate: {
      notEmpty: {
        args: true,
        msg: "La categoría es requerida",
      },
    },
  },
  editorial: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "La editorial es requerida",
      },
      len: {
        args: [1, 255],
        msg: "La editorial debe tener entre 1 y 255 caracteres",
      },
    },
  }
}, {
    timestamps: false
});

export default Libro;