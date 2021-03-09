
import { auth, uiConfig } from '../../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function LoginPage() {
    return (
        <div>
            <h1>My App</h1>
            <p>Please sign in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    );
}
export default LoginPage;