import { Button, Hidden } from '@material-ui/core';
import { Fragment } from 'react';
import RightPanel from './RightPanel';

import PropTypes from 'prop-types';
import LeftPanel from './LeftPanel';

/**
 * Shows the left panel on large screens,
 * Shows the left panel on the left and toggles it,
 * so the right panel will show up there on small devices.
 * @param {object} props
 * @returns
 */
function RightPanelForMobile(props) {
    return (
        <Fragment>
            <Hidden smDown>
                <LeftPanel toggleLeftSide={props.backButtonClickHandler} />
            </Hidden>
            <Hidden mdUp>
                <Button
                    variant="contained"
                    onClick={props.backButtonClickHandler}
                >
                    Back
                </Button>
                <RightPanel receiptData={props.receiptData} />
            </Hidden>
        </Fragment>
    );
}

RightPanelForMobile.propTypes = {
    backButtonClickHandler: PropTypes.func,
    receiptData: PropTypes.object,
};

export default RightPanelForMobile;