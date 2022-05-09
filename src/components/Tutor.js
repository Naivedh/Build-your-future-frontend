import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Tutor_Course.css";
import Card from "./Card";
import { httpGet, httpPost, httpPut } from "../utils/api";
import Loader from "./Loader";
import { useAuthContext } from "../context/AuthContextProvider";

const Tutor = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tutor, setTutor] = useState();
  const [authConfig, setAuthConfig] = useAuthContext();
  const [comment, setComment]= useState("");
  const [comments, setComments]= useState();

  const [mode, setMode] = useState('EDIT');

  const [currentCourseData, setCurrentCourseData] = useState();

  const isEditable = authConfig?.isTutor; // true for tutor, false for student

  const closeButtonRef = useRef();

  const addComment = async () => {
    try {
      const data={
        tutorId:tutor._id,
        text:comment,
      }
      let newData = await httpPost("/feedbackapi/feedback", data);
      setComments(newData)
    } catch (err) {
      console.log(err);
      // navigate("/error");
    }
  }

  //for tutor update
  const submitEditedData = (editedCourse) => async () => {
    try {
      const formData = new window.FormData();
      formData.append('imageUrl', editedCourse.imageUrl);
      formData.append('name', editedCourse.name);
      formData.append('desc', editedCourse.desc);
      if (editedCourse._id) {
        formData.append('_id', editedCourse._id);
      }

      if (editedCourse.image) {
        formData.append('image', editedCourse.image);
      }

      const URL = "/tutorapi/tutorCourse";
      if (mode === 'CREATE') {
        const data = await httpPost(URL, formData);
        setTutor({...data});
      } else {
        const data = await httpPut(URL, formData);
        setTutor({...data});
      }
      setCurrentCourseData({})
      closeButtonRef.current.click();
    } catch (err) {
      console.log(err);
      // navigate("/error");
    }
  };

  const resetModalData = () => {
    setCurrentCourseData({});
  }

  const updateCurrentCourse = (courseToEdit) => setCurrentCourseData(courseToEdit);

  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(`/tutorapi/tutor/${params.id}`);
        console.log(data);
        setTutor(data[0]);
        const comments = await httpGet(`/feedbackapi/feedbacks/${params.id}`);
        // console.log(comments);
        setComments(comments[0]);
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



  const commentCard = (comment) => {
    return (
      <div className="card" key={comment.studentId}>
        <div className="card-body row">
          <div className="col-lg-12 course__comment__image">
            <img src={comment.imageUrl} alt={comment.studentName} />
            <div className="course__comment__text">
              <>
                <div className="row">
                  <div className="col-lg-12">
                    <p className="course__comment__text__name">{comment.studentName}</p>
                  </div>
                  {/* <div className="col-lg-2">.... 2 days ago</div> */}
                </div>
              </>
              <p>
                {comment.text}
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
            mode={mode}
            setMode={setMode}
            closeButtonRef={closeButtonRef}
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
            onClick={() => setMode('CREATE')}
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
            {comments.responses.length
            ?comments.responses.map((comment)=>commentCard(comment))
            :<p className="text-center">No comments yet</p>}
        </div>
      </div>
    </div>
  );
};

export default Tutor;
