import appExpress from "express";
import ejemplaresService from "../services/ejemplares.service.js";

const ejemplaresRouter = appExpress.Router();

ejemplaresRouter.get('/ejemplares', async (req, res) => {
	const limit = parseInt(req.query.limit) || 5; // Número de ejemplares por página
	const offset = parseInt(req.query.offset) || 0; // Desplazamiento para la paginación

	try {
		const ejemplares = await Ejemplar.findAndCountAll({
			limit: limit,
			offset: offset,
		});
  
		res.json({
			total: ejemplares.count,
			ejemplares: ejemplares.rows,
		});
	} catch (error) {
		console.error('Error al obtener ejemplares:', error);
		res.status(500).json({ message: 'Error en el servidor' });
	}
  });

ejemplaresRouter.get("/", async (req, res) => {
	try {
		if (Object.keys(req.query).length !== 0) {
			const filtro = req.query.filtro;
			const ejemplares = await ejemplaresService.getEjemplaresByFilter(filtro);
			res.status(200).json(ejemplares);
		} else {
			const ejemplares = await ejemplaresService.getEjemplares();
			res.status(200).json(ejemplares);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

ejemplaresRouter.get("/disponibles", async (req, res) => {
	try {
		const ejemplares = await ejemplaresService.getEjemplaresDisponibles();
		res.status(200).json(ejemplares);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

ejemplaresRouter.post("/", async (req, res) => {
	try {
		const ejemplar = req.body;
		const ejemplarCreado = await ejemplaresService.createEjemplar(ejemplar);
		res.json(ejemplarCreado);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

ejemplaresRouter.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const ejemplar = await ejemplaresService.getEjemplar(id);
		res.json(ejemplar);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

ejemplaresRouter.put("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const ejemplar = req.body;
		const ejemplarActualizado = await ejemplaresService.updateEjemplar(id, ejemplar);
		res.json(ejemplarActualizado);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

ejemplaresRouter.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		await ejemplaresService.deleteEjemplar(id);
		res.json({ message: "Ejemplar eliminado" });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

export default ejemplaresRouter;
