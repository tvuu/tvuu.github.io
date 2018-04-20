import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = (props) => {
	const{page, totalPages, handlePaginationClick} = props;
	return (
		<div className="Pagination">
			<button 
				className="Pagination-button"
				onClick={() => handlePaginationClick('allPrev')}
				disabled={page <= 1}
			>
				&laquo;
			</button>
			<button 
				className="Pagination-button"
				onClick={() => handlePaginationClick('prev')}
				disabled={page <= 1}
			>
				&lsaquo;
			</button>
			<span className="Pagination-info">
				page <b>{page}</b> of <b>{totalPages}</b>
			</span>
			
			<button 
				className="Pagination-button"
				onClick={() => handlePaginationClick('next')}
				disabled={page >= totalPages}
			>
				&rsaquo;
			</button>
			<button 
				className="Pagination-button"
				onClick={() => handlePaginationClick('allNext')}
				disabled={page >= totalPages}
			>
				&raquo;	
			</button>
		</div>
	);
}

Pagination.propTypes = {
	totalPages: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	handlePaginationClick: PropTypes.func.isRequired,
};

export default Pagination;