import { useState, useEffect } from 'react';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { auth } from '../../firebase';
import { createUser } from '../../database';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5a56e9',
        },
        error: {
            main: '#e33371',
        },
        secondary: {
            main: '#fab8c4',
        },
    },
});

function App() {
    const [isSignedIn, setSignedIn] = useState(false);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
            setSignedIn(!!user);

            user && createUser(user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {isSignedIn ? <MainPage /> : <LoginPage />}
        </ThemeProvider>
    );
}

export default App;
