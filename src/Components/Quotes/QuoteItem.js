import CutomButton from "../Ui/Actions/CustomButton";
import UserAvatar from "../Ui/UserAvatar";

import styles from "./QuoteItem.module.scss";

const QuoteItem = ({ id, text, author, userId, nick }) => {
  return (
    <li className={styles.item}>
      <figure>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      <div className={styles.actions}>
        <CutomButton color="primary" to={`/quotes/${id}`}>
          View
        </CutomButton>
      </div>
      <div className={styles.user}>
        <UserAvatar nick={nick} userId={userId} />
      </div>
    </li>
  );
};

export default QuoteItem;
