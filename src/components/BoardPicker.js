import React from 'react';
import PropTypes from 'prop-types';
import BoardShape from '../types/BoardShape';
import BoardPickerItem from './BoardPickerItem';
import './BoardPicker.css';

const BoardPicker = ({ boards, selectedBoard, onPick }) => {
    const showBoards = boards.length > 0;

    const optionClass = (board) => {
        return board.id == selectedBoard?.id ? "selectedBoard" : "";
    };

    return (
        <div className="BoardPicker">
            <div>
            {showBoards && (
                <ul>
                    {boards.map(board => (
                        <li key={board.id} className={optionClass(board)} ><BoardPickerItem {...{board, onPick}} /></li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
};

BoardPicker.propTypes = {
    boards: PropTypes.arrayOf(BoardShape).isRequired,
    selectedBoard: BoardShape,
    onPick: PropTypes.func.isRequired
};

export default BoardPicker;
