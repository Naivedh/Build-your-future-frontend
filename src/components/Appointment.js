import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import "../css/Appointment.css";
import { httpGet } from "../utils/api";
import Loader from "./Loader";

const Appointment = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState();
  const [authConfig] = useAuthContext();
  const isTutor = authConfig?.isTutor; // true for tutor, false for student

  useEffect(() => {
    (async () => {
      try {
        const { appointments, serverTimestamp } = await httpGet(
          `/appointmentapi/appointments`
        );
        const preparedAppointments = [];

        appointments.forEach((appointment) => {
          appointment.timeSlot.forEach((time) => {
            const appointmentData = { ...appointment, timeSlot: null, ...time };
            if (
              appointmentData.end < serverTimestamp &&
              time.status !== "CANCELLED"
            ) {
              appointmentData.status = "INACTIVE";
            }
            preparedAppointments.push(appointmentData);
          });
        });
        // console.log({ preparedAppointments });
        setAppointments(preparedAppointments);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    })();
  }, []);

  const handleCancel = () => {};
  const handleAdd = () => {};

  if (loading) {
    return <Loader />;
  }
  if (!appointments.length) {
    return (
      <div className="container m-3 text-center">
        <h2>No appointments Yet</h2>
      </div>
    );
  }
  return (
    <div className="row m-3 p-5">
      <div className="col-lg-12">
        <div className="appointment__list-group list-group">
          <div className="appointment__main__row row">
            <div className="col-lg-4">
              <p>Name</p>
            </div>
            <div className="col-lg-4">
              <p>Time</p>
            </div>
            <div className="col-lg-4">
              <p c>Status</p>
            </div>
          </div>

          {/* Give link tag to navigate to course page? zoom? */}
          {appointments.map((appointment) => (
            <div className="appointment__row row" key={appointment._id}>
              <div className="col-lg-4">
                <span className="appointment__image">
                  <img
                    src={
                      !isTutor
                        ? appointment.tutorImageUrl
                        : appointment.studentImageUrl
                    }
                    alt={
                      !isTutor ? appointment.tutorName : appointment.studentName
                    }
                  />
                  <p>
                    {!isTutor ? appointment.tutorName : appointment.studentName}
                  </p>
                </span>
              </div>
              <div className="col-lg-4">
                <p>
                  {new Date(appointment.start).getHours().toString()}:
                  {new Date(appointment.start).getMinutes().toString()}-
                  {new Date(appointment.end).getHours().toString()}:
                  {new Date(appointment.end).getMinutes().toString()}
                </p>
              </div>
              <div
                className={
                  appointment.status === "ACTIVE"
                    ? "appointment__col__active col-lg-3"
                    : "appointment__col__active col-lg-4"
                }
              >
                <p
                  className={
                    appointment.status === "ACTIVE"
                      ? "appointment__active"
                      : appointment.status === "INACTIVE"
                      ? "appointment__inactive"
                      : "appointment__cancel"
                  }
                >
                  {appointment.status === "ACTIVE"
                    ? "ACTIVE"
                    : appointment.status === "INACTIVE"
                    ? "INACTIVE"
                    : "CANCELLED"}
                </p>
              </div>
              {appointment.status === "ACTIVE" ? (
                <div className="col-lg-1" style={{ fontSize: "22px" }}>
                  {isTutor ? (
                    <i
                      className="bi bi-calendar-plus plus"
                      onClick={handleAdd}
                    ></i>
                  ) : null}
                  <i
                    className="bi bi-calendar-x cancel"
                    onClick={handleCancel}
                  ></i>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
