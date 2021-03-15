import { Button } from "@material-ui/core";

import PropTypes from 'prop-types';

function ReceiptItem(props) {
    return (
        <Button variant="contained" color="primary" onClick={() => props.onClickHandler(props.data)}></Button>
    )
}

ReceiptItem.propTypes = {
    onClickHandler: PropTypes.func,
    data: PropTypes.object,
}

export default ReceiptItem;