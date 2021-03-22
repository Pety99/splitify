import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import PropTypes from 'prop-types';

function AlertDialog(props) {
    const handleClose = (e) => {
        if (e.target.textContent == props.ok) {
            console.log('delete');
            props.okClickHandler();
        }
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {props.cancel}
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    {props.ok}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

AlertDialog.propTypes = {
    content: PropTypes.string,
    cancel: PropTypes.string,
    ok: PropTypes.string,
    open: PropTypes.bool,
    okClickHandler: PropTypes.func,
};

export default AlertDialog;
