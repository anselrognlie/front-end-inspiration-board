import React from 'react';
import PropTypes from 'prop-types';

const Board = ({ title, owner }) => {
    const showDivider = title.length > 0 && owner.length > 0;

    return (
        <span className="Board">
            <span className="title">{ title }</span>
            { showDivider && ' - ' }
            <span className="owner">{ owner }</span>
        </span>
    );
};

Board.propTypes = {
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
};

export default Board;
