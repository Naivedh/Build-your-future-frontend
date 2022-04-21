import React, { useState } from "react";
import "../css/SignIn.css";
import { httpPost } from "../utils/api";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginData = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email: "naivedh.a@utdallas.edu",
        password: "password",
      };
      // const url = isTutor ? LOGIN_API_TUTOR : LOGIN_API_STUDENT;
      // const data = await httpPost(url, loginData);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="signup__signup__image__container">
            <div className="container__child login__form">
              <h2>Login</h2>

              <form className="login__login__form__container" id="f1">
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
               

                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input
                        className="btn btn--form"
                        type="submit"
                        value="Sign In"
                        onClick={submitLoginData}
                      />
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

export default Login;
