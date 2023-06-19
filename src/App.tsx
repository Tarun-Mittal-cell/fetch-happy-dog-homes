import React from 'react';
import LoginPage from './components/LoginPage';
import { UserContextProvider } from './contexts/UserContext';

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <div>
        <h1>Dog website</h1>
        <LoginPage />
      </div>
    </UserContextProvider>
  );
}

export default App;
