import { makeStyles, Typography } from '@material-ui/core';
import image from './image.svg';

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

function NoGroupsPlaceholder() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={image} className={classes.image} />
            <Typography
                variant="h3"
                color="textPrimary"
                className={classes.text}
            >
                Currently no group is open.
            </Typography>
            <Typography
                variant="h5"
                color="textSecondary"
                className={classes.text}
            >
                Create or open one to see your receipts!
            </Typography>
        </div>
    );
}

export default NoGroupsPlaceholder;
