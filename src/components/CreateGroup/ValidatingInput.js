import { makeStyles, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
    textField: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(2),
    }
}));

function ValidatingInput(props) {
    const classes = useStyles();

    const { handleChange , error} = props;

    return (
        <Fragment>
            {!error ?
                <TextField
                    id="outlined-basic"
                    label="Group name"
                    variant="outlined"
                    autoFocus={true}
                    autoComplete='off'
                    className={classes.textField}
                    onChange={(e) => handleChange(e.target.value)}
                /> :
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="Group name"
                    helperText="Enter a group name"
                    variant="outlined"
                    autoFocus={true}
                    autoComplete='off'
                    className={classes.textField}
                    onChange={(e) => handleChange(e.target.value)}
                />
            }
        </Fragment>
    )
}

ValidatingInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
}

export default ValidatingInput;