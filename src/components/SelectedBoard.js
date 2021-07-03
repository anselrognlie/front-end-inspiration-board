import React from 'react';
import BoardShape from '../types/BoardShape';
import Board from './Board';
import './SelectedBoard.css';

const SelectedBoard = ({ board }) => {
    const showBoard = !!board;

    return (
        <div className="SelectedBoard">
            { showBoard ? (
                <Board {...board} />
            ) : (
                <p>Select a Board from the Board List!</p>
            )}
        </div>
    );
};

SelectedBoard.propTypes = {
    board: BoardShape
};

export default SelectedBoard;
