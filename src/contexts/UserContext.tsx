import React, { createContext, useState } from 'react';

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
        // make API call and set the response to the state
        // for now, we'll just set the values directly
        setName(name);
        setEmail(email);
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
