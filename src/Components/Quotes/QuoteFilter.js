import { useState } from "react";

import { ReactComponent as Searchlogo } from "../../Assets/Icons/search-outline.svg";
import CutomButton from "../Ui/Actions/CustomButton";

import styles from "./QuoteFilter.module.scss";

const QuoteFilter = ({onAddQuery}) => {
  const [enteredQuery, setEnteredQuery] = useState("");

  const enteredAuthorHandler = (event) => {
    setEnteredQuery(event.target.value);
  };

  const submitByEnter = (event) => {
    if (event.keyCode === 13) {
      onAddQuery(enteredQuery);
      setEnteredQuery("");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAddQuery(enteredQuery);
    setEnteredQuery("");
  };

  return (
    <div className={styles.search}>
      <Searchlogo className={styles.searchLogo} />
      <input
        type="text"
        value={enteredQuery}
        placeholder="Find a favorite author"
        onChange={enteredAuthorHandler}
        onKeyDown={(event) => submitByEnter(event)}
      ></input>
      <CutomButton
       onClick={submitHandler} color={"secondary"}>Search</CutomButton>
    </div>
  );
};

export default QuoteFilter;