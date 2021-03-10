import { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import { auth } from '../../firebase';

const useStyles = makeStyles({
    text:{
        textAlign: 'center',
        margin: 2,
    },
    large: {
        width: '60px',
        height: '60px',
        margin: '20px auto',
    }
});

function userInfo() {
    const classes = useStyles();
    const user = auth.currentUser;
    return (
        <Fragment>
            <CssBaseline />
            <Container fixed>
                <Avatar alt="Profile Pricture" src={user.photoURL} className={classes.large}/>
                <Typography variant="h5" component="h1" className={classes.text}>Welcome back</Typography>
                <Typography variant="subtitle1" component="h2" className={classes.text}>{user.displayName}!</Typography>
            </Container>
        </Fragment>
    )
}

export default userInfo;