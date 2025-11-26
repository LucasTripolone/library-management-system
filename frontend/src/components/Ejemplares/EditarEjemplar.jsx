import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/ejemplares.service.js";

export const EditarEjemplar = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const onSubmit = async (data) => {
		await service.updateEjemplar(id, data);
		navigate("/ejemplares/listado");
	};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const [ejemplar, setEjemplar] = useState(null);
	const [ejemplares, setEjemplares] = useState([]);
	const [titulo, setTitulo] = useState(null);

	useEffect(() => {
		const cargarEjemplar = async () => {
			const data = await service.getEjemplar(id);
			setEjemplar(data);
			setValue("id", data.id);
			setValue("idLibro", data.idLibro);
			setValue("fechaCompra", data.fechaCompra);
			setValue("estado", data.estado);
			setTitulo(data.libro.titulo);
		};

		const getEjemplares = async () => {
			const ejemplares = await service.getEjemplares();
			setEjemplares(ejemplares);
		};

		cargarEjemplar();
		getEjemplares();
	}, [id, setValue]);

	return (
		<div className="container_app">
			<h4>Desarrollo de Software</h4>
			<h5>TRABAJO PRACTICO INTEGRADOR</h5>
			<h6>82904 94435 95826</h6>
			<hr />
			<h6>EDITAR EJEMPLAR</h6>
			<h6>ID: {id}</h6>
			<h6> Titulo: {titulo}</h6>
    
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="mb-3">
					<Form.Label>Fecha de Compra</Form.Label>
					<Form.Control type="date" {...register("fechaCompra", { required: true })} />
					{errors.fechaEjemplar && <span>Este campo es obligatorio</span>}
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Seleccione un estado:</Form.Label>
					<Form.Control as="select" placeholder="Seleccione un estado" {...register("estado", { required: true })}>
						<option value="Disponible">Disponible</option>
						<option value="Prestado">Prestado</option>
					</Form.Control>
				</Form.Group>

				<Button variant="primary" type="submit">
					Guardar
				</Button>
				<Button variant="secondary" onClick={() => navigate("/ejemplares/listado")}>
					Cancelar
				</Button>
			</Form>
		</div>
	);
};
