import Ejemplar from "../models/ejemplar.js";
import { Op } from "sequelize";
import Libro from "../models/libro.js";

async function getEjemplares() {
	return await Ejemplar.findAll({
		include: [
			{
				model: Libro,
				as: "libro",
			},
		],
	});
}

async function getEjemplaresDisponibles() {
	return await Ejemplar.findAll({
		include: [
			{
				model: Libro,
				as: "libro",
			},
		],
		where: {
			estado: "Disponible",
		},
	});
}

async function getEjemplaresByFilter(filtro) {
	return await Ejemplar.findAll({
		include: [
			{
				model: Libro,
				as: "libro",
			},
		],
		where: {
			[Op.or]: [
				{ estado: { [Op.like]: `%${filtro}%` } },
			],
			
		},
	});
}

async function createEjemplar(ejemplar) {
	return await Ejemplar.create(ejemplar);
}

async function getEjemplar(id) {
	return await Ejemplar.findByPk(id, {
		include: [
			{
				model: Libro,
				as: "libro",
			},
		],
	});
}

async function updateEjemplar(id, ejemplar) {
	return await Ejemplar.update(ejemplar, {
		where: { id: id },
	});
}

async function deleteEjemplar(id) {
	return await Ejemplar.destroy({
		where: { id: id },
	});
}

export default { createEjemplar, getEjemplaresByFilter, getEjemplares, getEjemplar, updateEjemplar, deleteEjemplar, getEjemplaresDisponibles };
