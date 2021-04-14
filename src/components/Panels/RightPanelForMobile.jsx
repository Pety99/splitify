import { Button, Divider, Hidden, makeStyles } from '@material-ui/core';
import { Fragment } from 'react';
import RightPanel from './RightPanel';

import PropTypes from 'prop-types';
import LeftPanel from './LeftPanel';
import { ArrowBackIos } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    back: {
        marginTop: -theme.spacing(11.5),
        borderRadius: theme.spacing(6),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        height: '100%',
        marginRight: 'auto',
        marginLeft: theme.spacing(-3),
    },
    hr: {
        margin: `${theme.spacing(3)}px ${theme.spacing(0)}px`,
    },
}));

/**
 * Shows the left panel on large screens,
 * Shows the left panel on the left and toggles it,
 * so the right panel will show up there on small devices.
 * @param {object} props
 * @returns
 */
function RightPanelForMobile(props) {
    const classes = useStyles();

    return (
        <Fragment>
            <Hidden smDown>
                <LeftPanel
                    toggleLeftSide={props.backButtonClickHandler}
                    groupId={props.currentGroup.key}
                />
            </Hidden>
            <Hidden mdUp>
                <div className={classes.root}>
                    {props.selectedChipIndex != 1 && (
                        <Button
                            onClick={props.backButtonClickHandler}
                            className={classes.back}
                            startIcon={<ArrowBackIos />}
                        >
                            Back
                        </Button>
                    )}
                </div>
                <Divider className={classes.hr} />
                <RightPanel
                    receiptData={props.receiptData}
                    currentGroup={props.currentGroup}
                    groupMembers={props.members}
                    isAnalytics={props.selectedChipIndex == 1}
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
    selectedChipIndex: PropTypes.number,
};

export default RightPanelForMobile;
