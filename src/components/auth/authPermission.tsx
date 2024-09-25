import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { paths } from '../../routes/paths';
interface AuthProps {
    isLoggedIn:boolean,
    children:ReactElement
}
const RequireAuth = ({ isLoggedIn, children }:AuthProps) => {
    if (isLoggedIn) {
        return <Navigate to={paths.app.dashBoard} replace />;
    }
    return children;
};

export default RequireAuth;