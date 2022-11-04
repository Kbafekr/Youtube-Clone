import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

import logo from "../../icons/you2oobLogo.png";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    let errors = [];

    if (!password.length) errors.push("Password is required");
    if (!email) errors.push("Email is required");

    setErrors(errors)

  }, [ password,  email])

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="loginFormContainer">
        <div className="outerLoginForm">
          <div className="innerLoginForm">
            <form
              className="LoginFormDiv"
              onSubmit={onLogin}
              autoComplete="off"
            >
              {/* <img src={logo} alt="logo" className="loginLogo" /> */}
              <div className="ErrorLoginSection">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className="SignupInputs">
                <label htmlFor="email">Email</label>
                <input
                  id="loginInput"
                  name="email"
                  type="text"
                  autoComplete="off"
                  placeholder="Email"
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className="SignupInputs">
                <label htmlFor="password">Password</label>
                <input
                  id="loginInput"
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={password}
                  onChange={updatePassword}
                />
                <div className="SubmitLoginFormDiv">
                  <Link className="CreateAccountRedirect" to="/sign-up" exact={true} activeClassName="active">
                     Create account
                  </Link>
                  <button className='SubmitLoginButton'type="submit">Login</button>
                </div>
              </div>
              <div className="DemoLoginButton">
                <button
                  className="SubmitLoginButton"
                  onClick={(e) => {
                    setEmail("demo@aa.io");
                    setPassword("password");
                  }}
                >
                  Demo Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
