import { motion } from "framer-motion";

import styles from "./Page.module.scss";

const Page = ({children}) => {
  return (
    <motion.div
      initial={{ x: "25vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.page}
    >
      {children}
    </motion.div>
  );
};

export default Page;
