import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css'

const Loading = (props) => {
	const {width, height} = props;

	return <div className="Loading" style={{width, height}} />;
}

// This is the default loading size if no width/height is specified
Loading.defaultProps = {
	width: '28px',
	height: '28px',
};

Loading.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
};

export default Loading;