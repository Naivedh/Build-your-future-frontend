import React, { useState } from "react";
import "../css/SignIn.css";
import { useNavigate } from "react-router-dom";

import { httpPost } from "../utils/api";

const LOGIN_API = "/authapi/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitLoginData = async (e) => {
    e.preventDefault();
    if (error) {
      setError(null);
    }
    // console.log("In here");
    try {
      const loginData = {
        email,
        password,
      };
      const data = await httpPost(LOGIN_API, loginData);
      
      if (data.isTutor) {
        navigate(`/tutor/${data.tutor._id}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="container signup__container">
      {/* <div className="row">
        <div className="col-lg-6"> */}
          {/* <div className="signup__signup__image__container"> */}
          <div className="container__child signup__form">
              <h2>Login</h2>

              <form className="login__login__form__container" method="post" id="f1">
              {error ? <div class="alert alert-danger" role="alert">
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

                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input
                        className="btn btn-light"
                        type="submit"
                        value="Sign In"
                        onClick={submitLoginData}
                      />
                    </li>
                   
                  </ul>
                </div>
              </form>
            </div>
          {/* </div> */}
        {/* </div> */}
     
      {/* </div> */}
    </div>
  );
};

export default Login;
