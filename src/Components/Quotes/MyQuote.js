import { useState } from "react";
import { motion } from "framer-motion";

import useHttp from "../../Hooks/useHttp";
import { editQuote } from "../../Lib/Api";

import Card from "../Ui/Wrapers/Card";
import LoadingSpinner from "../Ui/LoadingSpinner";
import ErrorMessage from "../Ui/ErrorMessage";
import SuccesMessage from "../Ui/SuccesMessage";
import CutomButton from "../Ui/Actions/CustomButton";
import UserAvatar from "../Ui/UserAvatar";
import EditQuote from "./Form/EditQuote";

import styles from "./MyQuote.module.scss";

const MyQuote = ({ id, text, author, userId, nick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { sendRequest, status, error, data } = useHttp(editQuote);

  const editHandler = () => {
    setIsEditing((prevState) => !prevState);
  };

  const removeQuote = () => {
    sendRequest({
      editMode: false,
      quoteId: id,
      quoteData: {},
    });
  };

  const onEditQuote = (updatedQuote) => {
    sendRequest({
      editMode: true,
      quoteId: id,
      quoteData: { ...updatedQuote },
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
    return (
      <Card>
        <motion.div
          className={styles.message}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h3>Hit the refresh button to see changes !</h3>
          </div>
          <SuccesMessage />
        </motion.div>
      </Card>
    );
  }

  return (
    <li className={styles.item}>
      <figure>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>

      <UserAvatar nick={nick} userId={userId} />
      {!isEditing && (
        <div className={styles.actions}>
          <CutomButton color="primary" onClick={editHandler}>
            Edit
          </CutomButton>
          <CutomButton color="accent" onClick={removeQuote}>
            Delete
          </CutomButton>
        </div>
      )}
      {isEditing && (
        <EditQuote
          author={author}
          text={text}
          id={id}
          userId={userId}
          nick={nick}
          editHandler={editHandler}
          onEditQuote={onEditQuote}
        ></EditQuote>
      )}
    </li>
  );
};

export default MyQuote;
