import Prestamo from '../models/prestamo.js';
import { Op } from 'sequelize';
import Ejemplar from '../models/ejemplar.js';
import Libro from '../models/libro.js';

// Un libro tiene muchos ejemplares
Libro.hasMany(Ejemplar, { as: 'ejemplares', foreignKey: 'idLibro' });

// Un ejemplar pertenece a un libro
Ejemplar.belongsTo(Libro, { as: 'libro', foreignKey: 'idLibro' });

// Un ejemplar tiene muchos préstamos
Ejemplar.hasMany(Prestamo, { as: 'prestamos', foreignKey: 'ejemplar' });

// Un préstamo pertenece a un ejemplar
Prestamo.belongsTo(Ejemplar, { as: 'ejemplare', foreignKey: 'ejemplar' });

async function getPrestamos() {
    return await Prestamo.findAll({
      include: [{
        model: Ejemplar,
        as: 'ejemplare',
        include: [{
          model: Libro,
          as: 'libro'
        }]
      }]
    });
  }

async function getPrestamosByFilter(filtro) {
    return await Prestamo.findAll({include: [{
        model: Ejemplar,
        as: 'ejemplare',
        include: [{
          model: Libro,
          as: 'libro'
        }]
      }],
        where: {
            [Op.or]: [
                { nombreCliente: { [Op.like]: `%${filtro}%` } },
                { apellidoCliente: { [Op.like]: `%${filtro}%` } },
                { descripcion: { [Op.like]: `%${filtro}%` } }
            ]
        }
    });
}

async function createPrestamo(prestamo) {
    return await Prestamo.create(prestamo);
}

async function getPrestamo(id) {
    return await Prestamo.findByPk(id);
}

async function updatePrestamo(id, prestamo) {
    return await Prestamo.update(prestamo, {
        where: { id: id }
    });
}

async function deletePrestamo(id) {
    return await Prestamo.destroy({
        where: { id: id }
    });
}

export default { createPrestamo, getPrestamos, getPrestamo, updatePrestamo, deletePrestamo, getPrestamosByFilter };