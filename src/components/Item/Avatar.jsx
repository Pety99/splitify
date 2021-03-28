import { Avatar, makeStyles, Tooltip } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
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
    const [selected, setSelected] = useState(false);
    return (
        <ToggleButton
            key={`member.email`}
            value="check"
            selected={selected}
            onChange={() => {
                setSelected(!selected);
            }}
            className={classes.toggle}
        >
            <Tooltip title={props.name}>
                <Avatar
                    className={classes.avatar}
                    alt="Remy Sharp"
                    src={props.profilePricture}
                    sizes="small"
                />
            </Tooltip>
        </ToggleButton>
    );
}

Avatars.propTypes = {
    name: PropTypes.string,
    profilePricture: PropTypes.string,
};

export default Avatars;
