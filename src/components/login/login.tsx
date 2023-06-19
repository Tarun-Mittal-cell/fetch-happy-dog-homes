import { useLogin } from "./use-login";
import './styles.css';

export const Login = () => {
  const { email, setEmail, name, setName, onSubmit } = useLogin();

  return (
    <div className="login-container">
      <h1>Adopt A Dog at Fetch</h1>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
        />
      </label>
      <button onClick={onSubmit}>Log In</button>
    </div>
  );
};
