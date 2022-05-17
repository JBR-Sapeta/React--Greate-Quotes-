import { useState, Fragment } from "react";

import useHttp from "../../Hooks/useHttp";
import { changeAccountData } from "../../Lib/Api";

import LoadingSpinner from "../Ui/LoadingSpinner";
import ErrorMessage from "../Ui/ErrorMessage";
import SuccesMessage from "../Ui/SuccesMessage";
import CutomButton from "../Ui/Actions/CustomButton";

import styles from "./EmailForm.module.scss";

const EmailForm = ({ idToken }) => {
  const [newEmailnput, setNewEmailnput] = useState("");
  const { sendRequest, status, data, error } = useHttp(changeAccountData);

  const newEmailHandler = (event) => {
    setNewEmailnput(event.target.value);
  };

  const emailFormHandler = (event) => {
    event.preventDefault();

    //Place for validation.
    //There is no real validation, because we allow users entry invalid data to create error messages.

    sendRequest({
      idToken: idToken,
      emailData: newEmailnput,
      emailMode: true,
    });
    setNewEmailnput("");
  };

  if (status === "pending") {
    return (
      <div className={styles.spinner}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Fragment>
      <form className={styles.form} onSubmit={emailFormHandler}>
        <h3 className={styles.h3}>Change Email</h3>
        <div className={styles.inputs}>
          <label htmlFor="new-email">Enter new email</label>
          <input
            type="email"
            id="new-email"
            value={newEmailnput}
            onChange={newEmailHandler}
          />
        </div>

        <CutomButton color="secondary" type="submit">
          Change Email
        </CutomButton>
      </form>
      {error && (
        <div className={styles.message}>
          <ErrorMessage message={error} />
        </div>
      )}

      {!error && data && (
        <div className={styles.message}>
          <SuccesMessage />
        </div>
      )}
    </Fragment>
  );
};

export default EmailForm;
