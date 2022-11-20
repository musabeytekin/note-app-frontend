import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    await login(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email: </label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password: </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
