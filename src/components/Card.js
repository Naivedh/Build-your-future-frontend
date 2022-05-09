import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Card.css";
import { useAuthContext } from "../context/AuthContextProvider";

//second undefined
const renderCourseNames = (courses) => {
  let courseName = courses[0].name;
  //more than 2 do something.
  for (let i = 1; i < courses.length; i++) {
    courseName += `, ${courses[i].name}`;
  }
  return courseName;
};

const Card = ({data, isTutorData, closeButtonRef, mode, setMode, isEditable, submitEditedData, updateCurrentCourse, currentCourseData, resetModalData }) => {

  const courseEditHandler = (course) => (e) => {
    setMode('EDIT');
    if (isEditable) {
      e.preventDefault();
      updateCurrentCourse(course);
    }
  };

  return (
    <>
    {   data.map((dataPoint) => {
    return (
      <div className="col-lg-4" key={dataPoint._id}>
        <div
          className={`card__content ${
            isTutorData ? "card__content__hover" : "card__content__nohover"
          }`}
        >
          <div className="row justify-content-center">
            <img
              src={dataPoint.imageUrl}
              alt={dataPoint.name}
              className="rounded-circle home__portrait"
            />
            <h5>{dataPoint.name}</h5>
            <p className="card-text home__tutor__stars mb-0">
              <small className="text-muted">
                {Array.from({ length: dataPoint.rating }, (_, i) => (
                  <i key={i} className="bi bi-star-fill"></i>
                ))}
              </small>
            </p>
            {isTutorData ? (
              <>
                <p>
                  {dataPoint.courses.length
                    ? renderCourseNames(dataPoint.courses)
                    : ""}
                </p>

                <Link to={`/tutor/${dataPoint._id}`}>
                  <p
                    className={`btn btn-secondary ${
                      isTutorData ? "card__btn__secondary" : ""
                    }`}
                  >
                    View details &raquo;
                  </p>
                </Link>
              </>
            ) : (
              <>
                {/* do not remove p tag => for spacing */}
                <p></p>
                <Link 
                  data-toggle="modal"
                  data-target="#exampleModal"
                  data-backdrop={currentCourseData && "static"} 
                  data-keyboard={currentCourseData &&"false"}
                  to={`/course/${dataPoint._id}`} 
                  onClick={courseEditHandler(dataPoint)}
                >
                  <p
                    className={`btn btn-secondary ${
                      isTutorData ? "" : "card__button"
                    }`}
                  >
                    {isEditable ? 'Edit course' : 'View details'} &raquo;
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>

      </div>
    );
  })}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          // aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {mode === 'EDIT' ? 'Edit Course' : 'Add new course'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={resetModalData}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="course_name">Course Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="course_name"
                    id="course_name"
                    placeholder="XYZ"
                    value={currentCourseData?.name}
                    onChange={(e) =>
                      updateCurrentCourse({ ...currentCourseData, name: e.target.value })
                    }
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
                    value={currentCourseData?.desc}
                    onChange={(e) =>
                      updateCurrentCourse({ ...currentCourseData, desc: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="photo">Picture</label>
                  <input
                    className="form-control"
                    type="file"
                    id="userphoto"
                    name="userphoto"
                    // value={currentCourseData?.image}
                    onChange={(e) => updateCurrentCourse({...currentCourseData, image: e.target.files[0] }) }
                  />
                </div>

                <br />
              </div>
              <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                ref={closeButtonRef}
                onClick={resetModalData}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={submitEditedData && submitEditedData(currentCourseData)}
              >
                {mode === 'EDIT' ? 'Save changes' : 'Add new course'}
              </button>
            </div>
            </div>
          </div>
        </div>
    </>
  )
};

export default Card;
