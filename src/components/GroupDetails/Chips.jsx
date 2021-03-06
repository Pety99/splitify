import { Chip, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start',
        },
    },
    chip: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(0.25),
    },
}));

function Chips({ data, setSelectedIndex }) {
    const classes = useStyles();
    const [chips, setChips] = useState([
        { ...data[0], active: true },
        ...data.slice(1).map((d) => ({ ...d, active: false })),
    ]);

    const handleClick = (e) => {
        setChips(
            chips.map((c, index) => {
                if (c.name === e.target.textContent) {
                    setSelectedIndex(index);
                    c.active = true;
                    return c;
                } else {
                    c.active = false;
                    return c;
                }
            })
        );
    };

    return (
        <div className={classes.root}>
            {chips.map((chip) => (
                <Chip
                    key={chip.name}
                    label={chip.name}
                    clickable
                    onClick={handleClick}
                    color={chip.active ? 'primary' : undefined}
                    className={classes.chip}
                />
            ))}
        </div>
    );
}

Chips.propTypes = {
    data: PropTypes.array,
    setSelectedIndex: PropTypes.func,
};
export default Chips;
