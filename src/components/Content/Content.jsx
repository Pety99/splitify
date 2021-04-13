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
            flexWrap: 'nowrap',
            alignItems: 'stretch',
            flexGrow: '0',
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
        test: {
            width: 'calc(100vw - 24px)',
            [theme.breakpoints.up('md')]: {
                width: 'unset',
            },
        },
        glass: glass,
    };
});

function Receipts({ currentGroup, groupDeleted }) {
    const classes = useStyles();

    const [currentReceipt, setCurrentReceipt] = useState({});
    const [rightShowOnLeft, setRightShownOnLeft] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedChipIndex, setSelectedChipIndex] = useState(0);

    // custom hook to get the window size
    const { width } = useWindowDimensions();

    // swithes to mobile view if the screen is smaller than 960 px wide
    const toggleLeftSide = (receiptData) => {
        if (width < 960) {
            setRightShownOnLeft(!rightShowOnLeft);
        }
        setCurrentReceipt(receiptData);
    };

    // This is called when the total on the reciept is changed because of an item deletion,
    // or price change of an item
    const handleTotalChanged = (snap) => {
        if (typeof snap.val() === 'number') {
            setCurrentReceipt((prev) => ({
                key: prev.key,
                value: {
                    ...prev.value,
                    total: snap.val(),
                },
            }));
        }
    };

    // This is called when an item was deleted from a reciept
    const handleItemDeleted = (snap) => {
        if (typeof snap.val() === 'object') {
            setCurrentReceipt((prev) => ({
                key: prev.key,
                value: {
                    ...prev.value,
                    items: snap.val(),
                },
            }));
        }
    };

    // This is called when all items are deleted from a receipt,
    // and no other items remain in the list
    const handleItemsListDeleted = () => {
        setCurrentReceipt((prev) => ({
            key: prev.key,
            value: {
                ...prev.value,
                items: null,
            },
        }));
    };

    // Handles the toggle mechanism
    const handleChipSelected = (index) => {
        if (selectedChipIndex != index) {
            if (!rightShowOnLeft || index == 0) {
                toggleLeftSide(currentReceipt);
            }
            setSelectedChipIndex(index);
        }
    };

    // This will run for all item deletions except for the last, since it not only changes the list but it deletes it
    useEffect(() => {
        subscribeToEvent(
            'child_changed',
            `/receipts/${currentGroup.key}/${currentReceipt.key}`,
            [handleTotalChanged, handleItemDeleted]
        );
        return () => {
            unsubscribeFromEvents(
                'child_changed',
                `/receipts/${currentGroup.key}/${currentReceipt.key}`
            );
        };
    });

    // This will run when the last item is deleted from the receipt
    useEffect(() => {
        subscribeToEvent(
            'child_removed',
            `/receipts/${currentGroup.key}/${currentReceipt.key}`,
            [handleItemsListDeleted]
        );
        return () => {
            unsubscribeFromEvents(
                'child_removed',
                `/receipts/${currentGroup.key}/${currentReceipt.key}`
            );
        };
    });

    // When the user clicks on a different group the previously viewed reciept from the other group is hidden.
    useEffect(() => {
        // The condition is needed, unless the useEffects get in an endless loop
        if (currentGroup.key != null) setCurrentReceipt({});
    }, currentGroup.key);

    const leftSide = rightShowOnLeft ? (
        <RightPanelForMobile
            backButtonClickHandler={toggleLeftSide}
            receiptData={currentReceipt}
            currentGroup={currentGroup}
            members={members}
            selectedChipIndex={selectedChipIndex}
            lg={8}
        />
    ) : (
        <LeftPanel
            toggleLeftSide={toggleLeftSide}
            groupId={currentGroup.key}
            setCurrentReceipt={setCurrentReceipt}
        />
    );

    return currentGroup ? (
        <div className={classes.root}>
            <Chips
                data={[{ name: 'Items' }, { name: 'Analytics' }]}
                setSelectedIndex={handleChipSelected}
            />
            <Members
                currentGroup={currentGroup}
                groupDeleted={groupDeleted}
                members={members}
                setMembers={setMembers}
            ></Members>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12} md={6} lg={4} className={classes.test}>
                    <Fragment>{leftSide}</Fragment>
                </Grid>
                <Hidden smDown>
                    <Grid item md={6} lg={8}>
                        <Paper className={`${classes.paper} ${classes.glass}`}>
                            <RightPanel
                                receiptData={currentReceipt}
                                currentGroup={currentGroup}
                                groupMembers={members}
                                isAnalytics={selectedChipIndex == 1}
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
