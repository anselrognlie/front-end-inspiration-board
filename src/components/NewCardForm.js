import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

const defaultFormData = () => ({
    message: '',
    messageValid: false,
});

const NewCardForm = ({ createCardHandler }) => {
    const [isVisible, setVisible] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);

    const toggleVisibility = (event) => {
        event.preventDefault();

        setVisible((visible) => {
            return ! visible;
        });
    };

    const submitMessage = () => {
        const message = formData.message.trim();
        
        if (message.length === 0) { return; }

        const cardData = { message };

        setFormData(defaultFormData());

        createCardHandler(cardData);
    };

    const onSubmit = event => {
        event.preventDefault();
        submitMessage();
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

    const areaKeyHandler = event => {
        if (event.which === 13) {
            event.preventDefault();
            submitMessage();
        }
    };

    return (
        <div className="NewCardForm">
            { isVisible ? (
                <>
                <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        wrap="soft"
                        type="text"
                        name="message"
                        multiline="true"
                        value={formData.message}
                        className={getClassName('message')}
                        onKeyPress={areaKeyHandler}
                        onChange={makeChangeHandlerFor('message')} />
                </div>
                <div>
                <input type="submit" {...makeSubmitProps()}></input>
                <button onClick={toggleVisibility}>Hide New Card Form</button>
                </div>
                </form>
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
