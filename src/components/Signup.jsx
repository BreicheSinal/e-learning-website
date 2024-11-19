import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
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
    try {
      const response = await axios.post(
        "http://localhost/e-learning-platform/src/php/signup.php",
        credentials
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role_id"
            value={credentials.role_id}
            onChange={onChange}
          >
            <option value="1">Student</option>
            <option value="2">Instructor</option>
            {/*<option value="3">Admin</option>*/}
          </select>
        </div>
        <button type="submit" onClick={submit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
