import { useLogin } from "./use-login";
import './styles.css';

export const Login = () => {
  const { email, setEmail, name, setName, onSubmit } = useLogin();

  return (
    <div>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button onClick={onSubmit}>Log In</button>
    </div>
  );
};
