import { motion } from "framer-motion";

import { ReactComponent as Warning  } from "../../Assets/Icons/alert-circle-outline.svg";

import styles from "./NotFoundMessage.module.scss"



const NotFoundMessage = ({author})=>{

    return(
        <motion.div initial={{x:"25vw",opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.3}}  className={styles.message}>
            <Warning className={styles.icon}/>
           {author &&(<p>Author not Found!</p>)} 
           {!author &&( <p>No quotes Found!</p>)} 
        </motion.div>
    );

}

export default NotFoundMessage;