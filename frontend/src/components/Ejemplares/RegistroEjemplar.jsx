import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import service from "../../services/ejemplares.service";

export const RegistroEjemplar = () => {
	const navigate = useNavigate();
	const onSubmit = async (data) => {
		await service.createEjemplar(data)
		navigate('/ejemplares/listado')
	}

	const {
		register,
		handleSubmit,
		
		formState: { errors },
	} = useForm();

	const [libros, setLibros] = useState([]);

	useEffect(() => {
		const getLibros = async () => {
			const libros = await service.getLibros();
			setLibros(libros);
		};
		getLibros();
	}, []);

	const onVolver = () => {
		navigate("/");
	};

	return (
		<div className="container_app">
			<h4>Desarrollo de Software</h4>
			<h5>TRABAJO PRACTICO INTEGRADOR</h5>
			<h6>82904 94435 95826</h6>
			<hr />
			<h6>REGISTRO DE EJEMPLAR</h6>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="mb-3">
					<Form.Label>Libro</Form.Label>
					<Form.Control as="select" {...register("idLibro", { required: true })}>
						<option value="">Seleccione un libro</option>
						{libros.map((libro) => (
							<option key={libro.id} value={libro.id}>
								(ID: {libro.id}) {libro.titulo}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				

				<Form.Group className="mb-3">
					<Form.Label>Fecha de Compra</Form.Label>
					<Form.Control type="date" placeholder="Fecha" {...register("fechaCompra", { required: true })} />
					{errors.fechaCompra && <span>Este campo es requerido</span>}
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Seleccione un estado:</Form.Label>
					<Form.Control as="select" {...register("estado", { required: true })}>
						<option value="">Seleccione un estado</option>
						<option value="Disponible">Disponible</option>
						<option value="Prestado">Prestado</option>
					</Form.Control>
				</Form.Group>
				<Button variant="primary" type="submit">
					Guardar
				</Button>
				<Button variant="secondary" onClick={onVolver}>
				Volver
			</Button>
			</Form>
		</div>
	);
};
