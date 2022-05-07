import React, { useState } from "react";
import "../css/SignUp.css";
import { httpPost } from "../utils/api";


const TUTOR_SIGNUP_API = "/tutorapi/tutorSignUp";
const STUDENT_SIGNUP_API = "/studenapi/studentSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState();
  const [workingHourStart, setWorkingHourStart] = useState("");
  const [workingHourEnd, setWorkingHourEnd] = useState("");
  const [isTutor, setIsTutor] = useState(false);
  const [error, setError] = useState(null);

  const submitSignUpData = async (e) => {
    try {
      e.preventDefault();
      if (error) {
        setError(null);
      }
      const commonKeys = {
        "email": email, 
        "password": password,
        "name": name, 
        "desc": desc
      };

      // if (!password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')) {
      //   setError({ message: 'Password must contain: minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
      //   return;
      // }

      const formData = new window.FormData();

      Object.keys(commonKeys).forEach(k => {
        formData.append(`${k}`, commonKeys[k]);
      });

      let startDate = new Date();
      let endDate = new Date();

      const [startHour, startMinute] = workingHourStart.split(":");
      const [endHour, endMinute] = workingHourEnd.split(":");

      startDate.setHours(Number(startHour), Number(startMinute), 0);
      endDate.setHours(Number(endHour), Number(endMinute), 0);

      if (isTutor) {
        formData.append('workingHourStart', startDate.getTime());
        formData.append('workingHourEnd', endDate.getTime());
        formData.append('image', image);
      }
      
      const data = await httpPost(isTutor ? TUTOR_SIGNUP_API : STUDENT_SIGNUP_API, formData);
      // console.log(data);
    } catch (err) {
      console.log('In here');
      console.log(err);
      setError(err);
    }
  };

  return (
    
    <div className="container signup__container">
    
            <div className="container__child signup__form">
              <h2>Sign Up</h2>

              <form className="signup__signup__form__container" id="f1">
              {error ? <div class="alert alert-danger p-2" role="alert">
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
                    onChange={(e)=>setEmail(e.target.value)}
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
                    onChange={(e)=>setPassword(e.target.value)}
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
                    onChange={(e)=>setName(e.target.value)}
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
                    onChange={(e)=>setAbout(e.target.value)}
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
                    onChange={(e)=>setDesc(e.target.value)}
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
                <select
                  className="form-group"
                  onChange={(e) => setIsTutor(e.target.value === "tutor")}
                  required
                >
                  <option>Select</option>
                  <option value="tutor">Tutor</option>
                  <option value="student">Student</option>
                </select>

                {/* tutor */}
                {isTutor ? (
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
                        onChange={(e)=>setWorkingHourStart(e.target.value)}
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
                        onChange={(e)=>setWorkingHourEnd(e.target.value)}
                      />
                    </div>
                  </div>
                ) : null}

                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input
                        className="btn btn-light"
                        type="submit"
                        value="Sign Up"
                        onClick={submitSignUpData}
                      />
                    </li>
                    <li className="new__link">
                      <a className="signup__link" href="/signin">
                        Already a member?
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
      
        
      
    </div>
  );
};

export default SignUp;
