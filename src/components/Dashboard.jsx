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

  const renderDashboardContent = () => {
    switch (role) {
      case "Student":
        return <StudentDashboard />;
      case "Instructor":
        return <InstructorDashboard />;
      case "Admin":
        return <AdminDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

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
      <div className="main">
        <h2>{role} Dashboard</h2>
        {renderDashboardContent()}
      </div>
    </div>
  );
};

// Student Dashboard Component
const StudentDashboard = () => {
  return (
    <div>
      <h3>Courses</h3>
      <h3>Assignments</h3>
    </div>
  );
};

// Instructor Dashboard Component
const InstructorDashboard = () => {
  return (
    <div>
      <h3>Assigned Courses</h3>
      <h3>Post Announcements</h3>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  return (
    <div>
      <h3>Manage Users</h3>
      <h3>Manage Courses</h3>
    </div>
  );
};
export default Dashboard;
