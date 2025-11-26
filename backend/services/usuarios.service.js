import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuarios from "../models/usuarios.js";

const SALTROUNDS = 10;

export async function obtenerUsuarioPorId(id) {
    const usr = await Usuarios.findByPk(id);
    return {
        idUsuario: usr.idUsuario,
        nombre: usr.nombre,
        apellido: usr.apellido,
        mail: usr.mail,
        fechaHoraCreacion: usr.fechaHoraCreacion
    };
}

export async function crearUsuario(nombre, apellido, mail, password) {
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
    const usuario = await Usuarios.create({
        nombre,
        apellido,
        mail,
        password: hashedPassword
    });
    return obtenerUsuarioPorId(usuario.idUsuario);
}

export async function obtenerUsuarioPorMail(mail) {
    const usuario = await Usuarios.findOne({
        where: { mail }
    });
    return usuario;
}

export async function actualizarUsuario(idUsuario, nombre, apellido, mail) {
    const usuario = await Usuarios.findByPk(idUsuario);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.mail = mail;
    await usuario.save();
    return usuario;
}

export async function eliminarUsuario(idUsuario) {
    const usuario = await Usuarios.findByPk(idUsuario);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }
    await usuario.destroy();
}

export async function obtenerUsuariosPorFiltro(texto) {
    let where = null;
    if (texto) {
        where = { [Op.or]:
            [{ nombre: { [Op.like]: `${texto}%` } },
                { apellido: { [Op.like]: `${texto}%` } }] };
    }

    const filter = {
        attributes: ["idUsuario", "nombre", "apellido", "mail", "fechaHoraCreacion"],
        order: ["NOMBRE", "APELLIDO"]
    };
    if (where !== null) filter.where = where;
    return Usuarios.findAll(filter);
}

export async function checkUserPassword(email, password) {

    const usuario = await obtenerUsuarioPorMail(email);

    if (!usuario) return null;

    const validPassword = await bcrypt.compare(password, usuario.password);
    console.log(validPassword);
    return validPassword;
}

export async function cambiarPassword(email, oldPass, plainPass) {
    if (await checkUserPassword(email, oldPass)) {
        const hashedPass = await bcrypt.hash(plainPass, SALTROUNDS);
        const usuario = await Usuarios.obtenerUsuarioPorMail(email);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        usuario.password = hashedPass;
        await usuario.save();
        return true;
    }
    return false;
}

export function generarJwt(usr) {
    const payload = {
        id: usr.idUsuario,
        userName: usr.mail,
        nombre: `${usr.nombre} ${usr.apellido}`,
        admin: (usr.idUsuario === 1)
    };

    return jwt.sign(payload, "secret-library-key");
}
