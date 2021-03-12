import PropTypes from 'prop-types'
import { Container, Grid, IconButton, makeStyles, TextField } from "@material-ui/core"
import { AddCircle } from "@material-ui/icons"
import { useState } from "react";
import NoUserFound from './NoUserFound';

import { getUserByEmail } from '../../database'

const useStyles = makeStyles((theme) => ({
    container: {

    },
    wide: {
        width: '100%',
        marginLeft: theme.spacing(1.5),
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

function AddUser(props) {
    const classes = useStyles();
    const handleClickAddUser = props.handleClickAddUser;

    const [textFieldContet, setTextFieldContet] = useState('');
    const [snackBarIsopen, setSnackBarIsOpen] = useState(false);

    const handleTextFiledChange = (e) => {
        setTextFieldContet(e.target.value);
    }

    // Have to check the firebase if the email is valid, if not popup
    const addUser = (e) => {
        if (e && e.keyCode && e.keyCode != 13) {
            return;
        }
        // check for email regex
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(textFieldContet).toLowerCase())) {
            getUserByEmail(textFieldContet, (val) => val ? handleClickAddUser(val) : setSnackBarIsOpen(true));
        }
        else{
            setSnackBarIsOpen(true)
        }

    }

    return (
        <Container style={{ padding: '0px' }}>
            <NoUserFound close={() => { setSnackBarIsOpen(false) }} isOpen={snackBarIsopen} />
            <Grid container alignItems="flex-end" justifycontent="space-between">
                <Grid item xs={8} sm={10} className={classes.wide}>
                    <TextField id="outlined-search"
                        label="Email of user"
                        type="search"
                        variant="outlined"
                        onChange={handleTextFiledChange}
                        onKeyDown={addUser}
                        autoComplete='off'
                        InputProps={{
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        className={classes.wide}
                    />
                </Grid>
                <Grid item style={{ marginLeft: 'auto', marginRight: '14px' }}>
                    <IconButton
                        aria-label="add user button"
                        onClick={addUser}
                    >
                        <AddCircle
                            style={{
                                width: '30px',
                                height: '30px',
                            }} />
                    </IconButton>
                </Grid>
            </Grid>
        </Container>
    )
}

AddUser.propTypes = {
    handleClickAddUser: PropTypes.func.isRequired,
};

export default AddUser