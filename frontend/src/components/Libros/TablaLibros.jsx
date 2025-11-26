import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../../services/libros.service.js';


export const TablaLibros = ({ libros, cargarLibros}) => {
  const [librosList, setLibrosList] = useState(libros);

  useEffect(() => {
    setLibrosList(libros);
  }, [libros]);

  const handleDelete = async (id) => {
    await service.deleteLibro(id);
    cargarLibros();
  };

  const cargarLibrosATabla = () => {
    return libros.map((libro, index) => {
      const { id, titulo, autor, fechaPubli, categoriaInfo, editorial, } = libro;
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{titulo}</td>
          <td>{autor}</td>
          <td>{fechaPubli}</td>
          <td>{categoriaInfo.nombre}</td>
          <td>{editorial}</td>
          <td>
            <Link to={`/libros/editar/${id}`} className="btn btn-primary btn-sm">Editar</Link>
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
          <th>Titulo</th>
          <th>Autor</th>
          <th>Fecha de publicacion</th>
          <th>Categoria</th>
          <th>Editorial</th>
        </tr>
      </thead>
      <tbody>
        {cargarLibrosATabla()}
      </tbody>
    </table>
  );
}
        