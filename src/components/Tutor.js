import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTutor } from "../TutorContextProvider";

import "../css/Tutor_Course.css";
import Card from "./Card";

const Tutor = () => {
  const data = useTutor();
  const params = useParams();
  const navigate = useNavigate();

  const [course_name, setCourse] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState();
  


  const tutor = data.instructors.find((tutor) => tutor._id === params.id);

  const submitSignUpData = async () => {
  }
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
                Add new Course
              </h5>
              <button
                type="button"
                
                class="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              >
                
              </button>
            </div>
            <div class="modal-body">
            <div className="form-group">
                  <label htmlFor="course_name">Course Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="course_name"
                    id="course_name"
                    placeholder="XYZ"
                    value={course_name}
                    onChange={(e)=>setCourse(e.target.value)}
                    required
                   
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="descripton">Descripton</label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Please enter your description"
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="photo">Picture</label>
                  <input
                    className="form-control"
                    type="file"
                    id="userphoto"
                    name="userphoto"
                    value={imageUrl}
                    // what to do?
                  />
                </div>

                <br />



            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-success" onClick={submitSignUpData}>
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
