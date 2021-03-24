import { Button, IconButton, makeStyles } from '@material-ui/core';
import { Fragment } from 'react';

import PropTypes from 'prop-types';
import { Clear, Create } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    edit: {
        marginRight: 'auto',
    },
}));

function Actions(props) {
    const classes = useStyles();
    return props.editMode ? (
        <Fragment>
            <IconButton className={classes.edit} onClick={props.cancelEdit}>
                <Clear size="small" />
            </IconButton>
            <Button size="small" onClick={props.cancel}>
                Cancel
            </Button>
            <Button size="small" color="primary" onClick={props.save}>
                Save
            </Button>
        </Fragment>
    ) : (
        <IconButton className={classes.edit} onClick={props.cancelEdit}>
            <Create size="small" />
        </IconButton>
    );
}

Actions.propTypes = {
    editMode: PropTypes.bool,
    save: PropTypes.func,
    cancel: PropTypes.func,
    cancelEdit: PropTypes.func,
};

export default Actions;
