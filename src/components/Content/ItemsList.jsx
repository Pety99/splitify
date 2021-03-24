import PropTypes from 'prop-types';
import { Fragment } from 'react';

function ItemsList(props) {
    console.log(props.items);
    return (
        <Fragment>
            {props.items.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </Fragment>
    );
}

ItemsList.propTypes = {
    items: PropTypes.array,
};

export default ItemsList;
