import { Link } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import "../style/formGroup.scss"
import "../../../../shared/button.scss"

const Register = () => {
  return <main className="auth-page">
    <h2>THE MOODIFY</h2>
    <div className="form-container">
      <h1> Register </h1>
      <form>
        <FormGroup label={"name"} placeholder={"enter name"} />
        <FormGroup label={"email"} placeholder={"enter email"} />
        <FormGroup label={"password"} placeholder={"enter password"} />
        <button className="btn btn-primary btn-block">Register </button>
      </form>
      <p className="auth-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </main>;
};

export default Register;
