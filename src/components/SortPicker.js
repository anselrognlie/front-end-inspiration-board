import React from 'react';
import PropTypes from 'prop-types';
import './SortPicker.css';

const SortPicker = ({ options, current, onSortChanged }) => {
    const onSelectChanged = (event) => {
        onSortChanged(event.target.value);
    };

    return (
        <div className="SortPicker">
            <label>Sort by:</label>
            <select value={current} onChange={onSelectChanged}>
                {options.map((option, i) => (
                    <option
                        key={i}
                        value={option.value}>{option.display}</option>
                ))}
            </select>
        </div>
    );
};

SortPicker.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        display: PropTypes.string.isRequired
    })).isRequired,
    onSortChanged: PropTypes.func.isRequired,
    current: PropTypes.string.isRequired,
};

export default SortPicker;
