import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { removeLocalStorageAuthData } from "../../Helpers/LocalStorageActions";

import styles from "./NavLinks.module.scss";

const NavLinks = ({ mobile, onClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.auth);

  const logouthandler = () => {
    dispatch({ type: "LOGOUT" });
    removeLocalStorageAuthData();
    navigate("/");
  };

  if (mobile) {
    return (
      <ul className={styles.mobileList} onClick={onClick}>
        {mobile && (
          <li className={styles.link}>
            <NavLink
              to="/"
              className={(navData) =>
                navData.isActive ? styles.mobileActive : styles.mobileStandard
              }
            >
              Home
            </NavLink>
          </li>
        )}
        <li className={styles.link}>
          <NavLink
            to="/quotes"
            className={(navData) =>
              navData.isActive ? styles.mobileActive : styles.mobileStandard
            }
          >
            Quotes
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className={styles.link}>
            <NavLink
              to="/add-quote"
              className={(navData) =>
                navData.isActive ? styles.mobileActive : styles.mobileStandard
              }
            >
              Add Quote
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.link}>
            <NavLink
              to="/my-quotes"
              className={(navData) =>
                navData.isActive ? styles.mobileActive : styles.mobileStandard
              }
            >
              My Quotes
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.link}>
            <NavLink
              to="/profile"
              className={(navData) =>
                navData.isActive ? styles.mobileActive : styles.mobileStandard
              }
            >
              Profile
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li className={styles.link}>
            <NavLink
              to="/authentication"
              className={(navData) =>
                navData.isActive ? styles.mobileActive : styles.mobileStandard
              }
            >
              Login
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <button onClick={logouthandler}>Logout</button>
          </li>
        )}
      </ul>
    );
  }

  return (
    <ul className={styles.list}>
      <li className={styles.link}>
        <NavLink
          to="/quotes"
          className={(navData) =>
            navData.isActive ? styles.active : styles.standard
          }
        >
          Quotes
        </NavLink>
      </li>
      {isLoggedIn && (
        <li className={styles.link}>
          <NavLink
            to="/add-quote"
            className={(navData) =>
              navData.isActive ? styles.active : styles.standard
            }
          >
            Add Quote
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li className={styles.link}>
          <NavLink
            to="/my-quotes"
            className={(navData) =>
              navData.isActive ? styles.active : styles.standard
            }
          >
            My Quotes
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li className={styles.link}>
          <NavLink
            to="/profile"
            className={(navData) =>
              navData.isActive ? styles.active : styles.standard
            }
          >
            Profile
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li className={styles.link}>
          <NavLink
            to="/authentication"
            className={(navData) =>
              navData.isActive ? styles.active : styles.standard
            }
          >
            Login
          </NavLink>
        </li>
      )}
       {isLoggedIn && (
      <li>
        <button className={styles.btn} onClick={logouthandler}>
          Logout
        </button>
      </li>)}
    </ul>
  );
};

export default NavLinks;
