import {
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { FiberManualRecord, MoreVert } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { deleteGroup } from '../../database';
import AlertDialog from '../GroupDetails/Alert';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function GroupItem({ group, setGroup }) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleMoreClick = (e) => {
        setAnchorEl(e.currentTarget);
        e.stopPropagation();
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAlertOpen(!alertOpen);
    };

    const deleteThisGroup = function () {
        deleteGroup(group.key, Object.keys(group.value.members));
        setGroup('');
    };

    return (
        <Fragment>
            <ListItem
                button
                className={classes.nested}
                onClick={() => setGroup(group)}
            >
                <ListItemIcon>
                    <FiberManualRecord />
                </ListItemIcon>
                <ListItemText primary={group.value.name} />
                <IconButton onClick={handleMoreClick}>
                    <MoreVert />
                </IconButton>
            </ListItem>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Delete Group</MenuItem>
            </Menu>

            <AlertDialog
                title={'Do you want to delete this group?'}
                content={
                    'Warning! This will remove everything, including the receipts!'
                }
                ok={'Yes'}
                cancel={'No'}
                open={alertOpen}
                okClickHandler={deleteThisGroup}
            />
        </Fragment>
    );
}

GroupItem.propTypes = {
    group: PropTypes.object,
    setGroup: PropTypes.func,
};

export default GroupItem;
