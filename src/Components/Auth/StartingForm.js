import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import useHttp from "../../Hooks/useHttp";
import { addUser } from "../../Lib/Api";

import CustomButton from "../Ui/Actions/CustomButton";
import LoadingSpinner from "../Ui/LoadingSpinner";
import ErrorMessage from "../Ui/ErrorMessage";

import styles from "./StartingForm.module.scss";

const StartingForm = ({ userId }) => {
  const random = Math.random().toString().slice(8);
  const userDefaultNick = "User" + random;

  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userNick, setUserNick] = useState("");
  const [userImg, setuserImg] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const { sendRequest, status, data: userData, error } = useHttp(addUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameInputtHandler = (event) => {
    setUserName(event.target.value);
  };

  const surnameInputtHandler = (event) => {
    setUserSurname(event.target.value);
  };

  const nickInputtHandler = (event) => {
    setUserNick(event.target.value);
  };
  const imgInputtHandler = (event) => {
    setuserImg(event.target.value);
  };

  const descriptionInputtHandler = (event) => {
    setUserDescription(event.target.value);
  };

  const sumbitFormHandler = (event) => {
    event.preventDefault();

    sendRequest({
      userId: userId,
      userData: {
        name: userName,
        surname: userSurname,
        nick: userNick || userDefaultNick,
        img: userImg,
        description: userDescription,
      },
    });
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (status === "completed" && userData) {
    dispatch({
      type: "NICK",
      nick: userData.nick,
    });

    navigate("/");
  }

  return (
    <section className={styles.section}>
      <div>
        <h2>Wellcome !</h2>
        <p>Please tell us something about yourself.</p>
      </div>

      <form className={styles.form} onSubmit={sumbitFormHandler}>
        <div className={styles.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={nameInputtHandler}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            value={userSurname}
            onChange={surnameInputtHandler}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="author">Nick name</label>
          <input
            type="text"
            id="author"
            value={userNick}
            onChange={nickInputtHandler}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="author">Image URL</label>
          <input type="text" id="author" onChange={imgInputtHandler} />
        </div>
        <div className={styles.control}>
          <label htmlFor="text">About me</label>
          <textarea
            id="text"
            rows="5"
            maxLength="360"
            onChange={descriptionInputtHandler}
          ></textarea>
        </div>
        <div className={styles.actions}>
          <CustomButton color="accent" type="submit" >
            Confirm{" "}
          </CustomButton>
        </div>
      </form>
    </section>
  );
};

export default StartingForm;
