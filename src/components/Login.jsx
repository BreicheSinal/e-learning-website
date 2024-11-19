import React, { useState } from "react";
import { requestApi } from "../utils/request";
import { requestMethods } from "../utils/enums/requestMethods";
import { useNavigate } from "react-router-dom";

import "../styles/base.css";
import "../styles/utilities.css";
import "../styles/signup.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToUserDashborad = async () => {
    try {
      const result = await requestApi({
        body: {
          email,
          password,
        },
        method: requestMethods.POST,
        route: "",
      });

      localStorage.setItem("token", result.access_token);

      navigate("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="flex column gap center">
      <h2 className="text-align bold">LOG IN</h2>
      <div className="flex column gap">
        <label className="bold">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <div className="flex column gap">
        <label className="bold">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      <button
        type="submit"
        className="button align-self"
        onClick={goToUserDashborad}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Login;
