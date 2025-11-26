import express from 'express';
import cors from 'cors';

import dbInit from './data/db-init.js';

import prestamosRouter from './routes/prestamos.routes.js';
import librosRouter from './routes/libros.routes.js';
import ejemplaresRouter from './routes/ejemplares.routes.js';
import usuariosRouter from "./routes/usuarios.routes.js";
import loginRouter from "./routes/login.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ response: "API iniciada y escuchando..." });
});

app
    .use("/api/prestamos", prestamosRouter)
    .use("/api/libros", librosRouter)
    .use("/api/ejemplares", ejemplaresRouter)
    .use("/api/usuarios", usuariosRouter)
    .use("/api/", loginRouter)


async function start() {
  const PORT = 3000;

  // Inicializar la conexión a la base de datos
  await dbInit();

  // Iniciar el servidor
  app.listen(PORT, () => {
      console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
  });
}

await start();

export default app;