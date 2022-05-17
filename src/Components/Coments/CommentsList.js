import CommentItem from "./CommentItem";

import styles from "./CommentsList.module.scss";

const CommentsList = ({comments}) => {



  return (
    <ul className={styles.comments}>
      {comments.map((comment) => (
        <CommentItem
          
          key={comment.id}
          id={comment.id}
          text={comment.text}
          nick={comment.nick}
          userId={comment.userId}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
