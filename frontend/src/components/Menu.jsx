//import React from 'react'
import { Link } from 'react-router-dom';

export const Menu = () => {
    return (
        <div className="container_app">
            <h4>Desarrollo de Software</h4>
            <h5>TRABAJO PRACTICO INTEGRADOR</h5>
            <h6>82904 94435 95826</h6>
            <hr />
            <h6>BIBLIOTECA</h6>
            
            <nav className='btn-group mt-3 pb-1'>
                <Link className='btn btn-primary' to='/libros'>Gestionar Libros</Link>
                <Link className='btn btn-success' to='/ejemplares'>Gestionar Ejemplares</Link>
                <Link className='btn btn-warning' to='/prestamos'>Gestionar Prestamos</Link>
            </nav>
        </div>
    );
}