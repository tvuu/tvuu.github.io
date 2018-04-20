import React from 'react';
import {handleResponse} from '../../helper';
import {API_URL} from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
	constructor() {
		// Call super() to initialize the class constructor
		super();

		// Initialize all the current state variables
		this.state = {
			// Initially not loading
			loading: false, 
			// Initially empty array for the currencies
			currencies: [],
			// Initially no error
			error: null,
			totalPages: 0,
			page: 1,
		};
		this.handlePaginationClick = this.handlePaginationClick.bind(this);
	}

	componentDidMount() {
		this.fetchCurrencies();
	}

	/**
	 * Need to put fetch in another function and call that function, otherwise
	 * the pagination clicks won't fetch a new page
	 */
	 fetchCurrencies() {
		// Must now set the states we initialized above
		this.setState({loading: true});

		const {page} = this.state;

		// Fetching data in real time from the following api
		fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
		    .then(handleResponse)
		    .then((data) => {
		    	// Destructure so we can use the states without prepending
		    	const{currencies, totalPages} = data;

				// Fill the currencies array and loading state with the pulled data 
			    this.setState({
			    	/**
			    	 * currencies: currencies,
			    	 * totalPages: totalPages,
			    	 * In ES6, when key and object match, we can just use
			    	 * the object, i.e. currencies, totalPages without colon
			    	 */
			    	currencies,
			    	totalPages,
			    	loading: false,
			    });
		    })
		    .catch((error) => {
		    	// Assign data for the error we get from fetch to our error state
		    	this.setState({
		    		error: error.errorMessage, 
		    		loading: false,
		    	});
		    });
	 }

	/**
	 * We must change the state of each pagination click and pass that
	 * state change as a prop to Pagination.js. Instead of creating 2
	 * separate functions for each click (left vs. right), we can just
	 * create 1 and pass a direction parameter.
	 */
	handlePaginationClick(direction) {
		// Using let instead of const because it is a dynamic variable
		let nextPage = this.state.page;
		let totalPages = this.state.totalPages;

		/** 
		 * Can also be written...
		 * nextPage = direction === 'next' ? nextPage+1 : nextPage-1;
		 */
		if(direction === 'next') {
			nextPage++;
		}
		if(direction === 'allNext') {
			nextPage = totalPages;
		}
		if(direction === 'prev') {
			nextPage--;
		}
		if(direction === 'allPrev') {
			nextPage = totalPages - (totalPages-1);
		}

		
		/**
		 * setState works asynchronously so we must fetch inside the
		 * setState using a callback
		 */
		this.setState({page: nextPage}, () => {
			/**
		 	 * Call fetchCurrencies function inside setState's callback
		 	 * to make sure the first page state is updated correctly
		 	 */
		 	 this.fetchCurrencies();
		});

	}

	render() {
		/**
		 * Called "destructuring" same as:
		 * const loading = this.state.loading
		 * const error = this.state.error
		 * const currencies = this.state.currencies 
		 * 
		 * So we don't need to prepend 'this.state' in every subsequent use
		 */
		
		const {loading, error, currencies, page, totalPages} = this.state;
		/**
		  * Log everything to console in the render method
		  *		console.log(this.state);
		  */

		// Render loading component if loading state is true
		if(loading) {
			// Use the imported loading function
			return <div className="loading-container"><Loading/></div>
		}

		// Render error component if error occured while fetching data
		if(error) {
			return <div className="error">{error}</div>
		}

		return (
			/**
			 * Import table setup from Table.js, giving a custom property
			 * 'currencies' to the table and set it to the currencies in
			 * this scope. 
			 */
			<div>
				<Table 
					currencies={currencies}
					renderChangePercent={this.renderChangePercent}
				/>

				<Pagination
					page={page}
					totalPages={totalPages}
					handlePaginationClick={this.handlePaginationClick}
				/>
			</div>
		);
	}
}

export default List;