import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"
import prestamosService from '../../services/prestamos.service.js'
import ejemplaresService from '../../services/ejemplares.service.js';

//Pantalla que solo me permite devolver un prestamo, me muestra los datos del prestamo y no me permite modificarlos

export const DevolucionPrestamo = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const onSubmit = async (data) => {
    await prestamosService.updatePrestamo(id, data)
    const { fechaCompra, idLibro, } = await ejemplaresService.getEjemplar(data.ejemplar)
    await ejemplaresService.updateEjemplar(data.ejemplar, { fechaCompra, idLibro, estado: "Disponible" })
    navigate('/prestamos/listado')
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const [prestamo, setPrestamo] = useState(null);

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


    cargarPrestamo();
  }, [id, setValue]);

  return (
    <div className="container_app">
      <h4>Desarrollo de Software</h4>
      <h5>TRABAJO PRACTICO INTEGRADOR</h5>
      <h6>82904 94435 95826</h6>
      <hr />
      <h6>DEVOLUCION DE PRESTAMO</h6>
      <h6>ID: {id}</h6>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Ejemplar</Form.Label>
          <Form.Control type="text" {...register('ejemplar', { required: true })} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Prestamo</Form.Label>
          <Form.Control type="text" {...register('fechaPrestamo', { required: true })} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Devolucion</Form.Label>
          <Form.Control type="date" {...register('fechaDevolucion', { required: true })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre Cliente</Form.Label>
          <Form.Control type="text" {...register('nombreCliente', { required: true })} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido Cliente</Form.Label>
          <Form.Control type="text" {...register('apellidoCliente', { required: true })} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" {...register('descripcion', { required: true })}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Devolver Prestamo
        </Button>
      </Form>
    </div>
  )
}