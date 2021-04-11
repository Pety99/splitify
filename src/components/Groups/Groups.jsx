import { useState, useEffect } from 'react';

import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
} from '@material-ui/core';
import {
    ExpandLess,
    ExpandMore,
    Group,
    FiberManualRecord,
} from '@material-ui/icons';

import PropTypes from 'prop-types';

import { auth } from '../../firebase';
import {
    subscribeToEvent,
    unsubscribeFromEvents,
    findGroupById,
} from '../../database';

function groups({ setGroup }) {
    const useStyle = makeStyles((theme) => ({
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }));
    const classes = useStyle();

    const [groups, setGroups] = useState([]);
    const [open, setOpen] = useState(true);
    const [currentUser] = useState(auth.currentUser);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleGroupCreated = async (newGroup) => {
        const newGroupData = await findGroupById(newGroup.key);
        if (!groups.includes(newGroupData) && newGroupData.value != true) {
            setGroups((previousGroups) => [...previousGroups, newGroupData]);
        }
    };

    const handleGroupDeleted = (deletedGroup) => {
        setGroups((previousGroups) =>
            previousGroups.filter((g) => g.key != deletedGroup.key)
        );
    };

    useEffect(() => {
        subscribeToEvent(
            'child_added',
            `/users/${currentUser.uid}/groups`,
            [handleGroupCreated]
        );
        subscribeToEvent(
            'child_removed',
            `/users/${currentUser.uid}/groups`,
            [handleGroupDeleted]
        );
        return () => {
            unsubscribeFromEvents(
                'child_added',
                `/users/${currentUser.uid}/groups`
            );
            unsubscribeFromEvents(
                'child_removed',
                `/users/${currentUser.uid}/groups`
            );
        };
    }, []);

    return (
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary="Groups" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Paper
                style={{
                    maxHeight: '50vh',
                    overflow: 'auto',
                    boxShadow: 'none',
                }}
                className="paper"
            >
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {groups.map((g) => (
                            <ListItem
                                button
                                key={g.key}
                                className={classes.nested}
                                onClick={() => setGroup(g)}
                            >
                                <ListItemIcon>
                                    <FiberManualRecord />
                                </ListItemIcon>
                                <ListItemText primary={g.value.name} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </Paper>
        </List>
    );
}

groups.propTypes = {
    setGroup: PropTypes.func,
};

export default groups;
