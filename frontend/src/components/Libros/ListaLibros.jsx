import { useState, useEffect } from 'react'
import service from '../../services/libros.service.js'
import { useNavigate } from "react-router-dom"
import { TablaLibros } from './TablaLibros.jsx'
import { PaginationLibros } from './PaginationLibros.jsx'
import { Button } from 'react-bootstrap'


export const ListaLibros = () => {
  const navigate = useNavigate()
  const [libros, setLibros] = useState([])
  const [filtro, setFiltro] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)

  const cargarLibros = () => {
    service.getLibros().then(data => {
      setLibros(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    cargarLibros()
  }, [])

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = libros.slice(firstPostIndex, lastPostIndex)

  const filtrar = async () => {
    const libros = await service.getLibros(filtro)
    setLibros(libros)
    setCurrentPage(1)
  }

  const handleChange = (e) => {
    setFiltro(e.target.value)
  }

  return (
    <div className="container_app">
      <h4>Desarrollo de Software</h4>
      <h5>TRABAJO PRACTICO INTEGRADOR</h5>
      <h6>82904 94435 95826</h6>
      <hr />
      <h6>LIBROS</h6>
      <nav className='btn-group mt-3 pb-1'>
        <button className='btn btn-primary' onClick={() => navigate('/libros/registro')}>Agregar Libro</button>
        <Button onClick={() => {navigate('/libros')}} variant="secondary" type="submit">
          Volver
        </Button>
      </nav>
      <form className='form-group mt-3 pb-1'>
        <label>Filtro:</label>
        <input type='text' className='form-control' placeholder='Filtro' value={filtro} onChange={handleChange} />
        <button className='btn btn-outline-secondary' type='button' onClick={filtrar}>Filtrar</button>
        
      </form>
      {
        loading ? <p>Cargando...</p> : <TablaLibros libros={currentPosts}  cargarLibros={cargarLibros} />
      }
        <PaginationLibros totalPosts={libros.length} 
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}/>
    </div>
  )
}
