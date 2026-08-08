import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import "../style/formGroup.scss";
import "../../../../shared/button.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {
  const { RegisterUser, loading, error } = useAuth();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RegisterUser(username, email, password);
    navigate("/")
  };

  if (loading) <h1> LOADING... </h1>;

  if (error) <p>ERROR OCCURED: {error}</p>;

  return (
    <main className="auth-page">
      <h2>THE MOODIFY</h2>
      <div className="form-container">
        <h1> Register </h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label={"name"}
            placeholder={"enter name"}
            onEnter={(e) => {
              console.log(e.target.value);

              setUsername(e.target.value);
            }}
          />
          <FormGroup
            label={"email"}
            placeholder={"enter email"}
            onEnter={(e) => {
              console.log(e.target.value);

              setEmail(e.target.value);
            }}
          />
          <FormGroup
            label={"password"}
            placeholder={"enter password"}
            onEnter={(e) => {
              console.log(e.target.value);

              setPassword(e.target.value);
            }}
          />
          <button className="btn btn-primary btn-block">Register </button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
