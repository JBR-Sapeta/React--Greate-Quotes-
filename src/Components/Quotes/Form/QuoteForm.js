import { useState } from "react";

import LoadingSpinner from "../../Ui/LoadingSpinner";
import CustomButton from "../../Ui/Actions/CustomButton";
import Card from "../../Ui/Wrapers/Card";

import styles from "./QuoteForm.module.scss";

const QuoteForm = ({isLoading,onAddQuote}) => {
  let message;
  const [authorInput, setAuthorInput] = useState("");
  const [quoteInput, setQuoteInput] = useState("");
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
      setAuthorInput("");
      setQuoteInput("");
      onAddQuote({ author: authorInput, text: quoteInput });
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
    <Card fit={true}>
      <form className={styles.form} onSubmit={submitFormHandler}>
        {isLoading && <LoadingSpinner />}

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
            rows="8"
            value={quoteInput}
            onChange={quoteInputHandler}
          ></textarea>
        </div>
        {message}
        <div className={styles.actions}>
          <CustomButton type="submit" color="primary">
            Add Quote
          </CustomButton>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
