import React, { useEffect, useState } from "react";
import "../styles/form.style.scss";
import FromGroup from "../components/FromGroup";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInfo, setuserInfo] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const { Login, loading, error } = useAuth();

  if (loading)
    <div style={{ width: "100%", height: "100dvh" }}>
      <h1> LOADING .... </h1>
    </div>;

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <h2 className="form-header">Login</h2>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            Login(userInfo, password);
            navigate("/");
          }}
        >
          <FromGroup
            onChange={setuserInfo}
            label={"userInfo"}
            title={"Enter Email/Username"}
          />
          <FromGroup
            label={"password"}
            title={"Enter Password"}
            type="password"
            onChange={setpassword}
          />
          <div className="button-wrapper">
            <button type="submit" className="form-btn register">
              LOGIN
            </button>
            <button type="reset" className="form-btn reset">
              RESET
            </button>
          </div>
          <p>
            New User ? <a href="/register">Register Here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
