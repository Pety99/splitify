import {useState, useEffect} from "react";
import MainPage from '../MainPage/MainPage';
import LoginPage from '../LoginPage/LoginPage';

import {auth, } from '../../firebase';
import {createUser} from '../../database'


function App(){
    const [isSignedIn, setSignedIn] = useState(false);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() =>{
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
            setSignedIn(!!user);
            user && createUser(user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (isSignedIn ? <MainPage/> : <LoginPage/>);
}

export default App;
