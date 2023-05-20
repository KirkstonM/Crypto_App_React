import React from 'react';
import './pagination.css';

function Pagination({ coinsPerPage, totalCoins, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pageNumbers.push(i)
    };

    return (
        <div className='paginate'>
            {
                pageNumbers.map(number => (
                    <div key={number} className='pagination-btns'>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Pagination