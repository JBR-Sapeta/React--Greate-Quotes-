import ReactDOM from 'react-dom'

import styles from "./Backdrop.module.scss"

const Backdrop = ({onClick}) => {

  const content = (<div className={styles.backdrop} onClick={onClick}></div>)

  return ReactDOM.createPortal(content, document.getElementById("backdrop-hook"));
};

export default Backdrop;


