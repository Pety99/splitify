import PropTypes from 'prop-types'
import { Container, Grid, IconButton, makeStyles, TextField } from "@material-ui/core"
import { AddCircle } from "@material-ui/icons"
import { useState } from "react";
import NoUserFound from './NoUserFound';

const useStyles = makeStyles((theme) => ({
    container:{

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
        if (textFieldContet.includes('@')) {
            handleClickAddUser(textFieldContet);
        }
        else {
            setSnackBarIsOpen(true);
        }

    }

    return (
        <Container style={{padding: '0px'}}>
            <NoUserFound close={() => { setSnackBarIsOpen(false) }} isOpen={snackBarIsopen} />
            <Grid container alignItems="flex-end">
                <Grid item xs={10} className={classes.wide}>
                    <TextField id="outlined-search" label="Email of user" type="search" variant="outlined"
                        onChange={handleTextFiledChange}
                        onKeyDown={addUser}
                        autoFocus={true}
                        InputProps={{
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        className={classes.wide}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <IconButton
                        aria-label="add user button"
                        onClick={addUser}
                        style={{
                            marginLeft: '20px'
                        }}
                    >
                        <AddCircle 
                        style={{
                            width: '30px',
                            height: '30px',
                        }}/>
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