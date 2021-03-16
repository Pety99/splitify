import { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import ReceiptItem from './ReceiptItem';

function ReceiptsList(props) {
    const [receipts] = useState([
        {
            name: 'Walmart 1',
            date: '2017-07-28',
            logo: 'https://cdn.veryfi.com/logos/us/218078496.jpeg',
            total: 82.637264234,
        },
        {
            name: 'Walmart 2',
            date: '2017-07-288',
            logo: 'https://cdn.veryfi.com/logos/us/218078496.jpeg',
            total: 82.63,
        },
    ]);
    return (
        <Fragment>
            <p>Receipts</p>
            <ReceiptItem
                data={receipts[0]}
                onClickHandler={props.toggleLeftPanel}
            />
            <ReceiptItem
                data={receipts[1]}
                onClickHandler={props.toggleLeftPanel}
            />
            <ReceiptItem
                data={receipts[1]}
                onClickHandler={props.toggleLeftPanel}
            />
        </Fragment>
    );
}

ReceiptsList.propTypes = {
    toggleLeftPanel: PropTypes.func,
};
export default ReceiptsList;
