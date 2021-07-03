import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import BoardPicker from './components/BoardPicker';
import SelectedBoard from './components/SelectedBoard';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import CardList from './components/CardList';
import SortPicker from './components/SortPicker';
import Error from './components/Error';
import axios from 'axios';

const sortOptions = [
    { value: "", display: "None" },
    { value: "message-asc", display: "Alphabetically (A-Z)" },
    { value: "message-desc", display: "Alphabetically (Z-A)" },
    { value: "likes-asc", display: "Likes (Increasing)" },
    { value: "likes-desc", display: "Likes (Decreasing)" },
];

const defaultSort = '';
let errorCleared = false;

const App = ({baseUrl}) => {
    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [sortBy, setSortBy] = useState(defaultSort);
    errorCleared = false;

    const clearError = () => {
        // only clear once per render
        if (! errorCleared) {
            setErrorMessage('');
        }

        errorCleared = true;
    };

    const errorHandler = (error) => {
        console.log({ error });
        setErrorMessage(error.message);
    }

    const changeSort = (option) => {
        setSortBy(option);
    }

    const upvoteCard = (card) => {
        clearError();

        return axios.patch(`${baseUrl}/cards/${card.id}/upvote`)
        .then(() => {
            refreshCards();
        })
        .catch(errorHandler);
    };

    const deleteCard = (card) => {
        clearError();

        return axios.delete(`${baseUrl}/cards/${card.id}`)
        .then(() => {
            refreshCards();
        })
        .catch(errorHandler);
    };

    const refreshCards = useCallback(() => {
        clearError();

        if (! selectedBoard) {
            setCards([]);
            return Promise.resolve();
        }

        return axios.get(`${baseUrl}/boards/${selectedBoard.id}/cards?sort=${sortBy}`)
        .then(response => {
            const cards = response.data;
            setCards(cards);
        })
        .catch(errorHandler);
    }, [baseUrl, selectedBoard, sortBy]);

    const createCard = (card) => {
        if (! selectedBoard) { return; }

        clearError();

        return axios.post(`${baseUrl}/boards/${selectedBoard.id}/cards`, card)
        .then(() => {
            return refreshCards();
        })
        .catch(errorHandler);
    };

    const refreshBoards = useCallback(() => {
        clearError();

        return axios.get(`${baseUrl}/boards`)
        .then(response => {
            const boards = response.data;
            setBoards(boards);
        })
        .catch(errorHandler);
    }, [baseUrl]);

    const createBoard = (board) => {
        clearError();

        return axios.post(`${baseUrl}/boards`, board)
        .then(() => {
            return refreshBoards();
        })
        .catch(errorHandler);
    };

    const onBoardClicked = (board) => {
        setSelectedBoard(board);
    };

    useEffect(() => {
        refreshBoards();
    }, [refreshBoards]);

    useEffect(() => {
        refreshCards();
    }, [refreshCards, selectedBoard, sortBy]);

    const hasBoard = !!selectedBoard;

    return (
        <div className="App">
            <Error message={errorMessage} />
            <div className="board-bits">
                <div>
                    <h1>Inspiration Board</h1>
                    <BoardPicker boards={boards} selectedBoard={selectedBoard} onPick={onBoardClicked} />
                </div>
                <SelectedBoard board={selectedBoard} />
                <NewBoardForm createBoardHandler={createBoard} />
            </div>
            { hasBoard && ( 
                <>
                <SortPicker options={sortOptions} current={sortBy} onSortChanged={changeSort} />
                <NewCardForm createCardHandler={createCard} />
                <CardList cards={cards} upvoteHandler={upvoteCard} deleteHandler={deleteCard} />
                </>
            )}
        </div>
    );
};

App.propTypes = {
    baseUrl: PropTypes.string.isRequired
};

export default App;
