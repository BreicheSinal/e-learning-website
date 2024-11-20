import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../utils/request";
import { requestMethods } from "../utils/enums/requestMethods";

import profileLogo from "../assets/icons/person.png";
import logoutLogo from "../assets/icons/logout.png";

import "../styles/dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // fetching user data after login
    const fetchUserData = async () => {
      try {
        const result = await requestApi({
          method: requestMethods.GET,
          route: "getUser",
        });

        if (result.message === "User data fetched successfully") {
          console.log(result.user);
          setUser(result.user);
          setRole(result.user.role);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

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
