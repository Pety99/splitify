import { Chip, Grid, Hidden, makeStyles, Paper } from '@material-ui/core';
import { Fragment, useEffect, useState } from 'react';
import LeftPanel from '../Panels/LeftPanel';
import RightPanel from '../Panels/RightPanel';
import RightPanelForMobile from '../Panels/RightPanelForMobile';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => {
    const glass = {
        background: 'rgba( 255, 255, 255, 0.25 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 4px )',
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
            height: 'calc(100vh - 120px)',
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            flex: '1 0 auto',
            margin: theme.spacing(1),
            height: '100%',
        },
        glass: glass,
    };
});

function Receipts({ currentGroup }) {
    const classes = useStyles();

    const [currentReceipt, setCurrentReceipt] = useState({});

    const [rightShowOnLeft, setRightShownOnLeft] = useState(false);
    const toggleLeftSide = (receiptData) => {
        setRightShownOnLeft(!rightShowOnLeft);
        setCurrentReceipt(receiptData);
    };

    const leftSide = rightShowOnLeft ? (
        <RightPanelForMobile
            backButtonClickHandler={toggleLeftSide}
            receiptData={currentReceipt}
        />
    ) : (
        <LeftPanel toggleLeftSide={toggleLeftSide} />
    );

    /**
     * Only re renders when the currentGroupid changes
     */
    useEffect(() => {
        console.log(currentGroup);
    }, [currentGroup]);

    return (
        <div className={classes.root}>
            <div>
                <Chip label="Items" clickable />
                <Chip label="Analytics" clickable color="primary" />
            </div>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs md={6} lg={4}>
                    <Fragment>{leftSide}</Fragment>
                </Grid>
                <Hidden smDown>
                    <Grid item xs>
                        <Paper className={`${classes.paper} ${classes.glass}`}>
                            <RightPanel receiptData={currentReceipt} />
                        </Paper>
                    </Grid>
                </Hidden>
            </Grid>
        </div>
    );
}

Receipts.propTypes = {
    currentGroup: PropTypes.object,
};

export default Receipts;
