import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DogList from './components/DogList';
import { UserContextProvider, UserContext } from './contexts/UserContext';

const App: React.FC = () => {
    const { user } = React.useContext(UserContext);

    return (
        <UserContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="dogs" element={user ? <DogList /> : <Navigate to="/" />} />
                </Routes>
            </Router>
        </UserContextProvider>
    );
}

export default App;
