import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import { ReactComponent as Logo } from "../../Assets/Icons/library-outline.svg";
import { ReactComponent as Menu } from "../../Assets/Icons/reorder-three-outline.svg";

import NavLinks from "./NavLinks";
import Backdrop from "../Ui/Modal/Backdrop";
import MobileNav from "./MobileNav";

import styles from "./MainNavigation.module.scss";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavLink
          to="/"
          className={(navData) =>
            navData.isActive ? styles.activeBaner : styles.baner
          }
        >
          <Logo className={styles.logo} />
          Greate Qoutes
        </NavLink>
      </motion.div>

      <motion.nav
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.desktop}
      >
        <NavLinks />
      </motion.nav>

      <div className={styles.mobile}>
        <button
          className={styles.btn}
          onClick={openDrawerHandler}
          aria-label="Mobile navigation button"
        >
          <Menu className={styles.icon} />
        </button>
      </div>

      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      {drawerIsOpen && (
        <MobileNav onClick={closeDrawerHandler}>
          <NavLinks mobile={true} onClick={closeDrawerHandler} />
        </MobileNav>
      )}
    </header>
  );
};
export default MainNavigation;
