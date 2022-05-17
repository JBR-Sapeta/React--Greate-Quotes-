import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import useHttp from "../../Hooks/useHttp";
import { editComment } from "../../Lib/Api";

import { ReactComponent as Icon } from "../../Assets/Icons/person.svg";

import Card from "../Ui/Wrapers/Card";
import LoadingSpinner from "../Ui/LoadingSpinner";
import ErrorMessage from "../Ui/ErrorMessage";
import SuccesMessage from "../Ui/SuccesMessage";
import CommentActions from "./CommentActions";


import styles from "./CommentItem.module.scss";

const CommentItem = ({ id, text, userId, nick }) => {
  const params = useParams();
  const { quoteId } = params;
  const [isEditing, setIsEditing] = useState(false);
  const { sendRequest, status, error, data } = useHttp(editComment);

  const { userId: currentUserId } = useSelector((state) => state.auth);
  const userComment = currentUserId === userId;

  const editHandler = () => {
    setIsEditing((prevState) => !prevState);
  };

  const removeComment = () => {
    sendRequest({
      editMode: false,
      quoteId: quoteId,
      commentId: id,
      commentData: {},
    });
  };

  const onEditComment = (updatedComment) => {
    sendRequest({
      editMode: true,
      quoteId: quoteId,
      commentId: id,
      commentData: updatedComment,
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
      <Card>
        <div className="centered">
          <ErrorMessage message={error} />
        </div>
      </Card>
    );
  }

  if (status === "completed" && data) {
    return (
      <li className={styles.message}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h3>Hit the refresh button to see changes !</h3>
          </div>
          <SuccesMessage />
        </motion.div>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <div className={styles.comment}>
        <p>{text}</p>
      </div>

      <div className={styles.user}>
        <p>Posted by:</p>
        <Link className={styles.link} to={`/user/${userId}`}>
          <span>
            <Icon className={styles.icon} />
            {nick}
          </span>
        </Link>
      </div>

      {userComment && (
        <CommentActions
          text={text}
          isEditing={isEditing}
          onEditComment={onEditComment}
          editHandler={editHandler}
          removeComment={removeComment}
        />
      )}
    </li>
  );
};

export default CommentItem;
