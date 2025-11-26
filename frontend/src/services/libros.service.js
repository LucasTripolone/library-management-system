import axios from 'axios';
const API_URL = 'http://localhost:3000/api/libros';

export const getLibros = async (filtro) => {
  const response = await axios.get(filtro ? `${API_URL}?filtro=${filtro}` : API_URL);
  return response.data;
}

export const getLibro = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export const createLibro = async (libro) => {
  const response = await axios.post(API_URL, libro);
  return response.data;
}

export const updateLibro = async (id, libro) => {
  const response = await axios.put(`${API_URL}/${id}`, libro);
  return response.data;
}

export const getCategorias = async () => {
    const response = await axios.get('http://localhost:3000/api/categoria');
    return response.data;
  }

export const deleteLibro = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

export default { getLibros, getLibro, createLibro, updateLibro, getCategorias, deleteLibro };