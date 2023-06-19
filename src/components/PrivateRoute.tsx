import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouteProps {
    path: string;
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
    const { user } = useContext(UserContext);

    return user ? <Route path={path} element={element} /> : <Navigate to="/" />;
}

export default PrivateRoute;
