import React, { useState } from "react";
import { requestApi } from "../utils/request"; // Assuming you have a utility for API calls
import { requestMethods } from "../utils/enums/requestMethods";

import "../styles/adminDashboard.css";

const AdminDashboard = ({ students, instructors, courses }) => {
  const [courseName, setCourseName] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  const handleCreateCourse = async () => {
    if (!courseName || !selectedInstructor) {
      alert("Please provide a course name and select an instructor.");
      return;
    }

    try {
      const response = await requestApi({
        method: requestMethods.POST,
        route: "admin/create_course.php",
        body: {
          title: courseName,
          instructor_id: selectedInstructor,
        },
      });

      alert(response.message || "Course created successfully!");
      setCourseName("");
      setSelectedInstructor("");
    } catch (error) {
      console.error(error);
      alert("Failed to create course.");
    }
  };

  return (
    <div className="admin flex gap">
      <div className="flex column gap">
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
          Create Course
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
