import React, { useContext, useState } from 'react';
import { login } from '../api/auth';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await login(email, password);
            setUser(response.data); 
            navigate('/dogs'); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Log in</button>
        </form>
    );
}

export default LoginPage;
