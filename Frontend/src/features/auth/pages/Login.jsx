import { Link } from "react-router-dom";
import "../style/formGroup.scss"
import "../../../../shared/button.scss"
import FormGroup from "../components/FormGroup";

const Login = () => {
  return (
    <main className="auth-page">
      <h2>THE MOODIFY</h2>
      <div className="form-container">
        <h1> Login </h1>
        <form>
          <FormGroup label={"email"} placeholder={"enter email"} />
          <FormGroup label={"password"} placeholder={"enter password"} />
          <button className="btn btn-primary btn-block" type="submit"> Submit </button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
