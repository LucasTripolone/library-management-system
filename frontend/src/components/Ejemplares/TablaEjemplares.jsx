import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../services/ejemplares.service.js";

export const TablaEjemplares = ({ ejemplares, cargarEjemplares }) => {
	const navigate = useNavigate();
	const [ejemplaresList, setEjemplaresList] = useState(ejemplares);

	useEffect(() => {
		setEjemplaresList(ejemplares);
	}, [ejemplares]);

	const handleDelete = async (id) => {
		await service.deleteEjemplar(id);
		cargarEjemplares();
	};

	const cargarEjemplaresATabla = () => {
		return ejemplares.map((ejemplar, index) => {
			const { id, fechaCompra, libro, estado } = ejemplar;
			return (
				<tr key={index}>
					<td>{id}</td>
					<td>{libro.id}</td>
					<td>{fechaCompra}</td>
					<td>{libro.titulo}</td>
					<td>{estado}</td>
					<td>
						<Link to={`/ejemplares/editar/${id}`} className="btn btn-primary btn-sm">
							Editar
						</Link>
						<button onClick={() => handleDelete(id)} className="btn btn-danger btn-sm">
							Eliminar
						</button>
					</td>
				</tr>
			);
		});
	};

	return (
		<table className="table table-striped table-hover">
			<thead>
				<tr>
					<th>ID del Ejemplar</th>
					<th>ID del Libro</th>
					<th>Fecha de Compra</th>
					<th>Titulo</th>
					<th>Estado</th>
				</tr>
			</thead>
			<tbody>{cargarEjemplaresATabla()}</tbody>
		</table>
	);
};
