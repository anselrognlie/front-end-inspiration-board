import React from 'react';
import PropTypes from 'prop-types';
import BoardShape from '../types/BoardShape';
import './BoardPickerItem.css';

const BoardPickerItem = ({ board, onPick }) => {

    const onBoardClicked = () => {
        onPick(board);
    };

    return (
        <div className="BoardPickerItem" onClick={onBoardClicked}>
            <span className="title">{ board.title }</span>
        </div>
    );
};

BoardPickerItem.propTypes = {
    board: BoardShape.isRequired,
    onPick: PropTypes.func.isRequired
};

export default BoardPickerItem;
