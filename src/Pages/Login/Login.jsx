import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem("authToken", "sample_token");

      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      <div className="container p-5">
        <h1 className="text-center">Login</h1>
        <div className="card p-3 my-3 rounded-0">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              required
              placeholder="Enter email address"
              className="form-control my-2 rounded-0 login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="number"
              required
              placeholder="Enter password"
              className="form-control my-2 rounded-0 login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-sm w-100 btn-dark rounded-0 batan login-input"
            >
              Login
            </button>
          </form>
        </div>
        <div className={styles.center}>
          <p>
            Don't have an account?
            <Link className={styles.color} to={"/register"}>
              Sign up
            </Link>
            <a href="https://aadilkhan.vercel.app/"></a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
