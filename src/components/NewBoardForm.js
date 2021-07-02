import React, { useState } from 'react';
import Board from './Board';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const defaultFormData = () => ({
    title: '',
    ownerValid: false,
    owner: '',
    titleValid: false
});

const NewBoardForm = ({ createBoardHandler }) => {
    const [isVisible, setVisible] = useState(true);
    const [formData, setFormData] = useState(defaultFormData);

    const toggleVisibility = () => {
        setVisible((visible) => {
            return ! visible;
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const boardData = {
            title: formData.title.trim(),
            owner: formData.owner.trim()
        };

        setFormData(defaultFormData());

        createBoardHandler(boardData);
    };

    const makeValidName = (name) => `${name}Valid`;

    const isAllValid = () => {
        const fields = ['title', 'owner'];
        return fields.reduce((valid, field) => {
            const validName = makeValidName(field);
            return valid && formData[validName];
        }, true);
    };

    const makeSubmitProps = () => {
        return isAllValid() ? {} : { disabled: true }
    };

    const makeChangeHandlerFor = (name) => {
        return (event) => {
            setFormData((data) => {
                const validName = makeValidName(name);
                const value = event.target.value;
                const valid = value.trim().length > 0;
                const newData = {...data, [name]: value, [validName]: valid};

                return newData;
            });
        };
    };

    const getClassName = (name) => {
        const validName = makeValidName(name);
        return formData[validName] ? 'valid' : 'invalid';
    };

    return (
        <div className="NewBoardForm">
            { isVisible ? (
                <>
                <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        name="title"
                        value={formData.title}
                        className={getClassName('title')}
                        onChange={makeChangeHandlerFor('title')} />
                </div>
                <div>
                    <label htmlFor="owner">Owner&apos;s Name:</label>
                    <input 
                        name="owner" 
                        value={formData.owner}
                        className={getClassName('owner')}
                        onChange={makeChangeHandlerFor('owner')} />
                </div>
                <p>Preview: <Board {...formData} /></p>
                <input type="submit" {...makeSubmitProps()}></input>
                </form>
                <button onClick={toggleVisibility}>Hide New Board Form</button>
                </>
            ) : (
                <button onClick={toggleVisibility}>Show New Board Form</button>
            )}
        </div>
    );
};

NewBoardForm.propTypes = {
    createBoardHandler: PropTypes.func.isRequired
};

export default NewBoardForm;
