import React, { useState, useEffect } from "react";
import { requestApi } from "../utils/request";
import { requestMethods } from "../utils/enums/requestMethods";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      const result = await requestApi({
        method: requestMethods.GET,
        route: "",
      });
      setCourses(result.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  return <div></div>;
};

export default Courses;
