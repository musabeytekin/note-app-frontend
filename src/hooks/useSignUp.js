import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    let json = await res.json();
    json = json.data

    console.log("useSignUp fetch response: ", json);

    if (!res.ok) {
      setLoading(false);
      setError(json.message);
    }

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };

  return { signUp, loading, error };
};
