import { useState } from "react";
import { REGISTER_ROUTE } from "../constants";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(REGISTER_ROUTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({
        type: "LOGIN",
        payload: {
          user: json,
          loading: false,
        },
      });

      // update loading state
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
