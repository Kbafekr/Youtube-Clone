import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { Link } from "react-router-dom";
import "./SignUpForm.css";
import logo from "../../icons/you2oobLogo.png";
import { login } from "../../store/session";



const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(first_name, last_name, email, password)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginFormContainer">
      <div className="outerLoginForm">
        <div className="innerSignupForm">
          <form className="LoginFormDiv" onSubmit={onSignUp} autoComplete="off">
            <div className="ErrorLoginSection">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="SignupInputs">
              <label id="labelInputSignUpName">First Name</label>
              <input
              id="signupInput"
                autoComplete="off"
                placeholder="First name"
                type="text"
                name="first_name"
                onChange={updateFirstName}
                value={first_name}
                required
              ></input>
            </div>
            <div className="SignupInputs">
              <label id="labelInputSignUpName">Last Name</label>
              <input
              id="signupInput"

                autoComplete="off"
                placeholder="Last name"

                type="text"
                name="last_name"
                onChange={updateLastName}
                value={last_name}
                required
              ></input>
            </div>
            <div className="SignupInputs">
              <label>Email</label>
              <input
                placeholder="Email"

              id="signupInput"
                autoComplete="off"
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className="SignupInputs">
              <label>Password</label>
              <input
                placeholder="Password"

              id="signupInput"
                autoComplete="off"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className="SignupInputs">
              <label>Repeat Password</label>
              <input
              id="signupInput"
              placeholder="Confirm"

                autoComplete="off"
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className="SubmitSignupFormDiv">
              <Link to="/login" className="CreateAccountRedirect" exact={true} activeClassName="active">
                Login
              </Link>
              <button className='SubmitLoginButton' type="submit">Sign Up</button>
            </div>
            <div className="DemoLoginButton">
              <button
                className="SubmitLoginButton"
                onClick={() => {dispatch(login('demo@aa.io', 'password'))}}
              >
                Demo Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
