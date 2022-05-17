import { Link } from "react-router-dom";

import { ReactComponent as Icon } from "../../Assets/Icons/person.svg";

import styles from "./UserAvatar.module.scss";

const UserAvatar = ({ userId, nick }) => {
  return (
    <div className={styles.user}>
      <p>Posted by:</p>
      <Link className={styles.link} to={`/user/${userId}`}>
        <span>
          <Icon className={styles.icon} />
          {nick}
        </span>
      </Link>
    </div>
  );
};

export default UserAvatar;
