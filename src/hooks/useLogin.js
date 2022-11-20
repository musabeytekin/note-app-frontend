import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    let json = await res.json();
    const user = json.data

    console.log("useLogin fetch response: ", user);

    if (!res.ok) {
      setLoading(false);
      setError(json.message);
    }

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      setLoading(false);
    }
  };

  return { login, loading, error };
};
