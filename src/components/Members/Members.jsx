import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { deleteGroup, getUserById } from '../../database';
import { Delete } from '@material-ui/icons';
import AlertDialog from './Alert';
import Avatars from './Avatars';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(1),
        alignSelf: 'center',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        marginLeft: theme.spacing(1),
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    medium: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    end: {
        marginLeft: 'auto',
        marginRight: theme.spacing(1),
    },
}));

function Members({ currentGroup, groupDeleted }) {
    const classes = useStyles();

    const [members, setMembers] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(async () => {
        for (const id of Object.keys(currentGroup.value.members)) {
            const snap = await getUserById(id);
            setMembers((previousMembers) => [...previousMembers, snap.val()]);
        }
    }, []);

    const deleteThisGroup = function () {
        deleteGroup(currentGroup.key, Object.keys(currentGroup.value.members));
        groupDeleted();
    };

    return (
        <Box display="flex">
            <Typography variant="h5" component="p" className={classes.title}>
                {currentGroup.value.name}
            </Typography>
            <Avatars
                members={members}
                containerClass={classes.container}
                largeClass={classes.large}
            />
            <IconButton
                className={`${classes.large} ${classes.end}`}
                aria-label="delete"
                onClick={() => setAlertOpen(!alertOpen)}
            >
                <Delete className={classes.medium} />
                <AlertDialog
                    content={'Are you sure you want to delete this group?'}
                    ok={'Yes'}
                    cancel={'No'}
                    open={alertOpen}
                    okClickHandler={deleteThisGroup}
                />
            </IconButton>
        </Box>
    );
}

Members.propTypes = {
    currentGroup: PropTypes.object,
    groupDeleted: PropTypes.func,
};

export default Members;
