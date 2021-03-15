import { Fragment } from "react"
import ReceiptsList from "../Content/ReceiptsList";

import PropTypes from 'prop-types';

function LeftPanel(props) {
    return (
        <Fragment>
            LeftPanel
            <ReceiptsList toggleLeftPanel={props.toggleLeftSide}/>
        </Fragment>
    )
}

LeftPanel.propTypes = {
    toggleLeftSide: PropTypes.func,    
}
export default LeftPanel;