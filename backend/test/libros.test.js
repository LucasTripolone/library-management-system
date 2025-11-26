import request from "supertest";
import app from "../app.js";

describe("Test Endpoints de libros", () => {
  //Test para endpoint GET /libros
  describe("GET /libros", () => {
    it("Deberia devolver todos los libros", async () => {
      const res = await request(app).get("/api/libros");
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty("id");
    });
  });

  //Test para endpoint POST /libros
  describe("POST /libros", () => {
    it("Deberia crear un nuevo libro", async () => {
      const res = await request(app).post("/api/libros").send({
        titulo: "El caballero de la armadura oxidada",
        autor: "Robert Fisher",
        fechaPubli: "1987-05-1",
        categoria: 1,
        editorial: "Ediciones Obelisco"
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
    });
  });

  //Test para endpoint GET /libros/:id
  describe("GET /libros/:id", () => {
    it("Deberia devolver un libro por su id", async () => {
      const res = await request(app).get("/api/libros/9");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
    });
  });

  //Test para endpoint PUT /libros/:id
  describe("PUT /libros/:id", () => {
    it("Deberia actualizar un libro por su id", async () => {
      const res = await request(app).put("/api/libros/9").send({
        titulo: "El caballero de la armadura oxidada",
        autor: "Robert Fisher",
        fechaPubli: "1987-05-1",
        categoria: 1,
        editorial: "Sudamericana"
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual([1]);
    });
  });

  //Test para endpoint DELETE /libros/:id
  describe("DELETE /libros/:id", () => {
    it("Deberia eliminar un libro por su id", async () => {
      const res = await request(app).delete("/api/libros/8");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty({"message":'Libro eliminado correctamente'});
    });
  });

});