import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTutor } from "../TutorContextProvider";

import "../css/Tutor_Course.css";
import Card from "./Card";

const Favourite = () => {
  const data = useTutor();
  const params = useParams();


  const tutor = data.instructors.find((tutor) => tutor._id === params.id);

  const submitSignUpData = async () => {
  }
  // useEffect(() => {
  //   if (tutor === undefined) {
  //     navigate("/error");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (tutor === undefined) {
    return "";
  }

  return (
    <div className="container">
      
      <div className="row course__heading">
        <p>Courses</p>
      </div>
      <div className="row home__row">
        {/* false :is tutor false:cannot edit */}
        {Card(tutor.courses, false, false)}
        {false ? null : (
          <div className="home__tutor col-lg-4">
            <div className="tutor__course__add">
              <div>
                <i className="bi bi-plus" data-toggle="modal" data-target="#exampleModal"></i>
              </div>
            </div>
          </div>
        )}
      </div>
  
 
    
    </div>
  );
};

export default Favourite;
