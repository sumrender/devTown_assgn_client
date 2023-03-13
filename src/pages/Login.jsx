import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogin } from "../hooks/useLogin";
import { AiOutlineLogin } from "react-icons/ai";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (user) {
    console.log("login: user already logged in");
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    navigate("/");
  };

  return (
    <div className="auth">
      <form className="login auth-container" onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email address"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />

        <button className="auth-button" disabled={isLoading}>
          <AiOutlineLogin />
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="other">
        <p>
          New User? &nbsp;
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
