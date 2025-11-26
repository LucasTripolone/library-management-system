import appExpress from "express";
import {
    obtenerUsuariosPorFiltro,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuarioPorId,
} from "../services/usuarios.service.js";

const usuariosRouter = appExpress.Router();

usuariosRouter.get("/", async (req, res, next) => {
    const { texto } = req.query;

    try {
        const usuarios = await obtenerUsuariosPorFiltro(texto);
        if (usuarios) {
            res.json(usuarios);
        }
        else {
            res.status(404).json({ error: "Usuarios no encontrados" });
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

usuariosRouter.get("/:id", async (req, res, next) => {
    try {
        const userInfo = await obtenerUsuarioPorId(req.params.id);
        res.json(userInfo);
    }
    catch (err) {
        next(err);
    }
});

usuariosRouter.put("/me", async (req, res, next) => {
    try {
        const { nombre, apellido, mail } = req.body;
        await actualizarUsuario(req.user.id, nombre, apellido, mail);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

usuariosRouter.delete("/:id", async (req, res, next) => {
    try {
        await eliminarUsuario(req.params.id);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

export default usuariosRouter;
