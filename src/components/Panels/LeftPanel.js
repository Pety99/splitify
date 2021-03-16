import { Fragment } from "react"
import ReceiptsList from "../Content/ReceiptsList";

import PropTypes from 'prop-types';
import { Typography } from "@material-ui/core";

function LeftPanel(props) {
    return (
        <Fragment>
            <Typography variant="h5" component="p" gutterBottom> Reciepts</Typography>
            <ReceiptsList toggleLeftPanel={props.toggleLeftSide} />
        </Fragment>
    )
}

LeftPanel.propTypes = {
    toggleLeftSide: PropTypes.func,
}
export default LeftPanel;