import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/base.css";
import "../styles/utilities.css";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    role_id: "1",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (
      !credentials.email ||
      !credentials.username ||
      !credentials.password ||
      !credentials.role_id
    ) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/e-learning-platform/src/php/signup.php",
        credentials
      );

      if (response.data.message === "EMAIL ALREADY EXISTS!") {
        setMessage("Email already exists!");
        return;
      } else if (response.data.message === "FAILED REGISTERED!") {
        setMessage("Failed registration!");
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const goToLogin = async () => {
    navigate("/login");
  };

  return (
    <div className="flex column gap center">
      <h2 className="text-align bold">SIGN UP</h2>
      <div className="flex column gap">
        <label className="bold">Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={onChange}
          required
        />
      </div>
      <div className="flex column gap">
        <label className="bold">Email</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="flex column gap">
        <label className="bold">Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
          required
        />
      </div>
      <div className="flex column gap">
        <label className="bold">Role</label>
        <select name="role_id" value={credentials.role_id} onChange={onChange}>
          <option value="1">Student</option>
          <option value="2">Instructor</option>
          {/*<option value="3">Admin</option>*/}
        </select>
      </div>
      <div className="flex row gap justify-center align-center">
        <p>Already a user?</p>
        <button onClick={goToLogin} className="button">
          LOGIN
        </button>
      </div>
      <button type="submit" onClick={submit} className="button align-self">
        SIGN UP
      </button>
      {message && <p className="text-align">{message}</p>}
    </div>
  );
};

export default Signup;
