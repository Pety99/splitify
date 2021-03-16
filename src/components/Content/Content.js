import { Chip, Grid, Hidden, makeStyles, Paper } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import LeftPanel from "../Panels/LeftPanel";
import RightPanel from "../Panels/RightPanel";
import RightPanelForMobile from "../Panels/RightPanelForMobile";

const useStyles = makeStyles((theme) => {

    // eslint-disable-next-line no-undef
    const dropzoneHeight = `max(calc( 20% - ${theme.spacing(2)}px), 165px)`;
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
        large: {
            height: `calc(100% - ${dropzoneHeight} - 8px)`,
        },
        small: {
            height: `${dropzoneHeight}`,
            padding: 0,
            boxShadow: 'none',
            border: 'none',
            background: 'rgba( 155, 155, 155, 0.25 )',
            '& div': {
                ...glass,
                background: 'rgba( 155, 155, 155, 0.25 )',
                minHeight: 0,
                height: '100%',
                borderRadius: '15px',
                outline: 'none',
                '& p': {
                    fontSize: '18px',
                    margin: theme.spacing(2),
                },
                '& svg': {
                    margin: theme.spacing(1),
                }
            },
        },
    }
});

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
                <Paper className={`${classes.paper} ${classes.small} ${classes.glass}`}>
                        <DropzoneArea
                            className={`${classes.dropzone}`}
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => console.log('Files:', files)}
                        />
                    </Paper>
                    <Paper className={`${classes.paper} ${classes.large} ${classes.glass}`}>
                        {leftSide}
                    </Paper>
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
    )
}

export default Receipts;