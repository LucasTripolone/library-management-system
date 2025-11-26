import appExpress from "express";
import librosService from "../services/libros.service.js";

const librosRouter = appExpress.Router();

librosRouter.get('/libros', async (req, res) => {
  const limit = parseInt(req.query.limit) || 5; // Número de libros por página
  const offset = parseInt(req.query.offset) || 0; // Desplazamiento para la paginación

  try {
      const libros = await Libro.findAndCountAll({
          limit: limit,
          offset: offset,
      });

      res.json({
          total: libros.count,
          libros: libros.rows,
      });
  } catch (error) {
      console.error('Error al obtener libros:', error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
});

librosRouter.get("/", async (req, res) => {
  try{
    if (Object.keys(req.query).length !== 0) {
      const filtro = req.query.filtro;
      const libros = await librosService.getLibrosByFilter(filtro);
      res.status(200).json(libros);
    }else{
      const libros = await librosService.getLibros();
    res.json(libros);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

librosRouter.post("/", async (req, res) => {
  try {
    const { titulo, autor, fechaPubli, categoria, editorial } = req.body;
      if (!titulo || !autor || !fechaPubli || !categoria || !editorial) {
        return res.status(400).send({ status: 'ERR', data: 'Faltan campos obligatorios' });
  }
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaPubli.match(fechaRegex)) {
      return res.status(400).send({ status: 'ERR', data: 'Formato de fecha inválido' });
    }

    if (typeof titulo !== 'string' || typeof autor !== 'string' || typeof editorial !== 'string') {
      return res.status(400).send({ status: 'ERR', data: 'Titulo, autor y editorial deben ser cadenas de texto' });
    }

    if (titulo.length < 1 || titulo.length > 255 || autor.length < 1 || autor.length > 255 || editorial.length < 1 || editorial.length > 255) {
      return res.status(400).send({ status: 'ERR', data: 'Titulo, autor y editorial deben tener entre 1 y 255 caracteres' });
    }

    const newContent = {
      titulo,
      autor,
      fechaPubli,
      categoria,
      editorial,
    };

    const libroCreado = await librosService.createLibro(newContent);
    res.json(libroCreado);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

librosRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const libro = await librosService.getLibro(id);
    res.json(libro);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

librosRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const libro = req.body;
    const libroActualizado = await librosService.updateLibro(id, libro);
    res.json(libroActualizado);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

librosRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await librosService.deleteLibro(id);
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


export default librosRouter;