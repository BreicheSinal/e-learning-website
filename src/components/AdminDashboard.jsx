import React, { useState } from "react";
import axios from "axios";

import "../styles/adminDashboard.css";

const AdminDashboard = ({ students, instructors, courses }) => {
  const [courseName, setCourseName] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const BanUser = async () => {
    if (!selectedUser) {
      alert("Please select a user to ban.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/e-learning-platform/src/php/banUser.php",
        {
          user_id: selectedUser,
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error banning user:", error);
      alert("Failed to ban user.");
    }
  };

  const handleCreateCourse = async () => {
    if (!courseName || !selectedInstructor) {
      alert("Please provide a course name and select an instructor.");
      return;
    }

    const data = {
      title: courseName,
      instructor_id: selectedInstructor,
    };

    console.log("Data to be sent:", data);

    try {
      const response = await axios.post(
        "http://localhost/e-learning-platform/src/php/createCourse.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      alert(response.data.message || "Course created successfully");

      setCourseName("");
      setSelectedInstructor("");
    } catch (error) {
      console.error("Error creating course:", error.message);
      alert("Failed to create course.");
    }
  };

  return (
    <div className="admin flex column space-between">
      <div className="flex space-between gap">
        <div>
          <h2>Students</h2>
          <ul>
            {students.length > 0 ? (
              students.map((student) => (
                <li key={student.id}>
                  {student.username} - {student.email}
                </li>
              ))
            ) : (
              <p>No students found</p>
            )}
          </ul>
        </div>

        <div>
          <h2>Instructors:</h2>
          <ul>
            {instructors.length > 0 ? (
              instructors.map((instructor) => (
                <li key={instructor.id}>
                  {instructor.username} - {instructor.email}
                </li>
              ))
            ) : (
              <p>No instructors found</p>
            )}
          </ul>
        </div>

        <div>
          <h2>Courses:</h2>
          <ul>
            {courses.length > 0 ? (
              courses.map((course) => (
                <li key={course.id}>
                  {course.title} - Instructor: {course.instructor}
                </li>
              ))
            ) : (
              <p>No courses found</p>
            )}
          </ul>
        </div>
      </div>

      <div className="course-form">
        <h3>Create a New Course</h3>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructorSelect">Select Instructor:</label>
          <select
            id="instructorSelect"
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
          >
            <option value="">Select an instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.username} ({instructor.email})
              </option>
            ))}
          </select>
        </div>

        <button className="button" onClick={handleCreateCourse}>
          Create
        </button>
      </div>

      <div className="form-group">
        <h3>Ban a User</h3>
        <div className="form-group flex column gap">
          <label htmlFor="userSelect">Select User to Ban:</label>
          <select
            id="userSelect"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a user</option>
            {students.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
            {instructors.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <button className="button" onClick={BanUser}>
          Ban
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
