import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import useHttp from "../../../Hooks/useHttp";
import { addComment } from "../../../Lib/Api";

import LoadingSpinner from "../../Ui/LoadingSpinner";
import CustomButton from "../../Ui/Actions/CustomButton";

import styles from "./NewCommentForm.module.scss";

const NewCommentForm = ({ quoteId, onAddComment }) => {
  const [inputText, setInputText] = useState("");
  const [isValid, setIsValid] = useState(true);

  const { nick, userId } = useSelector((state) => state.auth);
  const { sendRequest, status, error } = useHttp(addComment);

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

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
      sendRequest({
        commentData: { nick: nick, userId: userId, text: inputText },
        quoteId: quoteId,
      });
    }
    setInputText("");
  };

  return (
    <motion.form
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={styles.form}
      onSubmit={submitFormHandler}
    >
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={styles.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          value={inputText}
          onChange={textInputHandler}
        ></textarea>
        {!isValid && <p>Input field must not be empty !</p>}
      </div>
      <div>
        <CustomButton type="submit" color="secondary">
          Add
        </CustomButton>
      </div>
    </motion.form>
  );
};

export default NewCommentForm;
