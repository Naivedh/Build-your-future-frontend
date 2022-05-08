import React, { useEffect, useState } from "react";

import "../css/Tutor_Course.css";
import "../css/Home.css";
import "../css/Card.css";
import Loader from "./Loader";
import { httpGet, httpPost } from "../utils/api";
import { Link } from "react-router-dom";

const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const [favourite, setFavourite] = useState();

  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(`/studentapi/studentFavourite`);
        // console.log(data);
        setFavourite(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleFavourite = async(courseId) => {
    setLoading(true)
    try {
      const data = await httpPost(`/studentapi/studentFavourite`,{courseId});
      setFavourite(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
 
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row home__row">
       {
          favourite.map((course)=>
          <div className="col-lg-4" key={course._id}>
            <div className="card__content card__content__nohover">
              <div className="row justify-content-end"></div>
              <div className="row justify-content-center">
                <img
                  src={course.courseImageUrl}
                  alt={course.courseName}
                  className="rounded-circle home__portrait"
                />
                <h5>{course.courseName}</h5>
                <p></p>
                <Link to={`/course/${course.courseId}`}>
                  <p className="btn btn-secondary card__button">View details »</p>
                </Link>
                
                <p className="btn btn-danger" onClick={()=>handleFavourite(course.courseId)}>Remove Course</p>
              </div>
            </div>
          </div>
          )
       }
      </div>
    </div>
  );
};

export default Favourite;
