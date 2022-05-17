import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import CustomButton from "../../Ui/Actions/CustomButton";

import styles from "./EditForm.module.scss";

const EditForm = ({text,onEditComment,editHandler}) => {
  const [inputText, setInputText] = useState(text);
  const [isValid, setIsValid] = useState(true);
  const { nick, userId } = useSelector((state) => state.auth);

  

  const textInputHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setInputText(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (inputText.trim().length === 0) {
      setIsValid(false);
      return;
    }

    if (isValid) {
        onEditComment({ nick: nick, userId: userId, text: inputText });
    }

  };

  return (
    <motion.form
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={styles.form}
      onSubmit={submitFormHandler}
    >
      <div className={styles.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="4"
          value={inputText}
          onChange={textInputHandler}
        ></textarea>
        {!isValid && <p>Input field must not be empty !</p>}
      </div>

      <div className={styles.actions}>
        <CustomButton type="button" color="primary" onClick={editHandler}>
          Cancle
        </CustomButton>
        <CustomButton type="submit" color="accent">
          Save
        </CustomButton>
      </div>
    </motion.form>
  );
};

export default EditForm;
