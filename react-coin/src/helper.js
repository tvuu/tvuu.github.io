/**
 * Make this helper file so we can use the same code in multiple places
 * @param {object} response
 */
import React from 'react';

export const handleResponse = (response) => {
	    	// Convert response object to json object
	     	return response.json().then(json => {
	     		/**
	     		 * check whether the connection(response) was successful(ok)
	     		 * if ok is true, return json, else rejects 'Promise' so we 
	     		 * can handle the error in the .catch((error)) handler below
	     		 */
	        	return response.ok ? json : Promise.reject(json);
	      	});
}

/**
 * Create a separate conditional render method for changing % in table
 * @param {string} percent
 */
export const renderChangePercent = (percent) => {
	if(percent > 0) {
		// &uarr is the html entity 'up arrow'
		return <span className="percent-raised">{percent}% &uarr;</span>
	}
	else if(percent < 0) {
		// &uarr is the html entity 'down arrow'
		return <span className="percent-fallen">{percent}% &darr;</span>
	}
	else {
		return <span>{percent}</span>
	}
}