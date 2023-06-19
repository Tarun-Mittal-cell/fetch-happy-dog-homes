import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

const LoginPage: React.FC = () => {
    // Local state for input fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Get the login function from UserContext
    const userContext = useContext(UserContext);
    
    // On form submission
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // If userContext is defined, call the login function
        userContext?.login(name, email);
    }
    
    return (
        <form onSubmit={onSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button type="submit">Log in</button>
        </form>
    );
}

export default LoginPage;
