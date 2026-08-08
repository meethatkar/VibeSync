import { Link, useNavigate } from "react-router-dom";
import "../style/formGroup.scss";
import "../../../../shared/button.scss";
import FormGroup from "../components/FormGroup";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { LoginUser, loading, error } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await LoginUser(userInfo, password);
    navigate("/")
  };

  if (loading) <h1> LOADING... </h1>;

  if (error) <p>ERROR OCCURED: {error}</p>;

  return (
    <main className="auth-page">
      <h2>THE MOODIFY</h2>
      <div className="form-container">
        <h1> Login </h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label={"text"}
            placeholder={"enter email"}
            onEnter={(e) => {
              setUserInfo(e.target.value);
            }}
          />
          <FormGroup
            label={"password"}
            placeholder={"enter password"}
            onEnter={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="btn btn-primary btn-block" type="submit">
            {" "}
            Submit{" "}
          </button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
