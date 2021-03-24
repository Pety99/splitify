import { makeStyles, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 'min(20%, 150px )',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: 500,
        width: '70%',
    },
    text: {
        margin: theme.spacing(1),
    },
}));

function Placeholder(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={props.image} className={classes.image} />
            <Typography
                variant="h3"
                color="textPrimary"
                className={classes.text}
            >
                {props.primaryText}
            </Typography>
            <Typography
                variant="h5"
                color="textSecondary"
                className={classes.text}
            >
                {props.secondaryText}
            </Typography>
        </div>
    );
}

Placeholder.propTypes = {
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    image: PropTypes.any,
};

export default Placeholder;
