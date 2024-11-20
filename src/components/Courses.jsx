import React, { useState, useEffect } from "react";
import { requestApi } from "../utils/request";
import { requestMethods } from "../utils/enums/requestMethods";
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

  const enroll = async (courseId) => {};

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex column gap main">
      <h2>Available Courses</h2>
      {courses.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Title</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr className="tr" key={course.id}>
                <td>{index + 1}</td>
                <td>{course.title}</td>
                <td>
                  <button onClick={() => enroll(course.id)}>ENROLL</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No available courses</p>
      )}
    </div>
  );
};

export default Courses;
