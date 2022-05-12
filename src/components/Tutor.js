import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Tutor_Course.css";
import Card from "./Card";
import { httpGet, httpPost, httpPut } from "../utils/api";
import Loader from "./Loader";
import { useAuthContext } from "../context/AuthContextProvider";
import { BookAppointment } from "./BookAppointment";

const Tutor = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [tutor, setTutor] = useState();
  const [authConfig] = useAuthContext();
  const [comment, setComment]= useState({});
  const [comments, setComments]= useState();
  const [savingComment, setSavingComment] = useState(false);
  const [mode, setMode] = useState('EDIT');
  const [isFavourite, setIsFavourite] = useState(false);

  
  const [currentCourseData, setCurrentCourseData] = useState();
  const [showAddComment, setShowAddComment] = useState(true);

  const [error, setError] = useState(null);

  const isEditable = authConfig?.isTutor; // true for tutor, false for student

  const closeButtonRef = useRef();

  const commentDialogCloseButtonRef = useRef();

  const addComment = async () => {
    try {
      setSavingComment(true);
      const data={
        ...comment,
        tutorId:tutor._id,
      }
      const newData = await httpPost("/feedbackapi/feedback", data);
      setComments(newData);
      setShowAddComment(false);
      commentDialogCloseButtonRef.current.click();
    } catch (err) {
      console.log(err);
      setError(err);
    }
    setSavingComment(false);
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
      setError(err);
    }
  };

  const resetModalData = () => {
    setCurrentCourseData({});
  }


  //get requestor for favourite by id

  const changeFavourite = async() => {
    try {
      let data ={
        tutorId:tutor._id
      }
      data = await httpPost("/studentapi/studentFavourite", data);
      setIsFavourite(!isFavourite);
    } catch (err) {
      console.log(err);
    }
  };


  const updateCurrentCourse = (courseToEdit) => setCurrentCourseData(courseToEdit);

  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(`/tutorapi/tutor/${params.id}`);
        // console.log(data);
        setTutor(data[0]);
        const [commentData] = await httpGet(`/feedbackapi/feedbacks/${params.id}`);
        // console.log(comments);
        commentData?.responses.forEach(response => {
          if (response.studentId === authConfig._id) {
            setShowAddComment(false);
          }
        })
        setComments(commentData);

        const fav = await httpGet(`/studentapi/studentFavourite/${data[0]._id}`);
        setIsFavourite(!fav);
        setLoading(false);
      } catch (err) {
        console.log(err);
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
          <p className="tutor__tutor__about"><b>About: </b>{tutor.about}</p>
          <p className="tutor__tutor__desc"><b>Description: </b>{tutor.desc}</p>
          <p className="tutor__tutor__desc"><b>Total Hours Tutored: </b> {tutor.hoursTutored} Hours</p>
          {(
              <div>
                <button
                  type="button"
                  className="btn btn-warning m-4"
                  data-dismiss="modal"
                  onClick={changeFavourite}
                >
                  {isFavourite ? <>Unfavourite</> : <>Favourite</>}
                </button>

                <BookAppointment tutorId={tutor?._id}/>
              </div>
            )}
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
            tutorId={tutor?._id}
            setMode={setMode}
            closeButtonRef={closeButtonRef}
            currentCourseData={currentCourseData}
            updateCurrentCourse={updateCurrentCourse} 
            submitEditedData={submitEditedData} 
            resetModalData={resetModalData}
            error={error}
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

        <div className="course__comment__card">
            {comments?.responses?.length
            ?comments?.responses?.map((comment)=>commentCard(comment))
            :<p className="text-center">No comments yet</p>}
        </div>
        {!isEditable && showAddComment ?(
          <div className="d-flex py-2 justify-content-center">
              <button
                type="button"
                data-toggle="modal"
                data-target="#commentModal"
                data-backdrop={"static"} 
                data-keyboard={"false"}
                className="btn btn-primary"
              >
                Add a comment
              </button>
          </div>
        ):null}
      </div>

      <div
          className="modal fade"
          id="commentModal"
          tabIndex="-1"
          role="dialog"
          // aria-labelledby="exampleModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Give feedback
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={commentDialogCloseButtonRef}
                  onClick={(e) => setComment({})}
                />
              </div>
              <div className="modal-body">
              {error ? <div className="alert alert-danger p-2" role="alert">
               {error.response?.data?.message || error.message}
              </div> : null }
                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <input
                    className="form-control"
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Your comment"
                    value={comment?.text}
                    onChange={(e) =>
                      setComment({ ...comment, text: e.target.value })
                    }
                    required
                  />
                </div>
                <label htmlFor="rating" className="form-label">Rating</label>
                <div className="d-flex justify-content-between">
                <div className="w-60">
                <input 
                  type="range" 
                  className="form-range" 
                  min="0" 
                  max="5" 
                  step="0.5" 
                  id="rating" 
                  defaultValue={1} 
                  value={comment?.rating} 
                  onChange={(e) => setComment({ ...comment, rating: e.target.value })}
                />
                </div>
                <div className="w-20">
                <input 
                  type="number"
                  disabled
                  defaultValue={1}
                  value={comment?.rating}
                />
                </div>
                </div>
               </div>
              <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                disabled={savingComment}
                onClick={(e) => setComment({})}
              >
                Close
              </button>
              <button
                type="button"
                disabled={savingComment}
                className="btn btn-success"
                onClick={addComment}
              >
                {savingComment ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : 'Comment'}
              </button>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Tutor;
