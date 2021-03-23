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
            PaperProps={{
                style: {
                    background: 'rgba( 255, 255, 255, 0.85 )',
                    WeboxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                    backdropFilter: 'blur( 4px )',
                    borderRadius: '15px',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                },
            }}
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
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
    title: PropTypes.string,
    content: PropTypes.string,
    cancel: PropTypes.string,
    ok: PropTypes.string,
    open: PropTypes.bool,
    okClickHandler: PropTypes.func,
};

export default AlertDialog;
