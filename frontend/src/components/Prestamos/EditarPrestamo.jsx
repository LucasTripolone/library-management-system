import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"
import prestamosService from '../../services/prestamos.service.js'
import ejemplaresService from '../../services/ejemplares.service.js';

export const EditarPrestamo = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const onSubmit = async (data) => {
    await prestamosService.updatePrestamo(id, data)
    navigate('/prestamos/listado')
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const [prestamo, setPrestamo] = useState(null);
  const [ejemplares, setEjemplares] = useState([])

  useEffect(() => {
    const cargarPrestamo = async () => {
      const data = await prestamosService.getPrestamo(id);
      setPrestamo(data);
      setValue('ejemplar', data.ejemplar);
      setValue('fechaPrestamo', data.fechaPrestamo);
      setValue('fechaDevolucion', data.fechaDevolucion || '');
      setValue('nombreCliente', data.nombreCliente);
      setValue('apellidoCliente', data.apellidoCliente);
      setValue('descripcion', data.descripcion);
    };


    const getEjemplares = async () => {
      const ejemplares = await ejemplaresService.getEjemplares();
      setEjemplares(ejemplares);
    };
    cargarPrestamo();
    getEjemplares();
  }, [id, setValue]);

  return (
    <div className="container_app">
      <h4>Desarrollo de Software</h4>
      <h5>TRABAJO PRACTICO INTEGRADOR</h5>
      <h6>82904 94435 95826</h6>
      <hr />
      <h6>EDITAR PRESTAMO</h6>
      <h6>ID: {id}</h6>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Ejemplar</Form.Label>
          <Form.Control as="select" {...register('ejemplar', { required: true })}>
            <option value="">Seleccione un ejemplar</option>
            {ejemplares.map((ejemplar) => (
              <option key={ejemplar.id} value={ejemplar.id}>
                (IDLibro: {ejemplar.idLibro}) (IDEjemplar: {ejemplar.id}) "{ejemplar.libro.titulo}"
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Prestamo</Form.Label>
          <Form.Control type="date" {...register('fechaPrestamo', { required: true })} />
          {errors.fechaPrestamo && <span>Este campo es obligatorio</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Devolucion</Form.Label>
          <Form.Control type="date" {...register('fechaDevolucion')} />
          {errors.fechaDevolucion && <span>Este campo es obligatorio</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Cliente</Form.Label>
          <Form.Control type="text" placeholder="Nombre del Cliente" {...register('nombreCliente')} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido del Cliente</Form.Label>
          <Form.Control type="text" placeholder="Apellido del Cliente" {...register('apellidoCliente')} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" placeholder="Descripción del préstamo" {...register('descripcion')} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
        <Button variant="secondary" onClick={() => navigate('/prestamos/listado')}>
          Cancelar
        </Button>
      </Form>
    </div>
  );
}