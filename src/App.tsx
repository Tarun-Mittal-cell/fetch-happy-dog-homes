import React from 'react';
import { UserContextProvider } from './contexts/UserContext';
import LoginPage from './components/LoginPage';

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
