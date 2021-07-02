import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import BoardPicker from './components/BoardPicker';
import SelectedBoard from './components/SelectedBoard';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import CardList from './components/CardList';
import Error from './components/Error';
import axios from 'axios';

const App = ({baseUrl}) => {
    const [boards, setBoards] = useState([]);
    const [cards, setCards] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(null);

    const clearError = () => {
        setErrorMessage('');
    };

    const upvoteCard = (card) => {
        clearError();

        return axios.patch(`${baseUrl}/cards/${card.id}/upvote`)
        .then(() => {
            refreshCards();
        })
        .catch(error => {
            console.log({ error });
            setErrorMessage(error.message);
        });
    };

    const deleteCard = (card) => {
        clearError();

        return axios.delete(`${baseUrl}/cards/${card.id}`)
        .then(() => {
            refreshCards();
        })
        .catch(error => {
            console.log({ error });
            setErrorMessage(error.message);
        });
    };

    const refreshCards = useCallback(() => {
        if (! selectedBoard) {
            setCards([]);
            return Promise.resolve();
        }

        clearError();

        return axios.get(`${baseUrl}/boards/${selectedBoard.id}/cards`)
        .then(response => {
            const cards = response.data;
            setCards(cards);
        })
        .catch(error => {
            console.log({ error });
            setErrorMessage(error.message);
        });
    }, [baseUrl, selectedBoard]);

    const createCard = (card) => {
        if (! selectedBoard) { return; }

        clearError();

        return axios.post(`${baseUrl}/boards/${selectedBoard.id}/cards`, card)
        .then(() => {
            return refreshCards();
        })
        .catch(error => {
            console.log({ error });
            setErrorMessage(error.message);
        });
    };

    const refreshBoards = useCallback(() => {
        clearError();

        return axios.get(`${baseUrl}/boards`)
        .then(response => {
            const boards = response.data;
            setBoards(boards);
        })
        .catch(error => {
            console.log({ error });
            setErrorMessage(error.message);
        });
    }, [baseUrl]);

    const createBoard = (board) => {
        clearError();

        return axios.post(`${baseUrl}/boards`, board)
        .then(() => {
            return refreshBoards();
        })
        .catch(error => {
            console.log({ error });
            setErrorMessage(error.message);
        });
    };

    const onBoardClicked = (board) => {
        setSelectedBoard(board);
    };

    useEffect(() => {
        refreshBoards();
    }, [refreshBoards]);

    useEffect(() => {
        refreshCards();
    }, [refreshCards, selectedBoard]);

    const hasBoard = !!selectedBoard;

    return (
        <div className="App">
            <Error message={errorMessage} />
            <BoardPicker boards={boards} onPick={onBoardClicked} />
            <SelectedBoard board={selectedBoard} />
            <NewBoardForm createBoardHandler={createBoard} />
            { hasBoard && ( 
                <>
                <CardList cards={cards} upvoteHandler={upvoteCard} deleteHandler={deleteCard} />
                <NewCardForm createCardHandler={createCard} />
                </>
            )}
        </div>
    );
};

App.propTypes = {
    baseUrl: PropTypes.string.isRequired
};

export default App;
