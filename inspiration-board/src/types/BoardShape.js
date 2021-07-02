import PropTypes from 'prop-types';

const BoardShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
});

export default BoardShape;