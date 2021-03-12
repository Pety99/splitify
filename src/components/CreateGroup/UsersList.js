import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { Delete, Person } from '@material-ui/icons';
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    listItem: {
        padddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    icon: {
        marginRight: theme.spacing(1.5),
        marginLeft: theme.spacing(1.5),
    },
    user: {
        overflow: 'hidden'
    },
}));

function UsersList(props){

    const classes = useStyles();
    const {currentUser, users, handleDelete} = props;

    return(
        <List>
        {users.map((user) => (
            <ListItem key={user.key} className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar} src={user.value.profile_picture}>
                        <Person/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText className={classes.user} primary={user.value.username} />
                <ListItemSecondaryAction className={classes.icon}>
                    {user.value.email != currentUser.email &&
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user)}>
                            <Delete />
                        </IconButton>
                    }
                </ListItemSecondaryAction>
            </ListItem>
        ))}
    </List>
    )
}

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default UsersList;