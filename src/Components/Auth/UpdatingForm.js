import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import useHttp from "../../Hooks/useHttp";
import { updateUser } from "../../Lib/Api";

import CustomButton from "../Ui/Actions/CustomButton";
import LoadingSpinner from "../Ui/LoadingSpinner";
import ErrorMessage from "../Ui/ErrorMessage";

import styles from "./UpdatingForm.module.scss";

const StartingForm = ({userData,userId,closeEditMode,dataUpdatedHandler}) => {
  const { collectionId, name, surname, nick, img, description } =userData;
  
  const dispatch = useDispatch();
  const random = Math.random().toString().slice(8);
  const userDefaultNick = "User" + random;

  const [userName, setUserName] = useState(name);
  const [userSurname, setUserSurname] = useState(surname);
  const [userNick, setUserNick] = useState(nick);
  const [userImg, setuserImg] = useState(img);
  const [userDescription, setUserDescription] = useState(description);

  const { sendRequest, status, error, data } = useHttp(updateUser);

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
      collectionId: collectionId,
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

  if (status === "completed" && data) {
    closeEditMode();
    dispatch({
      type: "NICK",
      nick:userNick || userDefaultNick,
    });
    dataUpdatedHandler();
  }

  return (
    <motion.div
      initial={{ x: "-25vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.section}
    >
      <div>
        <p>Update your profile data.</p>
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
          <input
            type="text"
            id="author"
            value={userImg}
            onChange={imgInputtHandler}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="text">About me</label>
          <textarea
            id="text"
            rows="5"
            maxLength="360"
            value={userDescription}
            onChange={descriptionInputtHandler}
          ></textarea>
        </div>
        <div className={styles.actions}>
          <CustomButton color="primary" type="submit">
            Confirm{" "}
          </CustomButton>
          <CustomButton
            color="secondary"
            type="button"
            onClick={closeEditMode}
          >
            Cancel{" "}
          </CustomButton>
        </div>
      </form>
    </motion.div>
  );
};

export default StartingForm;
