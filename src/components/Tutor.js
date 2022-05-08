import React, { useEffect, useState } from "react";
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
  const [authConfig, setAuthConfig] = useAuthContext();
  const [comment, setComment]= useState("");

  const [currentCourseData, setCurrentCourseData] = useState(null);

  const isEditable = authConfig?.isTutor; // true for tutor, false for student



  const addComment = async () => {
    try {
      const data={
        tutorId:tutor._id,
        text:comment,
      }
      await httpPost("/feedbackapi/feedback", data);
    } catch (err) {
      console.log(err);
      // navigate("/error");
    }
  }

  //for tutor update
  const submitEditedData = (editedCourse) => async () => {
    try {
      const formData = new window.FormData();
      formData.append('name', editedCourse.name);
      formData.append('desc', editedCourse.desc);
      formData.append('image', editedCourse.image);
      await httpPost("/tutorapi/tutorCourse", formData);
    } catch (err) {
      console.log(err);
      // navigate("/error");
    }
  };

  const resetModalData = () => {
    setCurrentCourseData(null);
  }

  const updateCurrentCourse = (courseToEdit) => setCurrentCourseData(courseToEdit);

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



  const commentCard = () => {
    return (
      <div className="card">
        <div className="card-body row">
          <div className="col-lg-12 course__comment__image">
            <img src="../../static/_1.webp" alt="img" />
            <div className="course__comment__text">
              <>
                <div className="row">
                  <div className="col-lg-10">
                    <p className="course__comment__text__name">Name</p>
                  </div>
                  <div className="col-lg-2">.... 2 days ago</div>
                </div>
              </>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };



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
        <Card 
          data={tutor.courses} 
          isTutorData={false} 
          isEditable={isEditable} 
          currentCourseData={currentCourseData}
          updateCurrentCourse={updateCurrentCourse} 
          submitEditedData={submitEditedData} 
          resetModalData={resetModalData}
          />
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


      <div className="row">
        <p className="course__heading">Comments</p>
        
        {!isEditable?(
          <div className="row px-5 py-2 mx-5">
            <label htmlFor="courseName" className="py-2 px-3">Add Comment</label>
            <div className="col-10">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Great one"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-2">
            <button
                type="button"
                className="btn btn-primary"
                onClick={addComment}
              >
                Add
              </button>
            </div>
          </div>
        ):null}

        <div className="course__comment__card">
          {commentCard()}
          {commentCard()}
        </div>
      </div>
    </div>
  );
};

export default Tutor;
