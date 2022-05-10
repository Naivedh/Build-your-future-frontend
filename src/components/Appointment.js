import React, { useState } from "react";
import "../css/Appointment.css";
import { httpGet } from "../utils/api";
import Loader from "./Loader";
const Appointment = () => {
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState();
  const [authConfig, setAuthConfig] = useAuthContext();

  const isEditable = authConfig?.isTutor; // true for tutor, false for student
  const url = isEditable
    ? `/tutor/${authConfig._id}`
    : `/student/${authConfig._id}`;
    
  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(`/appointmentapi${url}`);
        // console.log(data);
        setAppointment(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        // navigate("/error");
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="row m-3 p-5">
      <div className="col-lg-12">
        <div className="appointment__list-group list-group">
          <div className="appointment__main__row row">
            <div className="col-lg-3">
              <p>Name</p>
            </div>
            <div className="col-lg-3">
              <p>Course</p>
            </div>
            <div className="col-lg-3">
              <p>Time</p>
            </div>
            <div className="col-lg-3">
              <p c>Status</p>
            </div>
          </div>

          {/* Give link tag to navigate to course page? zoom? */}
          <div className="appointment__row row">
            <div className="col-lg-3">
              <span className="appointment__image">
                <img src="../../static/_1.webp" alt="img" />
                <p>Nurcan Yuruk</p>
              </span>
            </div>
            <div className="col-lg-3">
              <p>Web programming</p>
            </div>
            <div className="col-lg-3">
              <p>02/11/21 11:00 - 13:00</p>
            </div>
            <div className="appointment__col__active col-lg-3">
              <p className="appointment__active">Active</p>
            </div>
          </div>

          <div className="appointment__row row">
            <div className="col-lg-3">
              <span className="appointment__image">
                <img src="../../static/_1.webp" alt="img" />
                <p>Nurcan Yuruk</p>
              </span>
            </div>
            <div className="col-lg-3">
              <p>Web programming</p>
            </div>
            <div className="col-lg-3">
              <p>02/11/21 11:00 - 13:00</p>
            </div>
            <div className="appointment__col__active col-lg-3">
              <p className="appointment__cancel">Cancel</p>
            </div>
          </div>

          <div className="appointment__row row">
            <div className="col-lg-3">
              <span className="appointment__image">
                <img src="../../static/_1.webp" alt="img" />
                <p>Nurcan Yuruk</p>
              </span>
            </div>
            <div className="col-lg-3">
              <p>Web programming</p>
            </div>
            <div className="col-lg-3">
              <p>02/11/21 11:00 - 13:00</p>
            </div>
            <div className="appointment__col__active col-lg-3">
              <p className="appointment__inactive">In Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
