import { Chip, makeStyles } from '@material-ui/core';
import { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(0.25),
    },
}));

function Chips(props) {
    const classes = useStyles();
    const data = props.data;
    const [chips, setChips] = useState([
        { ...data[0], active: true },
        ...data.slice(1).map((d) => ({ ...d, active: false })),
    ]);

    const handleClick = (e) => {
        setChips(
            chips.map((c) => {
                if (c.name === e.target.textContent) {
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
        <Fragment>
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
        </Fragment>
    );
}

Chips.propTypes = {
    data: PropTypes.array,
};
export default Chips;
