import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import service from '../../services/prestamos.service.js';


export const TablaPrestamos = ({ prestamos, cargarPrestamos}) => {
  const navigate = useNavigate();
  const [prestamosList, setPrestamosList] = useState(prestamos);

  useEffect(() => {
    setPrestamosList(prestamos);
  }, [prestamos]);

  const handleDelete = async (id) => {
    await service.deletePrestamo(id);
    cargarPrestamos();
  };

  const cargarPrestamosATabla = () => {
    return prestamos.map((prestamo, index) => {
      const { id, fechaPrestamo, fechaDevolucion, ejemplare, descripcion, nombreCliente, apellidoCliente } = prestamo;
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{fechaPrestamo}</td>
          <td>{fechaDevolucion}</td>
          <td>{ejemplare.libro.titulo}</td>
          <td>{ejemplare.id}</td>
          <td>{descripcion}</td>
          <td>{nombreCliente}</td>
          <td>{apellidoCliente}</td>
          <td>
            <Link to={`/prestamos/editar/${id}`} className="btn btn-primary btn-sm">Editar</Link>
            {!fechaDevolucion && (
              <Link to={`/prestamos/devolucion/${id}`} className="btn btn-success btn-sm">Devolver</Link>
            )}
            <button onClick={() => handleDelete(id)} className="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      );
    });
  }

  return (
    <table className='table table-striped table-hover'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha de Prestamo</th>
          <th>Fecha de Devolucion</th>
          <th>Libro</th>
          <th>Ejemplar</th>
          <th>Descripcion</th>
          <th>Nombre Cliente</th>
          <th>Apellido Cliente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {cargarPrestamosATabla()}
      </tbody>
    </table>
  );
}
        