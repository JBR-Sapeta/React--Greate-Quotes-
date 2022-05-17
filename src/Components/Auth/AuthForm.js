import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";


import useHttp from "../../Hooks/useHttp";
import { authenticateAccount } from "../../Lib/Api";

import LoadingSpinner from "../Ui/LoadingSpinner";
import ErrorMessage from "../Ui/ErrorMessage";
import Card from "../Ui/Wrapers/Card";
import CustomButtin from "../Ui/Actions/CustomButton";

import styles from "./AuthForm.module.scss";

const AuthForm = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendRequest, status, data, error } = useHttp(authenticateAccount);

  const toggleAuthModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  const emailInputtHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const passwordInputHandelr = (event) => {
    setPasswordInput(event.target.value);
  };

  const sumbitFormHandler = (event) => {
    event.preventDefault();

    //There is no real validation, because we allow users entry invalid data to create error messages.

    sendRequest({
      emailData: emailInput,
      passwordData: passwordInput,
      loginMode: loginMode,
    });
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && data) {
    dispatch({
      type: "LOGIN",
      idToken: data.idToken,
      expiresIn: data.expiresIn,
      userId: data.userID,
    });
    if(loginMode){
      navigate("/profile");
    }else{
      navigate("/start");
    }
    
  }

  return (
    <Card>
      <section className={styles.section}>
        <h2> {loginMode ? "Login" : "Sign Up"}</h2>

        <form className={styles.form} onSubmit={sumbitFormHandler}>
          <div>
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={emailInputtHandler}
            />
          </div>

          <div>
            <label htmlFor="password">Enter Your Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={passwordInputHandelr}
            />
          </div>

          <div>
            <CustomButtin color="secondary"  type="submit">
              {loginMode ? "Login" : "Create Account"}
            </CustomButtin>
          </div>
          {error && (
            <div className="centered">
              <ErrorMessage message={error} />
            </div>
          )}
        </form>

        <CustomButtin
          color="primary"
          type="button"
          onClick={toggleAuthModeHandler}
        >
          {loginMode ? "Create new account" : "Sign in"}
        </CustomButtin>
      </section>
    </Card>
  );
};

export default AuthForm;
