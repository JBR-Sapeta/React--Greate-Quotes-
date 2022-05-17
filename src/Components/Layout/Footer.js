import { ReactComponent as Logo } from "../../Assets/Icons/library-outline.svg";
import { ReactComponent as Facebook } from "../../Assets/Icons/logo-facebook.svg";
import { ReactComponent as Instagram } from "../../Assets/Icons/logo-instagram.svg";
import { ReactComponent as Twitter } from "../../Assets/Icons/logo-twitter.svg";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div >
        <p className={styles.baner}>
          <Logo className={styles.logo} />
          Greate Qoutes
        </p>
        <p className={styles.parag}>The Most Famous Quotes of All Time </p>
      </div>

      <div>
        <ul className={styles.media}>Social Media
          <li><a target="_blank"  rel="noreferrer" href="https://www.facebook.com"> <Facebook className={styles.icon}/>Facebook</a></li>
          <li><a target="_blank"  rel="noreferrer" href="https://www.instagram.com"> <Instagram className={styles.icon}/>Instagram</a></li>
          <li><a target="_blank"  rel="noreferrer" href="https://twitter.com"> <Twitter className={styles.icon}/>Twitter</a></li>
        </ul>
      </div>

      <p className={styles.copy}>
        Copyright 2022 by JS. All rights reserved.
      </p>

    </footer>
  );
};

export default Footer;
