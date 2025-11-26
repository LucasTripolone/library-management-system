import appExpress from "express";
import prestamosService from "../services/prestamos.service.js";

const prestamosRouter = appExpress.Router();

prestamosRouter.get('/prestamos', async (req, res) => {
  const limit = parseInt(req.query.limit) || 5; // Número de prestamos por página
  const offset = parseInt(req.query.offset) || 0; // Desplazamiento para la paginación

  try {
      const prestamos = await Prestamo.findAndCountAll({
          limit: limit,
          offset: offset,
      });

      res.json({
          total: prestamos.count,
          prestamos: prestamos.rows,
      });
  } catch (error) {
      console.error('Error al obtener prestamos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
});

prestamosRouter.get("/", async (req, res) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const filtro = req.query.filtro;
      const prestamos = await prestamosService.getPrestamosByFilter(filtro);
      res.status(200).json(prestamos);
  } else {
      const prestamos = await prestamosService.getPrestamos();
      res.status(200).json(prestamos);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prestamosRouter.post("/", async (req, res) => {
  try {
    const prestamo = req.body;
    const prestamoCreado = await prestamosService.createPrestamo(prestamo);
    res.status(201).json(prestamoCreado);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prestamosRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const prestamo = await prestamosService.getPrestamo(id);
    res.status(200).json(prestamo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prestamosRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const prestamo = req.body;
    const prestamoActualizado = await prestamosService.updatePrestamo(id, prestamo);
    res.status(200).json(prestamoActualizado);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prestamosRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await prestamosService.deletePrestamo(id);
    res.status(200).json({ message: "Prestamo eliminado" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


export default prestamosRouter;

