import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRegister } from "../hooks/useRegister";
import { BiLogIn } from "react-icons/bi";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, isLoading } = useRegister();
  const { user } = useAuthContext();

  if (user) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(name, email, password);
    navigate("/");
  };

  return (
    <div className="auth">
      <form className="signup auth-container" onSubmit={handleSubmit}>
        <h3>Register</h3>

        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="name"
        />

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder={"email"}
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />

        <button disabled={isLoading} className="auth-button">
          <BiLogIn />
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="other">
        <p>
          Already have an account? &nbsp;
          <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
