import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import prestamosService from '../../services/prestamos.service.js'
import ejemplaresService from '../../services/ejemplares.service.js'


export const RegistroPrestamo = () => {
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    data.fechaDevolucion = null;
    await prestamosService.createPrestamo(data)
    const { fechaCompra, idLibro, } = await ejemplaresService.getEjemplar(data.ejemplar)
    await ejemplaresService.updateEjemplar(data.ejemplar, { fechaCompra, idLibro, estado: "Prestado" })
    navigate('/prestamos/listado')
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const [ejemplares, setEjemplares] = useState([])
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const fechaPrestamo = watch('fechaPrestamo');

  useEffect(() => {
    const getEjemplares = async () => {
      const ejemplares = await ejemplaresService.getEjemplaresDisponibles();
      setEjemplares(ejemplares);
    };
    getEjemplares();
  }, []);

  useEffect(() => {
    if (fechaPrestamo) {
      const fechaPrestamoDate = new Date(fechaPrestamo);
      const fechaDevolucionDate = new Date(fechaPrestamoDate);
      fechaDevolucionDate.setDate(fechaPrestamoDate.getDate() + 7);
      const formattedFechaDevolucion = fechaDevolucionDate.toISOString().split('T')[0];
      setFechaDevolucion(formattedFechaDevolucion);
    }
  }, [fechaPrestamo]);

  return (
    <div className="container_app">
      <h4>Desarrollo de Software</h4>
      <h5>TRABAJO PRACTICO INTEGRADOR</h5>
      <h6>82904 94435 95826</h6>
      <hr />
      <h6>REGISTRO DE PRESTAMO</h6>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Ejemplares Disponibles:</Form.Label>
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
          <Form.Label>Fecha de Devolucion (estimada)</Form.Label>
          <Form.Control type="date" value={fechaDevolucion} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Cliente</Form.Label>
          <Form.Control type="text" placeholder="Nombre del Cliente" {...register('nombreCliente')} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido del Cliente</Form.Label>
          <Form.Control type="text" placeholder="Apellido del Cliente" {...register('apellidoCliente')} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
        <Button variant="secondary" onClick={() => navigate('/prestamos/listado')}>
          Cancelar
        </Button>
      </Form>
    </div>
  )};