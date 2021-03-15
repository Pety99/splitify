import { Fragment } from "react";

import PropTypes from 'prop-types';

function RightPanel(props){
    return(
        <Fragment>
            RightPanel
            <p>{props.receiptData.name}</p>
        </Fragment>
    )
}
RightPanel.propTypes = {
    receiptData: PropTypes.object,
}
export default RightPanel;