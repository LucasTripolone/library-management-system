/* eslint-disable react/prop-types */
import React from 'react'
import './PaginationPrestamos.css';

export const PaginationPrestamos = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage
}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className='pagination'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
            </button>
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    disabled={currentPage === page}
                    className={currentPage === page ? 'active' : ''}
                >
                    {page}
                </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pages.length}>
                Siguiente
            </button>
        </div>
    );
};