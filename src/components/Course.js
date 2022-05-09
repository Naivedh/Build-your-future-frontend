import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { httpGet } from "../utils/api";
import Loader from "./Loader";


const Course = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [isEnroll, setIsEnroll] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [workingHourStart, setWorkingHourStart] = useState("");
  const [workingHourEnd, setWorkingHourEnd] = useState("");
  
  const { tutorId } = useLocation().state;

  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(`/tutorapi/course/${params.id}?tutorId=${tutorId}`);
        setCourse(data);
        console.log(data)
        setLoading(false);
      } catch (err) {
        console.log(err);
        // navigate("/error");
      }
    })();
  }, []);


  useEffect(() => {
    if (course === undefined) {
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (course === undefined) {
    return "";
  }

  const changeEnroll = () => {
    setIsEnroll(true);

  };
  const changeFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  
  if (loading) {
    return <Loader/>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="tutor__tutor__image__container">
            <img
              src={course.imageUrl}
              className="tutor__tutor__image"
              alt={course.name}
            />
            <p className="tutor__tutor__stars">
              {Array.from({ length: course.rating }, (_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <p className="tutor__tutor__name">{course.name}</p>

          <p>
            {/* {course.desc} */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Adipiscing bibendum est ultricies integer quis auctor elit sed
            vulputate. Arcu risus quis varius quam. Sem et tortor consequat id
            porta nibh. Ac tortor vitae purus faucibus ornare suspendisse sed
            nisi lacus. Vestibulum lectus mauris ultrices eros in cursus turpis
            massa tincidunt. Senectus et netus et malesuada fames ac turpis
            egestas maecenas. Egestas dui id ornare arcu odio. In hac habitasse
            platea dictumst quisque sagittis. Dolor sit amet consectetur
            adipiscing elit ut aliquam. Adipiscing diam donec adipiscing
            tristique risus nec feugiat. Orci nulla pellentesque dignissim enim
            sit amet venenatis urna. Ornare lectus sit amet est placerat in
            egestas erat imperdiet. Convallis aenean et tortor at risus viverra
            adipiscing at in. Volutpat lacus laoreet non curabitur gravida arcu
            ac tortor. Ac tortor vitae purus faucibus ornare suspendisse sed.
          </p>
          <div className="text-center course__button">
            {!isEnroll ? (
              <div>
                <button
                  type="button"
                  className="btn btn-success m-4"
                  data-dismiss="modal"
                  onClick={changeEnroll}
                >
                  Enroll
                </button>
              </div>
            ) : null}
            <br />
            {isEnroll ? (
              <div>
                <button
                  type="button"
                  className="btn btn-warning m-4"
                  data-dismiss="modal"
                  onClick={changeFavourite}
                >
                  {isFavourite?(<>Unfavourite</>):(<>Favourite</>)}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary m-4"
                  data-dismiss="modal"
                  data-toggle="modal" data-target="#exampleModal"
                >
                  appointment
                </button>
              </div>
            ) : null}
          </div>

          {/* <p className="tutor__tutor__about">{tutor.about}</p>
                <p className="tutor__tutor__desc">{tutor.desc}</p> */}
        </div>
      </div>
      
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Appointment</h5>
        <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              >
        </button>
      </div>
      <div className="modal-body">
      <div className="form-group">
                      <label htmlFor="starthr">Starting Time</label>
                      <input
                        className="form-control"
                        type="number"
                        min="0" max="23"
                        name="Starting hr"
                        id="strathr"
                        placeholder="Please enter Starting hr"
                        value={workingHourStart}
                        onChange={(e)=>setWorkingHourStart(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="endhr">Ending Time</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1" max="24"
                        name="Ending hr"
                        id="endhr"
                        placeholder="Please enter Ending hr"
                        value={workingHourEnd}
                        onChange={(e)=>setWorkingHourEnd(e.target.value)}
                      />
                    </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Course;
