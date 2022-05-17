import { useEffect, useState, useCallback, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import useHttp from "../../Hooks/useHttp";
import { getAllComments } from "../../Lib/Api";

import CustomButton from "../Ui/Actions/CustomButton";
import ErroroMessage from "../Ui/ErrorMessage";
import NewCommentForm from "./Form/NewCommentForm";
import LoadingSpinner from "../Ui/LoadingSpinner";
import CommentsList from "./CommentsList";

import styles from "./Comments.module.scss";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { nick } = useSelector((state) => state.auth);
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedComments,
    error,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    if (nick) {
      setIsAddingComment(true);
    } else {
      navigate("/start");
    }
  };

  const loadComments = () => {
    sendRequest(quoteId);
  };

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    comments = (
      <div className="centered">
        <ErroroMessage message={error} />
      </div>
    );
  }

  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className={styles.noComments}>No comments were added yet !</p>;
  }

  return (
    <Fragment>
      <motion.section
        initial={{ y: "25vw", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={styles.comments}
      >
        <h2>Users Comments</h2>

        {!isAddingComment && (
          <div>
            <CustomButton color="accent" onClick={startAddCommentHandler}>
              Add a Comment
            </CustomButton>
          </div>
        )}
        {isAddingComment && (
          <NewCommentForm
            quoteId={quoteId}
            onAddComment={addedCommentHandler}
          />
        )}
        <div className={styles.reload}>
          <CustomButton color="primary" onClick={loadComments}>
            Refresh{" "}
          </CustomButton>
        </div>
        {comments}
      </motion.section>
    </Fragment>
  );
};

export default Comments;
