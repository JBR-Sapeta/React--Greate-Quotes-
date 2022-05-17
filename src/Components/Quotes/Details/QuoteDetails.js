
import UserAvatar from "../../Ui/UserAvatar";

import styles from "./QuoteDetails.module.scss";

const SingleQuote = ({text,author,userId,nick}) => {
  return (
    <div className={styles.quote}>
      <figure>
        <blockquote>
          <p>{text}</p>
    
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      <UserAvatar nick={nick} userId={userId}/>
    </div>
  );
};

export default SingleQuote;
