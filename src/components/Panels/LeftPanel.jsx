import { Fragment } from 'react';
import ReceiptsList from '../Content/ReceiptsList';

import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import Uploader from '../Content/Uploader';

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
            '& > div:first-child': {
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
                },
            },
        },
    };
});

function LeftPanel(props) {
    const classes = useStyles();
    return (
        <Fragment>
            <Paper
                className={`${classes.paper} ${classes.small} ${classes.glass}`}
            >
                <Uploader />
            </Paper>
            <Paper
                className={`${classes.paper} ${classes.large} ${classes.glass}`}
            >
                <Typography variant="h5" component="p" gutterBottom>
                    {' '}
                    Reciepts
                </Typography>
                <ReceiptsList toggleLeftPanel={props.toggleLeftSide} />
            </Paper>
        </Fragment>
    );
}

LeftPanel.propTypes = {
    toggleLeftSide: PropTypes.func,
};
export default LeftPanel;
