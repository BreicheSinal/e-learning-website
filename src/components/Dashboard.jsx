import React from "react";
import profileLogo from "../assets/icons/person.png";
import logoutLogo from "../assets/icons/logout.png";

import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="navbar flex row gap align-center space-between">
        <h2>Welcome</h2>
        <div className="flex gap">
          <button>
            <img src={profileLogo} alt="profile icon" className="icon" />
          </button>
          <button>
            <img src={logoutLogo} alt="log out icon" className="icon" />
          </button>
        </div>
      </div>
      <div className="main"></div>
    </div>
  );
};

export default Dashboard;
