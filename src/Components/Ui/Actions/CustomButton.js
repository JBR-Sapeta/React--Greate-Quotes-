import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const CutomButton = ({href,color,to,children,type,onClick}) => {
  if (href) {
    return (
      <a className={styles[color]} href={href}>
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={styles[color]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles[color]}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CutomButton;
