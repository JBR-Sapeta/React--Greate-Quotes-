import { useState } from "react";
import { motion } from "framer-motion";

import CustomButton from "../../Ui/Actions/CustomButton";

import styles from "./EditQuote.module.scss";

const EditQuote = ({text,author,userId,nick,onEditQuote,editHandler}) => {
  let message;
  const [authorInput, setAuthorInput] = useState(author);
  const [quoteInput, setQuoteInput] = useState(text);
  const [formIsValid, setFormIsValid] = useState(true);

  

  const authorInputHandler = (event) => {
    setAuthorInput(event.target.value);
  };

  const quoteInputHandler = (event) => {
    setQuoteInput(event.target.value);
  };

  function submitFormHandler(event) {
    event.preventDefault();

    if (quoteInput.trim().length > 0 && authorInput.trim().length > 0) {
      onEditQuote({
        author: authorInput,
        nick: nick,
        text: quoteInput,
        userId: userId,
      });

      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }

  if (!formIsValid) {
    message = (
      <div>
        <p className={styles.warning}>
          Author and quote fields can not be empty.
        </p>
      </div>
    );
  }

 
  return (
    <motion.form
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={styles.form}
      onSubmit={submitFormHandler}
    >
     

      <div className={styles.control}>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          value={authorInput}
          onChange={authorInputHandler}
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="text">Quote</label>
        <textarea
          id="text"
          rows="4"
          value={quoteInput}
          onChange={quoteInputHandler}
        ></textarea>
      </div>
      {message}
      <div className={styles.actions}>
        <CustomButton type="button" color="primary" onClick={editHandler}>
          Cancle
        </CustomButton>
        <CustomButton type="submit" color="secondary">
          Save
        </CustomButton>
      </div>
    </motion.form>
  );
};

export default EditQuote;
