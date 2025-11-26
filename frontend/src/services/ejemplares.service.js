import axios from 'axios';
const URL = 'http://localhost:3000/api/ejemplares';

export const getEjemplares = async (filtro) => {
  const response = await axios.get(filtro ? `${URL}?filtro=${filtro}` : URL);
  return response.data;
}

export const getEjemplaresDisponibles = async () => {
  const response = await axios.get(`${URL}/disponibles`);
  return response.data;
}

export const getEjemplar = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
}

export const createEjemplar = async (ejemplar) => {
  const response = await axios.post(URL, ejemplar);
  return response.data;
}

export const updateEjemplar = async (id, ejemplar) => {
  const response = await axios.put(`${URL}/${id}`, ejemplar);
  return response.data;
}

export const deleteEjemplar = async (id) => {
  const response = await axios.delete(`${URL}/${id}`);
  return response.data;
}

export const getLibros = async () => {
  const response = await axios.get('http://localhost:3000/api/libros');
  return response.data;
}

export default { getEjemplares, getEjemplaresDisponibles, getEjemplar, createEjemplar, updateEjemplar, deleteEjemplar, getLibros };