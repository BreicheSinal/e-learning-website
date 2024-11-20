import React, { useState, useEffect } from "react";
import { requestApi } from "../utils/request";
import { requestMethods } from "../utils/enums/requestMethods";

import "../styles/courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const result = await requestApi({
        method: requestMethods.GET,
        route: "getAllCourses",
      });
      console.log(result.courses);
      setCourses(result.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const enroll = async (courseId) => {
    console.log(courseId);
    try {
      const result = await requestApi({
        body: { course_id: courseId },
        method: requestMethods.POST,
        route: "enrollCourse",
      });

      if (result.message === "Enrolled in course successfully") {
        fetchCourses();
      } else {
        alert("Failed to enroll in course");
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex column gap courses">
      <h2>Available Courses</h2>
      {courses.length > 0 ? (
        <div className="courses-list">
          {courses.map((course, index) => (
            <div className="course-card" key={course.id || index}>
              <div className="course-card-header">
                <h3>{course.title}</h3>
              </div>
              <div className="course-card-body">
                <button onClick={() => enroll(course.id)}>ENROLL</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No available courses</p>
      )}
    </div>
  );
};

export default Courses;
