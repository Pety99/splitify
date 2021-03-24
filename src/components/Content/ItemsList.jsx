import PropTypes from 'prop-types';
import { Fragment } from 'react';

import Placeholder from '../Placeholders/Placeholer';
import placeholderImge from '../Placeholders/image.svg';

function ItemsList(props) {
    console.log(props.items);
    return props.items.length > 0 ? (
        <Fragment>
            {props.items.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </Fragment>
    ) : (
        <Placeholder
            primaryText={'asdasd'}
            secondaryText={'asads'}
            image={placeholderImge}
        />
    );
}

ItemsList.propTypes = {
    items: PropTypes.array,
};

export default ItemsList;
