//import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import service from '../../services/libros.service.js'


export const RegistroLibro = () => {
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    data.categoria = parseInt(data.categoria, 10)
    await service.createLibro(data)
    navigate('/libros/listado')
  }
  const { register, handleSubmit,  formState: { errors } } = useForm()

  return (
    <div className="container_app">
      <h4>Desarrollo de Software</h4>
      <h5>TRABAJO PRACTICO INTEGRADOR</h5>
      <h6>82904 94435 95826</h6>
      <hr />
      <h6>REGISTRO DE LIBRO</h6>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Titulo</Form.Label>
          <Form.Control type="text" placeholder="Titulo" {...register('titulo')} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control type="text" placeholder="Autor" {...register('autor')} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Publicacion</Form.Label>
          <Form.Control type="date" {...register('fechaPubli', { required: true })} />
          {errors.fechaPubli && <span>Este campo es obligatorio</span>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Categoria</Form.Label>
					<Form.Control as="select"{...register("categoria", { required: true })}>
            <option value="">Seleccione una categoria</option>
						<option value="1">1.Novela</option>
						<option value="2">2.Distopia</option>
            <option value="3">3.Fantasia</option>
            <option value="4">4.Fabula</option>
            <option value="5">5.Romance</option>
            <option value="6">6.Drama</option>
            <option value="7">7.Autoayuda</option>
            <option value="8">8.Historia</option>
            <option value="9">9.Biografia</option>
            <option value="10">10.Infantil</option>
          </Form.Control>
          {errors.categoria && <span>Este campo es requerido</span>}
				</Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Editorial</Form.Label>
          <Form.Control type="text" placeholder="Editorial" {...register('editorial')} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
        <Button onClick={() => {navigate(-1)}} variant="secondary" type="submit">
          Volver
        </Button>
      </Form>
    </div>
  )};