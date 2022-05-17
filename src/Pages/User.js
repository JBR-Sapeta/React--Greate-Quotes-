import { useEffect } from "react";
import { useParams } from "react-router";

import useHttp from "../Hooks/useHttp";
import { getUser } from "../Lib/Api";

import Page from "../Components/Ui/Wrapers/Page";
import Card from "../Components/Ui/Wrapers/Card";
import LoadingSpinner from "../Components/Ui/LoadingSpinner";
import ErrorMessage from "../Components/Ui/ErrorMessage";
import UserView from "../Components/Profile/UserView";

import styles from "./User.module.scss"

const User = () => {
  const params = useParams();
  const { userId } = params;

  const { sendRequest, status, data: userData, error } = useHttp(getUser, true);

  useEffect(() => {
    sendRequest(userId);
  }, [sendRequest, userId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered">
        <Card><ErrorMessage message={error} /></Card>
      </div>
    );
  }

  return (
    <Page>
      <Card>
        <section className={styles.section}>
          <h2>{userData.nick} Profile</h2>
        <UserView userData={userData}  editMode={false}/>
        </section>
      </Card>
    </Page>
  );
};

export default User;
