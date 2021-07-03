import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';

const Board = ({ title, owner }) => {
    const showDivider = title.length > 0 && owner.length > 0;
    const titleClass = `title ${showDivider && 'fullTitle'}`;

    return (
        <span className="Board">
            <span className={titleClass}>{ title }</span>
            <span className="owner">{ owner }</span>
        </span>
    );
};

Board.propTypes = {
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
};

export default Board;
