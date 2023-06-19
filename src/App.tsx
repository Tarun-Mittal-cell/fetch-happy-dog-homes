import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DogList from './components/DogList';
import { UserContextProvider } from './contexts/UserContext';

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <Router>
        <div>
          <h1>Dog website</h1>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dogs" element={<DogList />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
