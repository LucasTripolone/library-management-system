import React, { useState, useEffect } from "react";
import service from "../../services/ejemplares.service.js";
import { useNavigate } from "react-router-dom";
import { TablaEjemplares } from "./TablaEjemplares.jsx";
import { PaginationEjemplares } from './PaginationEjemplares.jsx';

export const ListaEjemplares = () => {
  const navigate = useNavigate();
  const [ejemplares, setEjemplares] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const cargarEjemplares = () => {
    service.getEjemplares().then((data) => {
      setEjemplares(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    cargarEjemplares();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = ejemplares.slice(firstPostIndex, lastPostIndex);

  const filtrar = async () => {
    const ejemplares = await service.getEjemplares(filtro);
    setEjemplares(ejemplares);
    setCurrentPage(1)
  };

  const handleChange = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <div className="container_app">
      <h4>Desarrollo de Software</h4>
      <h5>TRABAJO PRACTICO INTEGRADOR</h5>
      <h6>82904 94435 95826</h6>
      <hr />
      <h6>EJEMPLARES</h6>
      <nav className="btn-group mt-3 pb-1">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/ejemplares/registro")}
        >
          Agregar Ejemplar
        </button>
        <button className="btn btn-success" onClick={() => navigate("/")}>
          Volver al Menu Principal
        </button>
      </nav>
      <form className="form-group mt-3 pb-1">
        <label>Filtro:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Filtro"
          value={filtro}
          onChange={handleChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={filtrar}
        >
          Filtrar
        </button>
      </form>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <TablaEjemplares
          ejemplares={currentPosts}
          cargarEjemplares={cargarEjemplares}
        />
      )}
      <PaginationEjemplares
        totalPosts={ejemplares.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};
