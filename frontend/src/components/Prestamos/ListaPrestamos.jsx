import React, { useState, useEffect } from 'react'
import service from '../../services/prestamos.service.js'
import { useNavigate } from "react-router-dom"
import { TablaPrestamos } from './TablaPrestamos.jsx'
import { PaginationPrestamos } from './PaginationPrestamos.jsx'

export const ListaPrestamos = () => {
  const navigate = useNavigate()
  const [prestamos, setPrestamos] = useState([])
  const [filtro, setFiltro] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)

  const cargarPrestamos = () => {
    service.getPrestamos().then(data => {
      setPrestamos(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    cargarPrestamos()
  }, [])

  const filtrar = async () => {
    const prestamos = await service.getPrestamos(filtro)
    setPrestamos(prestamos)
    setCurrentPage(1)
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = prestamos.slice(firstPostIndex, lastPostIndex)

  const handleChange = (e) => {
    setFiltro(e.target.value)
  }

  return (
    <div className="container_app">
      <h4>Desarrollo de Software</h4>
      <h5>TRABAJO PRACTICO INTEGRADOR</h5>
      <h6>82904 94435 95826</h6>
      <hr />
      <h6>PRESTAMOS</h6>
      <nav className='btn-group mt-3 pb-1'>
        <button className='btn btn-primary' onClick={() => navigate('/prestamos/registro')}>Agregar Prestamo</button>
        <button className='btn btn-success' onClick={() => navigate('/')}>Volver al Menu Principal</button>
      </nav>
      <form className='form-group mt-3 pb-1'>
        <label>Filtro:</label>
        <input type='text' className='form-control' placeholder='Filtro' value={filtro} onChange={handleChange} />
        <button className='btn btn-outline-secondary' type='button' onClick={filtrar}>Filtrar</button>
        
      </form>
      {
        loading ? <p>Cargando...</p> : <TablaPrestamos prestamos={currentPosts}  cargarPrestamos={cargarPrestamos} />
      }
      <PaginationPrestamos totalPosts={prestamos.length} 
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}/>
    </div>
  )
}
