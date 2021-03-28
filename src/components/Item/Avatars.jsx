import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    avatar: {
        margin: theme.spacing(0.3),
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    toggle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.spacing(3.8),
        height: theme.spacing(3.8),
        borderRadius: '50%',
        borderWidth: 0,
    },
}));

function Avatars(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.members.map((m) => (
                <Avatar
                    name={m.username}
                    profilePricture={m.profile_picture}
                    key={m.email}
                    className={classes.avatar}
                ></Avatar>
            ))}
        </div>
    );
}

Avatars.propTypes = {
    members: PropTypes.array,
};

export default Avatars;
