import request from "supertest";
import app from "../app.js";

describe("Test Endpoints de ejemplares", () => {
	//Test para endpoint GET /ejemplares
	describe("GET /ejemplares", () => {
		it("Deberia devolver todos los ejemplares", async () => {
			const res = await request(app).get("/api/ejemplares");
			expect(res.statusCode).toEqual(200);
			expect(res.body[0]).toHaveProperty("id");
		});
	});

	//Test para endpoint POST /ejemplares
	describe("POST /ejemplares", () => {
		it("Deberia crear un nuevo ejemplar", async () => {
			const res = await request(app).post("/api/ejemplares").send({
				id: 18,
				idLibro: 1002,
				fechaCompra: "2024-06-21",
				estado: "Disponible",
			});
			expect(res.statusCode).toEqual(201);
			expect(res.body).toHaveProperty("id");
		});
	});

	//Test para endpoint GET /ejemplares/:id
	describe("GET /ejemplares/:id", () => {
		it("Deberia devolver un ejemplar por su id", async () => {
			const res = await request(app).get("/api/ejemplares/13");
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty("id");
		});
	});

	//Test para endpoint PUT /ejemplares/:id
	describe("PUT /ejemplares/:id", () => {
		it("Deberia actualizar un ejemplar por su id", async () => {
			const res = await request(app).put("/api/ejemplares/13").send({
				id: 18,
				idLibro: 1002,
				fechaCompra: "2024-06-21",
				estado: "Disponible",
			});
			expect(res.statusCode).toEqual(200);
			expect(res.body).toStrictEqual([1]);
		});
	});

	//Test para endpoint DELETE /ejemplares/:id
	describe("DELETE /ejemplares/:id", () => {
		it("Deberia eliminar un ejemplar por su id", async () => {
			const res = await request(app).delete("/api/ejemplares/15");
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty("message");
		});
	});
});
