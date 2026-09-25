import React, { useState } from "react";
import FromGroup from "../components/FromGroup";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();

  const { Register, loading, error } = useAuth();

  if (loading)
    <div style={{ width: "100%", height: "100dvh" }}>
      <h1> LOADING .... </h1>
    </div>;

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <h2 className="form-header">Register</h2>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            Register(username, email, password);
            navigate("/");
          }}
        >
          <FromGroup
            onChange={setusername}
            label={"username"}
            title={"Enter Username"}
          />
          <FromGroup
            onChange={setemail}
            label={"email"}
            title={"Enter Email"}
          />
          <FromGroup
            label={"password"}
            title={"Enter Password"}
            type="password"
            onChange={setpassword}
          />
          <div className="button-wrapper">
            <button type="submit" className="form-btn register">
              REGISTER
            </button>
            <button type="reset" className="form-btn reset">
              RESET
            </button>
          </div>
          <p>
            Already Registered ? <a href="/login">Login Here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
