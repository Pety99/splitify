import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function SelectCurrency({ currency, setCurrency }) {
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const classes = useStyles();
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
                Currency
            </InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currency}
                onChange={handleChange}
                label="Currency"
            >
                <MenuItem value={'HUF'}>HUF</MenuItem>
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
        </FormControl>
    );
}

SelectCurrency.propTypes = {
    currency: PropTypes.string,
    setCurrency: PropTypes.func,
};

export default SelectCurrency;
