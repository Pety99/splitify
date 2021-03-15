import { Fragment, useState } from "react";

import PropTypes from 'prop-types';
import ReceiptItem from "./ReceiptItem";


function ReceiptsList(props) {
    const [receipts] = useState([{ name: 'rec 1' }, { name: 'rec2' },]);
    return (
        <Fragment>
            <p>Receipts</p>
            <ReceiptItem data={receipts[0]} onClickHandler={props.toggleLeftPanel} />
            <ReceiptItem data={receipts[1]} onClickHandler={props.toggleLeftPanel} />
        </Fragment>
    );
}

ReceiptsList.propTypes = {
    toggleLeftPanel: PropTypes.func,
}
export default ReceiptsList;
