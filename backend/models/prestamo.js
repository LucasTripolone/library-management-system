import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Prestamo = sequelize.define("Prestamo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ejemplar: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Ejemplar',
        key: 'ID',
    }
  },
  fechaPrestamo: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "La fecha de prestamo es requerida",
      },
      isDate: {
        args: true,
        msg: "La fecha de prestamo debe tener un formato válido",
      }
    }
  },
  fechaDevolucion: {
    type: DataTypes.DATEONLY,
    validate: {
      isDate: {
        args: true,
        msg: "La fecha de devolucion debe tener un formato válido",
      }
    }
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  nombreCliente: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
        notEmpty: {
          args: true,
          msg: "El nombre es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El nombre debe tener entre 1 y 255 caracteres",
        },
      },
  },
  apellidoCliente: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
        notEmpty: {
          args: true,
          msg: "El apellido es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El apellido debe tener entre 1 y 255 caracteres",
        },
      },
  },
}, {
  timestamps: false
});

export default Prestamo;