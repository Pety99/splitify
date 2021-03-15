import { Chip, Grid, Hidden, makeStyles, Paper } from "@material-ui/core";
import { useState } from "react";
import LeftPanel from "../Panels/LeftPanel";
import RightPanel from "../Panels/RightPanel";
import RightPanelForMobile from "../Panels/RightPanelForMobile";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        height: 'calc(100vh - 100px)',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
        margin: theme.spacing(1),
        height: '100%'
    },
}));

function Receipts() {

    const classes = useStyles();

    const [currentReceipt, setCurrentReceipt] = useState({});

    const [rightShowOnLeft, setRightShownOnLeft] = useState(false);
    const toggleLeftSide = (receiptData) => {
        setRightShownOnLeft(!rightShowOnLeft);
        setCurrentReceipt(receiptData);
    }

    const leftSide = rightShowOnLeft
        ?
        <RightPanelForMobile backButtonClickHandler={toggleLeftSide} receiptData={currentReceipt} />
        :
        <LeftPanel toggleLeftSide={toggleLeftSide} />

    return (
        <div className={classes.root}>
            <div>
                <Chip label="Items" clickable />
                <Chip
                    label="Analytics"
                    clickable
                    color="primary"
                />
            </div>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs md={5} lg={4}>
                    <Paper className={classes.paper}>
                        {leftSide}
                    </Paper>
                </Grid>
                <Hidden smDown>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <RightPanel receiptData={currentReceipt} />
                        </Paper>
                    </Grid>
                </Hidden>
            </Grid>
        </div>
    )
}

export default Receipts;