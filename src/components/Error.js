import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => {
    const showMessage = message && message.length > 0;

    return (
        <div className="Error">
            { showMessage && <p>{ message }</p> }
        </div>
    );
};

Error.propTypes = {
    message: PropTypes.string
};

export default Error;
