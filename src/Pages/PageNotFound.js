import { ReactComponent as Icon } from "../Assets/Icons/alert-circle-outline.svg";

import Page from "../Components/Ui/Wrapers/Page";
import Card from "../Components/Ui/Wrapers/Card";

import styles from "./PageNotFound.module.scss";

const PageNotFound = () => {
  return (
    <Page>
      <Card fit={true}>
        <div className={styles.page}>
          <Icon className={styles.icon}></Icon>
          <h2 className={styles.h2}>Page Not Found</h2>
          <div className={styles.message}>
            <p className={styles.p}>
              The entered url is incorrect or you are not allowed to access this
              page.
            
              Make sure you are logged in and entered url is correct.
            </p>
          </div>
        </div>
      </Card>
    </Page>
  );
};

export default PageNotFound;
