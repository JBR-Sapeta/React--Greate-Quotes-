import { motion } from "framer-motion";

import CutomButton from "../Ui/Actions/CustomButton";
import Avatar from "../../Assets/Img/user.png"

import styles from "./UserView.module.scss";

const UserView = ({userData,editMode,openEditMode}) => {
  const { name, surname, nick, img, description } = userData;
  

  return (
    <motion.section initial={{x:"25vw",opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.5}}  className={styles.container}>
      <div className={styles.avatar}>
        <img src={img ||Avatar}
         alt={`${nick} avatar.`}></img>
      </div>

      <div className={styles.data}>
        <p>
          <span>Nick name:</span>
          {` ${nick }`}
        </p>
        <p>
          <span>Name:</span>
          {` ${name  || "Gal"  }`}
        </p>
        <p>
          <span>Surname:</span>
          {` ${surname || "Anonim"}`}
        </p>
      </div>

      <div className={styles.description || "Hello there !"}>
        <p>
          <span>About me:</span>
        </p>
        <p>{description || "Hello there!"}</p>
      </div>

     { editMode && (<div className={styles.actions}>
        <CutomButton color="primary" onClick={openEditMode}>
          Edit
        </CutomButton>
      </div>)}
    </motion.section>
  );
};

export default UserView;
