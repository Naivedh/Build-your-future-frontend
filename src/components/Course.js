import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTutor } from "../TutorContextProvider";

const Course = (props) => {
  const data = useTutor();
  const params = useParams();
  const navigate = useNavigate();

  let course;
  for(let i =0; i<data.instructors.length; i++ ){
    for(let j =0; j<data.instructors[i].courses.length; j++){
        if(data.instructors[i].courses[j]._id === params.id){
            course = data.instructors[i].courses[j]
        }
    }
  }

  useEffect(() => {
    if (course === undefined) {
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (course === undefined) {
    return "";
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="tutor__tutor__image__container">
            <img
              src={`../../static/${course.img}`}
              className="tutor__tutor__image"
              alt={course.name}
            />
            <p className="tutor__tutor__stars">
              {Array.from({ length: course.rating }, (_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <p className="tutor__tutor__name">{course.name}</p>
          {/* <p className="tutor__tutor__about">{tutor.about}</p>
                <p className="tutor__tutor__desc">{tutor.desc}</p> */}
        </div>
      </div>
      <div className="row course__heading">
        <p>Comments</p>
      </div>
    </div>
  );
};

export default Course;
