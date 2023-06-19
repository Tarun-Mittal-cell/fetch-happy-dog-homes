import React, { createContext, useState } from 'react';
import { login as apiLogin } from '../api/auth';

// Define the types for our context state
interface User {
    name: string;
    email: string;
}

interface UserContextState {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (name: string, email: string) => Promise<void>;
}

// Define the types for our context provider props
interface UserContextProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContextState>({
    user: null,
    setUser: () => {},
    login: async () => { throw new Error('login function must be overridden'); },
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    // User state
    const [user, setUser] = useState<User | null>(null);

    // Login function
    const login = async (name: string, email: string) => {
        // Call our pretend API
        const response = await apiLogin(name, email);

        // If the login was successful, set the user state
        if (response.status === 200) {
            setUser({ name: response.data.name, email: response.data.email });
        } else {
            // Handle failed login attempt
            console.error(`Login failed with status: ${response.status}`);
        }
    }

    // Define what the context provides
    const contextValue = {
        user,
        setUser,
        login
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
