import { useState, useEffect } from 'react';

import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, Group } from '@material-ui/icons';

import PropTypes from 'prop-types';

import { auth } from '../../firebase';
import {
    subscribeToEvent,
    unsubscribeFromEvents,
    findGroupById,
} from '../../database';
import GroupItem from './GroupItem';

function groups({ setGroup }) {
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
        subscribeToEvent('child_added', `/users/${currentUser.uid}/groups`, [
            handleGroupCreated,
        ]);
        subscribeToEvent('child_removed', `/users/${currentUser.uid}/groups`, [
            handleGroupDeleted,
        ]);
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
                            <GroupItem
                                key={g.key}
                                group={g}
                                setGroup={setGroup}
                            />
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
