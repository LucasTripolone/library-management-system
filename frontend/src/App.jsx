import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { UserProvider } from './components/Contexto/UserContext'

import { Navbar } from './components/Navbar/Navbar'
import { Menu } from './components/Menu'
import { Inicio } from "./components/Inicio/Inicio"
import { RegistroUsuario } from './components/registro/RegistroUsuario'

import { MenuPrestamo } from './components/Prestamos/MenuPrestamo'
import { RegistroPrestamo } from './components/Prestamos/RegistroPrestamo'
import { ListaPrestamos } from './components/Prestamos/ListaPrestamos'
import { EditarPrestamo } from './components/Prestamos/EditarPrestamo'
import { DevolucionPrestamo } from './components/Prestamos/DevolucionPrestamo'

import { MenuLibro } from './components/Libros/MenuLibros'
import { RegistroLibro } from './components/Libros/RegistroLibros'
import { ListaLibros } from './components/Libros/ListaLibros'
import { EditarLibro } from './components/Libros/EditarLibros'

import { MenuEjemplares } from './components/Ejemplares/MenuEjemplar'
import { ListaEjemplares } from './components/Ejemplares/ListaEjemplares'
import { RegistroEjemplar } from './components/Ejemplares/RegistroEjemplar'
import { EditarEjemplar } from './components/Ejemplares/EditarEjemplar'


import './App.css'

function App() {

  return (
    <div>
      <UserProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/registro' element={<RegistroUsuario/>} />
            
            <Route path='/prestamos' element={<MenuPrestamo />} />
            <Route path='/prestamos/registro' element={<RegistroPrestamo />} />
            <Route path='/prestamos/listado' element={<ListaPrestamos />} />
            <Route path='/prestamos/editar/:id' element={<EditarPrestamo />} />
            <Route path='/prestamos/devolucion/:id' element={<DevolucionPrestamo />} />

            <Route path='/libros' element={<MenuLibro />} />
            <Route path='/libros/registro' element={<RegistroLibro />} />
            <Route path='/libros/listado' element={<ListaLibros />} />
            <Route path='/libros/editar/:id' element={<EditarLibro />} />

            <Route path='/ejemplares' element={<MenuEjemplares />} />
            <Route path='/ejemplares/listado' element={<ListaEjemplares />} />
            <Route path='/ejemplares/registro' element={<RegistroEjemplar />} />
            <Route path='/ejemplares/editar/:id' element={<EditarEjemplar />} />



          </Routes>
        </div>
      </Router>
      </UserProvider>
    </div>
  )
}

export default App
