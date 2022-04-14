import React, { useEffect } from "react";

import "../css/SignUp.css";
import { httpPost } from "../utils/api";

const SignUp = () => {

  const submitSignUpData = async () => {
    try {
      const signUpData = {
        email: "naivedh.a@utdallas.edu",
        password: "password",
        name: "Naivedh",
        about: "About to be added",
        desc: "Description added",
        imageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        workingHourStart: 12903809123,
        workingHourEnd: 2131231232,
        rating: 4.7,
        hoursTutored: 0, 
      };
      const data = await httpPost('/tutorapi/postTutorSignIn', signUpData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(event) {
    if (event.target.value === "tutor") {
      document.getElementById("studentdiv").style.display = "none";
      document.getElementById("tutordiv").style.display = "block";
    } else if (event.target.value === "student") {
      document.getElementById("studentdiv").style.display = "block";
      document.getElementById("tutordiv").style.display = "none";
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="signup__signup__image__container">
            <div className="container__child signup__form">
              <h2>Sign Up</h2>

              <form className="signup__signup__form__container" id="f1">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="james.bond@spectre.com"
                    required
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
                    required
                  />
                </div><br/>
                <select className="form-group" onChange={handleChange} required>
                  <option>Select</option>
                  <option value="tutor">Tutor</option>
                  <option value="student">Student</option>
                </select>
                <div
                  className="form-group"
                  id="tutordiv"
                  style={{ display: "none" }}
                >
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                     className="form-control"
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Please enter your description"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Photo">Picture</label>
                    <input  className="form-control" type="file" id="userphoto" name="userphoto" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="starthr">Starting Time</label>
                    <input
                     className="form-control"
                      type="text"
                      name="Starting hr"
                      id="strathr"
                      placeholder="Please enter Starting hr"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endhr">Ending Time</label>
                    <input
                     className="form-control"
                      type="text"
                      name="Ending hr"
                      id="endhr"
                      placeholder="Please enter Ending hr"
                    />
                  </div>
                </div>
                <div
                  className="form-group"
                  id="studentdiv"
                  style={{ display: "none" }}
                >
                  <div className="form-group">
                    <label htmlFor="descripton">Descripton</label>
                    <input
                     className="form-control"
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Please enter your description"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photo">Picture</label>
                    <input  className="form-control" type="file" id="userphoto" name="userphoto" />
                  </div>
                </div>
                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input
                        className="btn btn--form"
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
        </div>
        <div className="col-lg-6"></div>
      </div>
    </div>
  );
};

export default SignUp;
