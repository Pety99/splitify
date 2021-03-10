import { auth } from '../../firebase';
import Drawer from '../../components/Drawer/DrawerMenu';

function MainPage() {
    return (
        <div>
            <Drawer/>
            <h1>My app</h1>
            <p>Welcom {auth.currentUser.displayName}! You are now signed in!</p>
            <a onClick={() => auth.signOut()}>Sign Out</a>
        </div>
    );
}

export default MainPage; 