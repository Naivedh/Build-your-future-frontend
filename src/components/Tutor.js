import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Tutor_Course.css";
import Card from "./Card";
import { httpGet, httpPost } from "../utils/api";
import Loader from "./Loader";
import { useAuthContext } from "../context/AuthContextProvider";

const Tutor = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tutor, setTuor] = useState();
  const [course_name, setCourse] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState();
  const [authConfig, setAuthConfig] = useAuthContext();

  const isEditable = authConfig.isTutor; // true for tutor, false for student

  //for tutor update
  const submitEditedData = async () => {
    try {
      console.log("hel;lo")
      const formData = new window.FormData();
      formData.append('name', course_name);
      formData.append('desc',desc);
      formData.append('image',image);
      const data = await httpPost("/tutorapi/tutorCourse", formData);
    } catch (err) {
      console.log(err);
      // navigate("/error");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(`/tutorapi/tutor/${params.id}`);
        // console.log(data);
        setTuor(data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        // navigate("/error");
      }
    })();
  }, []);

  if (tutor === undefined) {
    return "";
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="tutor__tutor__image__container">
            <img
              src={tutor.imageUrl}
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
        <p>{tutor?.courses?.length === 0 ? 'No courses yet' : 'Courses'}</p>
      </div>
      <div className="row home__row">
        {/* false :is tutor false:cannot edit */}
        <Card data={tutor.courses} isTutorData={false} isEditable={isEditable} />
        {isEditable ? (
          <div
            className="home__tutor col-lg-4"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <div className="tutor__course__add">
              <div>
                <i className="bi bi-plus"></i>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new Course
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
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
                  value={course_name}
                  onChange={(e) => setCourse(e.target.value)}
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
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Picture</label>
                <input
                  className="form-control"
                  type="file"
                  id="coursephoto"
                  name="coursephoto"
                  onChange={(e) => setImage(e.target.files[0])}
                  // value={image?.fileName}
                />
              </div>

              <br />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={submitEditedData}
              >
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
