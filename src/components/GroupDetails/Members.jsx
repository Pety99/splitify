import { Box, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { getUserById } from '../../database';
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
        alignContent: 'center',
        marginLeft: theme.spacing(1),
    },
    large: {
        alignSelf: 'center',
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

function Members({ currentGroup }) {
    const classes = useStyles();

    const [members, setMembers] = useState([]);

    useEffect(async () => {
        for (const id of Object.keys(currentGroup.value.members)) {
            const snap = await getUserById(id);
            setMembers((previousMembers) => [...previousMembers, snap.val()]);
        }
    }, []);

    return (
        <Box display="flex" flexWrap={'wrap'}>
            <Typography variant="h5" component="p" className={classes.title}>
                Members
            </Typography>
            <Avatars
                members={members}
                containerClass={classes.container}
                largeClass={classes.large}
            />
        </Box>
    );
}

Members.propTypes = {
    currentGroup: PropTypes.object,
};

export default Members;
