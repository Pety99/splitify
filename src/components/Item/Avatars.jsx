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
    const handleSelectedChange = (key, isSelected) => {
        const newPayers = {
            ...props.payers,
        };
        newPayers[key] = isSelected;

        const payersCount = Object.values(newPayers).reduce(
            (acc, value) => (value == true ? acc + 1 : acc),
            0
        );

        if (payersCount > 0) {
            props.handlePayersChanged(newPayers);
        }
    };
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.members.map((m) => (
                <Avatar
                    name={m.username}
                    selected={props.payers && props.payers[m.key] == true}
                    profilePricture={m.profile_picture}
                    key={m.key}
                    id={m.key}
                    className={classes.avatar}
                    handleSelectedChange={handleSelectedChange}
                ></Avatar>
            ))}
        </div>
    );
}

Avatars.propTypes = {
    members: PropTypes.array,
    payers: PropTypes.object,
    handleTextChange: PropTypes.func,
    handlePayersChanged: PropTypes.func,
};

export default Avatars;
