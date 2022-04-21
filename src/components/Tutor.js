import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTutor } from "../TutorContextProvider";

import "../css/Tutor_Course.css";
import Card from "./Card";

const Tutor = () => {
  const data = useTutor();
  const params = useParams();
  const navigate = useNavigate();

  const tutor = data.instructors.find((tutor) => tutor._id === params.id);

  useEffect(() => {
    if (tutor === undefined) {
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (tutor === undefined) {
    return "";
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="tutor__tutor__image__container">
            <img
              src={`../../static/${tutor.img}`}
              className="tutor__tutor__image"
              alt={tutor.name}
            />
            <p className="tutor__tutor__email">{tutor.email}</p>
            <p className="tutor__tutor__stars">
              {Array.from({ length: tutor.rating }, (_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <p className="tutor__tutor__name">{tutor.name}</p>
          <p className="tutor__tutor__about">{tutor.about}</p>
          <p className="tutor__tutor__desc">{tutor.desc}</p>
        </div>
      </div>
      <div className="row course__heading">
        <p>Courses</p>
      </div>
      <div className="row home__row">
        {/* false :is tutor */}
        {Card(tutor.courses, false)}
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
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
