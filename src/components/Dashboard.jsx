import React from "react";
import profileLogo from "../assets/icons/person.png";
import logoutLogo from "../assets/icons/logout.png";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="navbar flex row gap">
        <h2>Welcome</h2>
        <button>
          <img src={profileLogo} alt="profile icon" />
        </button>
        <button>
          <img src={logoutLogo} alt="log out icon" />
        </button>
      </div>
      <div className="main"></div>
    </div>
  );
};

export default Dashboard;
