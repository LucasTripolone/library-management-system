import request from "supertest";
import app from "../app.js";

describe("Test Endpoints de prestamos", () => {
  //Test para endpoint GET /prestamos
  describe("GET /prestamos", () => {
    it("Deberia devolver todos los prestamos", async () => {
      const res = await request(app).get("/api/prestamos");
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty("id");
    });
  });

  //Test para endpoint POST /prestamos
  describe("POST /prestamos", () => {
    it("Deberia crear un nuevo prestamo", async () => {
      const res = await request(app).post("/api/prestamos").send({
        fechaPrestamo: "2024-06-21",
        ejemplar: 1001,
        nombreCliente: "Juan",
        apellidoCliente: "Perez",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
    });
  });

  //Test para endpoint GET /prestamos/:id
  describe("GET /prestamos/:id", () => {
    it("Deberia devolver un prestamo por su id", async () => {
      const res = await request(app).get("/api/prestamos/13");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
    });
  });

  //Test para endpoint PUT /prestamos/:id
  describe("PUT /prestamos/:id", () => {
    it("Deberia actualizar un prestamo por su id", async () => {
      const res = await request(app).put("/api/prestamos/13").send({
        fechaPrestamo: "2024-06-21",
        fechaDevolucion: "2024-06-29",
        ejemplar: 1001,
        nombreCliente: "Juan",
        apellidoCliente: "Perez",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual([1]);
    });
  });

  //Test para endpoint DELETE /prestamos/:id
  describe("DELETE /prestamos/:id", () => {
    it("Deberia eliminar un prestamo por su id", async () => {
      const res = await request(app).delete("/api/prestamos/15");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
    });
  });

});