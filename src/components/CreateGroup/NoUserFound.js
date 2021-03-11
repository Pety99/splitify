import PropTypes from 'prop-types'
import { Button, IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons"
import { Fragment } from "react";

function NoUserFound({ close, isOpen}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        close();
    };

    const message = "User not found! \n Please try a different email adress."

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={isOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            style={{ whiteSpace: 'pre-line' }}
            action={
                <Fragment>
                    <Button color="secondary" size="small" onClick={handleClose}>
                        Got it!
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Fragment>
            }
        />
    );
}

NoUserFound.propTypes = {
    close: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default NoUserFound;