import { useState, Fragment } from "react";

import useHttp from "../../Hooks/useHttp";
import { changeAccountData } from "../../Lib/Api";

import LoadingSpinner from "../Ui/LoadingSpinner";
import ErrorMessage from "../Ui/ErrorMessage";
import SuccesMessage from "../Ui/SuccesMessage";
import CutomButton from "../Ui/Actions/CustomButton";

import styles from "./PasswordForm.module.scss";

const PasswordForm = ({ idToken }) => {
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const { sendRequest, status, data, error } = useHttp(changeAccountData);

  const newPasswordHandler = (event) => {
    setNewPasswordInput(event.target.value);
  };

  const passwordFormHandler = (event) => {
    event.preventDefault();

    //Place for validation.
    //There is no real validation, because we allow users entry invalid data to create error messages.

    sendRequest({
      idToken: idToken,
      passwordData: newPasswordInput,
      emailMode: false,
    });
    setNewPasswordInput("");
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
      <form className={styles.form} onSubmit={passwordFormHandler}>
        <h3 className={styles.h3}>Change Password</h3>
        <div className={styles.inputs}>
          <label htmlFor="new-password">Enter new password</label>
          <input
            type="password"
            id="new-password"
            value={newPasswordInput}
            onChange={newPasswordHandler}
          />
        </div>

        <CutomButton color="primary" type="submit">
          Change Password
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

export default PasswordForm;
