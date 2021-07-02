import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

const defaultFormData = () => ({
    message: '',
    messageValid: false,
});

const NewCardForm = ({ createCardHandler }) => {
    const [isVisible, setVisible] = useState(true);
    const [formData, setFormData] = useState(defaultFormData);

    const toggleVisibility = () => {
        setVisible((visible) => {
            return ! visible;
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const cardData = {
            message: formData.message.trim(),
        };

        setFormData(defaultFormData());

        createCardHandler(cardData);
    };

    const makeValidName = (name) => `${name}Valid`;

    const isAllValid = () => {
        const fields = ['message'];
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
        <div className="NewCardForm">
            { isVisible ? (
                <>
                <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="message">Message:</label>
                    <input
                        name="message"
                        value={formData.message}
                        className={getClassName('message')}
                        onChange={makeChangeHandlerFor('message')} />
                </div>
                <input type="submit" {...makeSubmitProps()}></input>
                </form>
                <button onClick={toggleVisibility}>Hide New Card Form</button>
                </>
            ) : (
                <button onClick={toggleVisibility}>Show New Card Form</button>
            )}
        </div>
    );
};

NewCardForm.propTypes = {
    createCardHandler: PropTypes.func.isRequired
};

export default NewCardForm;
