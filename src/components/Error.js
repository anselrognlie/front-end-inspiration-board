import React from 'react';
import PropTypes from 'prop-types';
import './Error.css'

const Error = ({ message }) => {
    const showMessage = message && message.length > 0;

    return showMessage && (
        <div className="Error">
            <p>{ message }</p> 
        </div>
    );
};

Error.propTypes = {
    message: PropTypes.string
};

export default Error;
