import { Link } from "react-router-dom";

import Page from "../Components/Ui/Wrapers/Page";
import Card from "../Components/Ui/Wrapers/Card";

import CommentsIMG from "../Assets/Img/home_1.jpg";
import QuotesIMG from "../Assets/Img/home_2.jpg";
import ProfileIMG from "../Assets/Img/home_3.jpg";

import {ReactComponent as Arrow} from "../Assets/Icons/arrow-forward.svg";

import styles from "./Home.module.scss";

const Home = () => {
  
  
  return (
    <Page>
      <Card>
        <h2 className={styles.h2}>The Most Famous Quotes of All Time </h2>

        <hr className={styles.hr}></hr>

        <section className={styles.section}>
          <div className={styles.container}>
            <article className={styles.article}>
              <h3> Find Quotes !</h3>
              <p>
              Search through hundreds of inspirational quotes and find  some to keep you inspired.
              We hope you find a few you like and can revisit often to stay motivated.
              </p>
            </article>
            <figure className={styles.figure}>
              <img src={CommentsIMG} alt="Quotes list" />
            </figure>
          </div>

        

          <div className={styles.container}>
            <article className={styles.article}>
              <h3> Join to our community ! </h3>
              <p>
              Create account and share your favorites quotes  !  
              Join to Discussions with other users and write comments. 
              </p>
            </article>
            
            <figure className={styles.figure}>
              <img src={QuotesIMG} alt="Quotes list" />
            </figure>

            <figure className={styles.figure}>
              <img src={ProfileIMG} alt="Quotes list" />
            </figure>
            <div className={styles.link}>
                <Link to="/authentication" ><span className={styles.span}>Join Now<Arrow className={styles.icon}/></span> </Link>
            </div>
          </div>
        </section>

        <hr className={styles.hr}></hr>
      </Card>

     
    </Page>
  );
};

export default Home;
