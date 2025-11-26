import { Op } from 'sequelize';
import Libro from '../models/libro.js';
import Categoria from '../models/categoria.js';

Categoria.hasMany(Libro, {
    foreignKey: 'categoria',
    as: 'libros'
});

Libro.belongsTo(Categoria, {
    foreignKey: 'categoria',
    as: 'categoriaInfo'
});

async function getLibros() {
    return await Libro.findAll({
        include: [
			{
				model: Categoria,
				as: "categoriaInfo",
			},
		],
    });
}

async function getLibrosByFilter(filtro) {
    return await Libro.findAll({
        where: {
            [Op.or]: [
                { titulo: { [Op.like]: `%${filtro}%` } },
                { autor: { [Op.like]: `%${filtro}%` } },
                { editorial: { [Op.like]: `%${filtro}%` } },
            ]
        }
    });
}

async function createLibro(libro) {
    return await Libro.create(libro);
}

async function getLibro(id) {
    return await Libro.findByPk(id);
}

async function updateLibro(id, libro) {
    return await Libro.update(libro, {
        where: { id: id }
    });
}

async function deleteLibro(id) {
    return await Libro.destroy({
        where: { id: id }
    });
}

export default { createLibro, getLibros, getLibrosByFilter, getLibro, updateLibro, deleteLibro };