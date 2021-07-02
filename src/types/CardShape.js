import PropTypes from 'prop-types';

const CardShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    'like_count': PropTypes.number.isRequired,
    'board_id': PropTypes.number.isRequired
});

export default CardShape;