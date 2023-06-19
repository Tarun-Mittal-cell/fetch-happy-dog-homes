import React, { createContext, useState } from 'react';
import { login as apiLogin } from '../api/auth';

// Define the types for our context state
interface UserContextState {
    name: string;
    email: string;
    login: (name: string, email: string) => Promise<void>;
  }
  
  // Define the types for our context provider props
  interface UserContextProviderProps {
    children: React.ReactNode;
  }
  
  export const UserContext = createContext<UserContextState | undefined>(undefined);
  
  export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    // User state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  
// Login function
const login = async (name: string, email: string) => {
    // Call our pretend API
    const response = await apiLogin(name, email);
    
    // If the login was successful, set the user state
    if (response.status === 200) {
      setName(response.data.name);
      setEmail(response.data.email);
    } else {
      // Handle failed login attempt
      console.error(`Login failed with status: ${response.status}`);
    }
  }
  
  
    // Define what the context provides
    const contextValue = {
      name,
      email,
      login
    };
  
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  }
  