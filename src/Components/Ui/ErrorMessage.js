import { ReactComponent as Icon } from "../../Assets/Icons/alert-circle-outline.svg";

import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ errorMessage }) => {
  let message = null;
  if (errorMessage === "INVALID_PASSWORD") {
    message = "Invalid password ! Please enter correct one.";
  } else if (errorMessage === "EMAIL_NOT_FOUND") {
    message = "Invalid email address ! Please enter correct one.";
  } else if (errorMessage === "INVALID_EMAIL") {
    message =
      "Entered email address is not correct ! Please enter correct one.";
  } else if (errorMessage === "EMAIL_EXISTS") {
    message =
      "Entered email address is already in use ! Please enter another one.";
  } else if (
    errorMessage === "WEAK_PASSWORD : Password should be at least 6 characters"
  ) {
    message =
      "Entered password is too short ! Password should be at least 6 characters.";
  } else if (errorMessage === "MISSING_PASSWORD") {
    message =
      "Entered empty password ! Password should be at least 6 characters.";
  } else if (errorMessage === "TOKEN_EXPIRED") {
    message = "Your token has expired.";
  } else if (errorMessage === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN") {
    message = "Credential too old. Please login again.";
  }

  return (
    <div className={styles.message}>
      <Icon className={styles.icon} />
      <h2>Oops !</h2>
      <p>Something went wrong.</p>
      {message &&(<h3>Error Message:</h3>)}
      <p className={styles.error}>{message || errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
