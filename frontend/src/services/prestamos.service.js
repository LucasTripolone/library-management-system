import axios from 'axios';
const API_URL = 'http://localhost:3000/api/prestamos';

export const getPrestamos = async (filtro) => {
  const response = await axios.get(filtro ? `${API_URL}?filtro=${filtro}` : API_URL);
  return response.data;
}

export const getPrestamo = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export const createPrestamo = async (prestamo) => {
  const response = await axios.post(API_URL, prestamo);
  return response.data;
}

export const updatePrestamo = async (id, prestamo) => {
  const response = await axios.put(`${API_URL}/${id}`, prestamo);
  return response.data;
}

export const deletePrestamo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

export default { getPrestamos, getPrestamo, createPrestamo, updatePrestamo, deletePrestamo };