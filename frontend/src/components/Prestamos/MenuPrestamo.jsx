import React from 'react'
import { Link } from 'react-router-dom';

export const MenuPrestamo = () => {
    return (
        <div className="container_app">
            <h4>Desarrollo de Software</h4>
            <h5>TRABAJO PRACTICO INTEGRADOR</h5>
            <h6>82904 94435 95826</h6>
            <hr />
            <h6>PRESTAMOS</h6>
            
            <nav className='btn-group mt-3 pb-1'>
                <Link className='btn btn-primary' to='/prestamos/listado'>Consultar Prestamos</Link>
                <Link className='btn btn-success' to='/prestamos/registro'>Registrar Prestamo</Link>
                <Link className='btn btn-secondary' to='/'>Volver al Menu Principal</Link>
            </nav>
            
        </div>
    );
}

