import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com")) {
      alert("❌ Only @gmail.com emails are allowed!");
      return;
    }

    const user = { name, email, phone, password };
    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("authToken", "sample_token");

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <>
      <div className="container p-5">
        <h1 className="text-center">Register</h1>
        <div className="card p-3 my-3 rounded-0">
          <form onSubmit={handleRegister}>
            <input
              type="name"
              required
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control my-2 rounded-0 login-input"
            />

            <input
              type="email"
              required
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control my-2 rounded-0 login-input"
            />

            <input
              type="phone"
              required
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control my-2 rounded-0 login-input"
            />

            <input
              type="number"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control my-2 rounded-0 login-input"
            />
            <button
              className="btn btn-sm w-100 btn-dark rounded-0 batan login-input"
              type="submit"
            >
              Register{" "}
            </button>
          </form>
        </div>
        <p className={styles.center}>
          Already have an account?
          <Link className={styles.color} to={"/login"}>
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
