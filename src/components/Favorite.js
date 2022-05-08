import React, { useEffect, useState } from "react";

import "../css/Tutor_Course.css";
import "../css/Home.css";
import "../css/Card.css";
import Loader from "./Loader";
import { httpGet } from "../utils/api";

const Favourite = () => {
  const [favourite, setFavourite] = useState();
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(`/studentapi/studentFavourite`);
        console.log(data);
        setFavourite(data[0])
        setLoading(false);
      } catch (err) {
        console.log(err);
        // navigate("/error");
      }
    })();
  }, []);

  if(loading){
    return<Loader/>;
  }

  return (
    <div className="container">
      <div className="row home__row">
        <div className="col-lg-4">
          <div className="card__content card__content__nohover">
            <div className="row justify-content-end"></div>
            <div className="row justify-content-center">
              <img
                src="../../static/_1.webp"
                alt="Web Programming"
                className="rounded-circle home__portrait"
              />
              <h5>Web Programming</h5>
              <p className="card-text home__tutor__stars mb-0">
                <small className="text-muted">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </small>
              </p>
              <p></p>
              <a href="/course/asdklaskdlaksd">
                <p className="btn btn-secondary card__button">View details »</p>
              </a>
              <a href="/course/asdklaskdlaksd">
                <p className="btn btn-danger">Remove Course</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
