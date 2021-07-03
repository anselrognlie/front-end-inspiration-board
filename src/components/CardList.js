import React from 'react';
import PropTypes from 'prop-types';
import CardShape from '../types/CardShape';
import Card from './Card';
import './CardList.css';

const CardList = ({ cards, ...rest }) => {
    const showCards = cards.length > 0;

    return (
        <div className="CardList">
            {showCards && (
                <ul>
                    {cards.map(card => (
                        <li key={card.id}><Card {...{card, ...rest}} /></li>
                    ))}
                </ul>
            )}
        </div>
    );
};

CardList.propTypes = {
    cards: PropTypes.arrayOf(CardShape).isRequired,
    upvoteHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};

export default CardList;
