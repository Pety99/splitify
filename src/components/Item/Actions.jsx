import { Button, IconButton, makeStyles } from '@material-ui/core';
import { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { Clear, Create, Delete } from '@material-ui/icons';
import AlertDialog from '../GroupDetails/Alert';

const useStyles = makeStyles(() => ({
    edit: {},
    left: {
        marginRight: 'auto',
    },
}));

function Actions(props) {
    const [alertOpen, setAlertOpen] = useState(false);
    const classes = useStyles();
    return props.editMode ? (
        <Fragment>
            <Button size="small" color="primary" onClick={props.save}>
                Save
            </Button>
            <Button
                size="small"
                onClick={props.cancel}
                className={classes.left}
            >
                Cancel
            </Button>

            <IconButton onClick={props.toggleEdit}>
                <Clear size="small" />
            </IconButton>
        </Fragment>
    ) : (
        <Fragment>
            <IconButton
                className={classes.left}
                onClick={() => setAlertOpen(!alertOpen)}
            >
                <Delete size="small" />
                <AlertDialog
                    title={'Do you want to delete this item?'}
                    content={'If you delete the item you can not undo it!'}
                    ok={'Yes'}
                    cancel={'No'}
                    open={alertOpen}
                    okClickHandler={props.delete}
                />
            </IconButton>
            <IconButton className={classes.edit} onClick={props.toggleEdit}>
                <Create size="small" />
            </IconButton>
        </Fragment>
    );
}

Actions.propTypes = {
    editMode: PropTypes.bool,
    save: PropTypes.func,
    cancel: PropTypes.func,
    toggleEdit: PropTypes.func,
    delete: PropTypes.func,
};

export default Actions;
