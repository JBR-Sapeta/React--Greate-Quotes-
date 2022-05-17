import styles from "./Card.module.scss";

const Card = ({fit=false,children}) => {
  return (
    <div className={fit ? styles.fit : styles.maxWidth}>
      {children}
    </div>
  );
};

export default Card;
