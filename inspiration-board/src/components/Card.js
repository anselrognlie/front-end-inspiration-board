import React from 'react';
import PropTypes from 'prop-types';
import CardShape from '../types/CardShape';

const Card = ({ card, upvoteHandler, deleteHandler }) => {
    return (
        <div className="Card">
            <p>{ card.message }</p>
            <p>{ card.like_count }</p>
            <p onClick={() => upvoteHandler(card)}>+1</p>
            <p onClick={() => deleteHandler(card)}>Delete</p>
        </div>
    );
};

Card.propTypes = {
    card: CardShape,
    upvoteHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};

export default Card;
