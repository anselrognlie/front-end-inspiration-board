import React from 'react';
import PropTypes from 'prop-types';
import CardShape from '../types/CardShape';
import './Card.css';

const Card = ({ card, upvoteHandler, deleteHandler }) => {
    return (
        <div className="Card">
            <div>
                <p className="message">{ card.message }</p>
            </div>
            <div className="controls">
                <p>{ card.like_count }💕</p>
                <p onClick={() => upvoteHandler(card)}>+1</p>
                <p onClick={() => deleteHandler(card)}>🗑</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    card: CardShape,
    upvoteHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};

export default Card;
