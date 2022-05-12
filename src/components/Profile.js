import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import "../css/SignUp.css";
import { httpGet, httpPut } from "../utils/api";
import Loader from "./Loader";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState();
  // const [workingHourStart, setWorkingHourStart] = useState();
  // const [workingHourEnd, setWorkingHourEnd] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [authConfig] = useAuthContext();
  const isTutor = authConfig?.isTutor; // true for tutor, false for student

  const url = isTutor?"/tutorapi/tutor/":"/studentapi/student/";
  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(url+authConfig?._id);
        // console.log(data)
        setEmail(data[0].email)
        setName(data[0].name)
        setAbout(data[0].about)
        setDesc(data[0].desc)
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  //test update
  const submitUpdate = async (e) => {
    setLoading(true);
    try {
      if (error) {
        setError(null);
      }
      e.preventDefault();
      const commonKeys = {
        "email": email,
        "password": password,
        "name": name,
        "desc": desc,
        "about":about
      };

      const formData = new window.FormData();

      Object.keys(commonKeys).forEach(k => {
        formData.append(`${k}`, commonKeys[k]);
      });

      
      if (password && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
        setError({ message: 'Password must contain: minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
        return;
      }

      // let startDate = new Date();
      // let endDate = new Date();

      // const [startHour, startMinute] = workingHourStart.split(":");
      // const [endHour, endMinute] = workingHourEnd.split(":");

      // startDate.setHours(Number(startHour), Number(startMinute), 0);
      // endDate.setHours(Number(endHour), Number(endMinute), 0);

      formData.append('image', image);

      // if (isTutor) {
      //   formData.append('workingHourStart', startDate.getTime());
      //   formData.append('workingHourEnd', endDate.getTime());
      // }

      const data = await httpPut(url, formData);
      console.log(data)
      setEmail(data.email)
      setName(data.name)
      setAbout(data.about)
      setDesc(data.desc)

      console.log(data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="container signup__container">
            <div className="container__child signup__form">
              <h2>Profile</h2>

              <form className="signup__signup__form__container" id="f1">
              {error ? <div className="alert alert-danger p-2" role="alert">
               {error.response?.data?.message || error.message}
              </div> : null }
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="james.bond@spectre.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    required
                    autoComplete="on"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="about">About</label>
                  <input
                    className="form-control"
                    type="text"
                    name="about"
                    id="about"
                    placeholder="Please enter about you"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
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
                    id="userphoto"
                    name="userphoto"
                    onChange={(e) => setImage(e.target.files[0])}
                    // value={image?.fileName}
                  />
                </div>

                <br />

                {/* tutor */}
                {/* {isTutor ? (
                  <div className="form-group">
                    <div className="form-group">
                      <label htmlFor="starthr">Starting Time</label>
                      <input
                        className="form-control"
                        type="time"
                        name="Starting hr"
                        id="strathr"
                        placeholder="Please enter Starting hr"
                        value={workingHourStart}
                        onChange={(e) => setWorkingHourStart(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="endhr">Ending Time</label>
                      <input
                        className="form-control"
                        type="time"
                        name="Ending hr"
                        id="endhr"
                        placeholder="Please enter Ending hr"
                        value={workingHourEnd}
                        onChange={(e) => setWorkingHourEnd(e.target.value)}
                      />
                    </div>
                  </div>
                ) : null} */}

                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input
                        className="btn btn-light"
                        type="submit"
                        value="Update"
                        onClick={submitUpdate}
                      />
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        {!isTutor ? (
          <div className="row home__row">
            false :is tutor false:cannot edit
            <Card data={tutor.courses} isTutorData={false} isEditable={false} />
          </div>
        ) : null}
        ;
      </div> */}
    </div>
  );
};

export default Profile;
