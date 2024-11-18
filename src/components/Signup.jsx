import React from "react";

const Signup = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role_id"
          >
            <option value="1">Student</option>
            <option value="2">Instructor</option>
            <option value="3">Admin</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
