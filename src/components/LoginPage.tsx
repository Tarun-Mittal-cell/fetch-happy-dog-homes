import React, { useState, useContext } from 'react';
import api from '../api';
import { UserContext } from '../contexts/UserContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const [name, setName] = useState('')
    
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, name });
            if (response.status === 200) {
                setUser(response.data.user);
                console.log('User logged in ===', response);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred while logging in', error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button type="submit">Log In</button>
        </form>
    );
};

export default LoginPage;
