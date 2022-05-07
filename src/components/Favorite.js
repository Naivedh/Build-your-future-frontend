import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTutor } from "../TutorContextProvider";

import "../css/Tutor_Course.css";
import "../css/Home.css";
import "../css/Card.css";

const Favourite = () => {
  const data = useTutor();
  const params = useParams();

 

  const submitSignUpData = async () => {};
  // useEffect(() => {
  //   if (tutor === undefined) {
  //     navigate("/error");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="container">
      <div className="row home__row">
        <div class="col-lg-4">
          <div class="card__content card__content__nohover">
            <div class="row justify-content-end"></div>
            <div class="row justify-content-center">
              <img
                src="../../static/_1.webp"
                alt="Web Programming"
                class="rounded-circle home__portrait"
              />
              <h5>Web Programming</h5>
              <p class="card-text home__tutor__stars mb-0">
                <small class="text-muted">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </small>
              </p>
              <p></p>
              <a href="/course/asdklaskdlaksd">
                <p class="btn btn-secondary card__button">View details »</p>
              </a>
              <a href="/course/asdklaskdlaksd">
                <p class="btn btn-danger">Remove Course</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
