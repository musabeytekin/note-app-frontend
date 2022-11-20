import { useState } from "react";
import { useSignUp } from '../hooks/useSignUp';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signUp, loaading, error} = useSignUp()

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);

    await signUp(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email: </label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password: </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled= {loaading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
