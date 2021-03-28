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
                <LeftPanel
                    toggleLeftSide={props.backButtonClickHandler}
                    groupId={props.currentGroup.key}
                />
            </Hidden>
            <Hidden mdUp>
                <Button
                    variant="contained"
                    onClick={props.backButtonClickHandler}
                >
                    Back
                </Button>
                <RightPanel
                    receiptData={props.receiptData}
                    currentGroup={props.currentGroup}
                    groupMembers={props.members}
                />
            </Hidden>
        </Fragment>
    );
}

RightPanelForMobile.propTypes = {
    backButtonClickHandler: PropTypes.func,
    receiptData: PropTypes.object,
    currentGroup: PropTypes.object,
    members: PropTypes.array,
};

export default RightPanelForMobile;
