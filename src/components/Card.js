import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Card.css";

//second undefined
const renderCourseNames = (courses) => {
  let courseName = courses[0].name;
  //more than 2 do something.
  for (let i = 1; i < courses.length; i++) {
    courseName += `, ${courses[i].name}`;
  }
  return courseName;
};

const Card = (data, isTutorData, isEditable) => {
  const [courseData, setCourseData] = useState(null);

  const courseEditHandler = (course) => () => {
    setCourseData(course);
  };

  return data.map((dataPoint) => {
    return (
      <div className="col-lg-4" key={dataPoint._id}>
        <div
          className={`card__content ${
            isTutorData ? "card__content__hover" : "card__content__nohover"
          }`}
        >
          <div className="row justify-content-end">
            {isEditable ? (
              <div className="card__editable">
                <a
                  data-toggle="modal"
                  data-target="#exampleModal"
                  className="text-right link-dark"
                  onClick={courseEditHandler(dataPoint)}
                >
                  <i class="bi bi-pencil-square"></i>
                </a>
              </div>
            ) : null}
          </div>
          <div className="row justify-content-center">
            <img
              src={`../../static/${dataPoint.img}`}
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
                <p>{dataPoint.courses.length?renderCourseNames(dataPoint.courses):""}</p>
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
                <Link to={`/course/${dataPoint._id}`}>
                  <p
                    className={`btn btn-secondary ${
                      isTutorData ? "" : "card__button"
                    }`}
                  >
                    View details &raquo;
                  </p>
                </Link>
              </>
            )}
          </div>
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
              <div class="modal-body">
                <div className="form-group">
                  <label htmlFor="course_name">Course Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="course_name"
                    id="course_name"
                    placeholder="XYZ"
                    value={courseData?.name}
                    onChange={(e) =>
                      setCourseData({ ...courseData, name: e.target.value })
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
                    value={courseData?.desc}
                    onChange={(e) =>
                      setCourseData({ ...courseData, desc: e.target.value })
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
                    value={courseData?.image}
                    // what to do?
                  />
                </div>

                <br />
              </div>
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
  });
};

export default Card;
