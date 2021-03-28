import { Grid, Hidden, makeStyles, Paper } from '@material-ui/core';
import { Fragment, useEffect, useState } from 'react';
import LeftPanel from '../Panels/LeftPanel';
import RightPanel from '../Panels/RightPanel';
import RightPanelForMobile from '../Panels/RightPanelForMobile';

import PropTypes from 'prop-types';
import Members from '../GroupDetails/Members';
import Chips from '../GroupDetails/Chips';
import Placeholder from '../Placeholders/Placeholer';
import placeholderImge from '../Placeholders/image.svg';
import useWindowDimensions from '../../hooks/useWindowDimension';
import { subscribeToEvent, unsubscribeFromEvents } from '../../database';

const useStyles = makeStyles((theme) => {
    const glass = {
        background: 'rgba( 255, 255, 255, 0.25 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        /*backdropFilter: 'blur( 4px )',*/
        borderRadius: '15px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
    };

    return {
        root: {
            flexGrow: 1,
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            flex: '1 0 auto',
            margin: theme.spacing(1),
            height: 'auto',
        },
        glass: glass,
    };
});

function Receipts({ currentGroup, groupDeleted }) {
    const classes = useStyles();
    const [currentReceipt, setCurrentReceipt] = useState({});
    const [rightShowOnLeft, setRightShownOnLeft] = useState(false);
    const [members, setMembers] = useState([]);
    const { width } = useWindowDimensions();
    const toggleLeftSide = (receiptData) => {
        if (width < 960) {
            setRightShownOnLeft(!rightShowOnLeft);
        }
        setCurrentReceipt(receiptData);
    };

    const handleReceiptChanged = (snap) => {
        const newValue = {
            ...currentReceipt.value,
            total: snap.val(),
        };
        setCurrentReceipt((prev) => ({ key: prev.key, value: newValue }));
    };

    useEffect(() => {
        subscribeToEvent(
            'child_changed',
            `/receipts/${currentGroup.key}/${currentReceipt.key}`,
            [handleReceiptChanged]
        );
        return () => {
            unsubscribeFromEvents(
                'child_changed',
                `/receipts/${currentGroup.key}/${currentReceipt.key}`
            );
        };
    });

    const leftSide = rightShowOnLeft ? (
        <RightPanelForMobile
            backButtonClickHandler={toggleLeftSide}
            receiptData={currentReceipt}
            currentGroup={currentGroup}
            members={members}
        />
    ) : (
        <LeftPanel toggleLeftSide={toggleLeftSide} groupId={currentGroup.key} />
    );

    return currentGroup ? (
        <div className={classes.root}>
            <Chips data={[{ name: 'Items' }, { name: 'Analytics' }]} />
            <Members
                currentGroup={currentGroup}
                groupDeleted={groupDeleted}
                members={members}
                setMembers={setMembers}
            ></Members>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs md={6} lg={4}>
                    <Fragment>{leftSide}</Fragment>
                </Grid>
                <Hidden smDown>
                    <Grid item xs>
                        <Paper className={`${classes.paper} ${classes.glass}`}>
                            <RightPanel
                                receiptData={currentReceipt}
                                currentGroup={currentGroup}
                                groupMembers={members}
                            />
                        </Paper>
                    </Grid>
                </Hidden>
            </Grid>
        </div>
    ) : (
        <Fragment>
            <Placeholder
                primaryText={'Currently no group is open.'}
                secondaryText={'Create or open one to see your receipts!'}
                image={placeholderImge}
            />
        </Fragment>
    );
}

Receipts.propTypes = {
    currentGroup: PropTypes.object,
    groupDeleted: PropTypes.func,
};

export default Receipts;
