import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../utils/request";
import { requestMethods } from "../utils/enums/requestMethods";

import Admin from "../components/AdminDashboard";
import Instructor from "../components/InstructorDashboard";

import profileLogo from "../assets/icons/person.png";
import logoutLogo from "../assets/icons/logout.png";

import "../styles/dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);

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

          if (result.user.role === "Admin") {
            setStudents(result.user.students || []);
            setInstructors(result.user.instructors || []);
            setCourses(result.user.courses || []);
          }
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
        return <StudentDashboard enrolledCourses={user.enrolled_courses} />;
      case "Instructor":
        return <Instructor />;
      case "Admin":
        return (
          <Admin
            students={students}
            instructors={instructors}
            courses={courses}
          />
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="dashboard">
      <div className="navbar flex row gap align-center space-between">
        <h2>Welcome {user ? user.username : "Loading..."}</h2>
        <div className="flex gap">
          <button>
            <img src={profileLogo} alt="profile icon" className="icon" />
          </button>
          <button>
            <img src={logoutLogo} alt="log out icon" className="icon" />
          </button>
        </div>
      </div>
      <div className="main flex column gap">{renderDashboardContent()}</div>
    </div>
  );
};

const StudentDashboard = ({ enrolledCourses }) => {
  const navigate = useNavigate();

  const goToAllCourses = () => {
    navigate("/courses");
  };

  return (
    <div className="student flex column gap">
      <div className="flex row space-between align-center">
        <h2>Dashboard</h2>
        <button className="align-start button" onClick={goToAllCourses}>
          View All Courses
        </button>
      </div>
      <h1 className="bold">Enrolled Courses</h1>
      <ul className="enrolled-courses-list">
        {enrolledCourses && enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <li key={course.id} className="course-item">
              <h4>{course.title}</h4>
            </li>
          ))
        ) : (
          <li className="no-courses">No enrolled courses found</li>
        )}
      </ul>
      <h1 className="bold">Assignments</h1>
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

export default Dashboard;
