import React from 'react';
import PropTypes from 'prop-types';
import BoardShape from '../types/BoardShape';
import BoardPickerItem from './BoardPickerItem';

const BoardPicker = ({ boards, onPick }) => {
    const showBoards = boards.length > 0;

    return (
        <div className="BoardPicker">
            {showBoards && (
                <ul>
                    {boards.map(board => (
                        <li key={board.id}><BoardPickerItem {...{board, onPick}} /></li>
                    ))}
                </ul>
            )}
        </div>
    );
};

BoardPicker.propTypes = {
    boards: PropTypes.arrayOf(BoardShape).isRequired,
    onPick: PropTypes.func.isRequired
};

export default BoardPicker;
