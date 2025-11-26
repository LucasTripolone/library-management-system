import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Usuario = sequelize.define("Usuario", {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID_USUARIO"
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "NOMBRE"
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "APELLIDO"
    },
    mail: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        field: "MAIL"
    },
    password: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: "PASSWORD"
    },
    fechaHoraCreacion: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "FECHA_HORA_CREACION"
    }
}, {
    timestamps: false,
    tableName: "USUARIOS"
});

export default Usuario;
