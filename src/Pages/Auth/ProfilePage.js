import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { setLocalStorageAuthData } from "../../Helpers/LocalStorageActions";
import useHttp from "../../Hooks/useHttp";
import { getUser } from "../../Lib/Api";

import Page from "../../Components/Ui/Wrapers/Page";
import Card from "../../Components/Ui/Wrapers/Card";
import LoadingSpinner from "../../Components/Ui/LoadingSpinner";
import ErrorMessage from "../../Components/Ui/ErrorMessage";

import UserView from "../../Components/Profile/UserView";
import ProfileForm from "../../Components/Profile/PasswordForm";
import EmailForm from "../../Components/Profile/EmailForm";
import UpdatingForm from "../../Components/Auth/UpdatingForm";

import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [nickNameDefined, setNickNameDefined] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId, idToken, expiresIn } = useSelector((state) => state.auth);

  const { sendRequest, status, data: userData, error } = useHttp(getUser, true);

  const openEditMode = () => {
    setEditMode(true);
    console.log(editMode);
  };
  const closeEditMode = () => {
    setEditMode(false);
    console.log(editMode);
  };

  const dataUpdatedHandler = () => {
    sendRequest(userId);
  };

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
      <Card fit={true}>
        <ErrorMessage message={error} />
      </Card>
    );
  }

  if (status === "completed" && !userData.nick) {
    navigate("/start");
  }

  if (status === "completed" && userData && !nickNameDefined) {
    dispatch({
      type: "NICK",
      nick: userData.nick,
    });
    setLocalStorageAuthData(idToken, expiresIn, userId, userData.nick);
    setNickNameDefined(true);
  }

  return (
    <Page>
      <Card>
        <section className={styles.section}>
          <h2>Profile data</h2>
          {!editMode && (
            <UserView
              userData={userData}
              editMode={true}
              openEditMode={openEditMode}
            />
          )}
          {editMode && (
            <UpdatingForm
              userData={userData}
              userId={userId}
              closeEditMode={closeEditMode}
              dataUpdatedHandler={dataUpdatedHandler}
            />
          )}
          <h2 className={styles.actions}>Edit authentication data</h2>
          <div className={styles.forms}>
            <ProfileForm idToken={idToken} />
            <EmailForm idToken={idToken} />
          </div>
        </section>
      </Card>
    </Page>
  );
};

export default ProfilePage;
