import ReactDOM from 'react-dom'
import { motion } from 'framer-motion';

import { ReactComponent as Exit } from "../../Assets/Icons/close-outline.svg";

import styles from "./MobileNav.module.scss";

const MobileNav = ({children,onClick}) => {
  const content = (
    
      <motion.nav initial={{opacity:0}} animate={{opacity:1}} className={styles.nav} onClick={onClick}>
      {children}
      <button aria-label ="Close mobile navigation" onClick={onClick} className={styles.exit}><Exit  /></button>
      </motion.nav>
    
  );

  return ReactDOM.createPortal(content, document.getElementById("menu-hook"));
};

export default MobileNav;
