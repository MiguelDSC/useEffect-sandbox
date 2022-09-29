import React, { ChangeEvent, useState } from "react";
import styles from "./Login.module.css";
import ErrorModal from "./ErrorModal";

interface LoginProps {
  onLogin: (data: boolean) => void;
  getUsername: (data: string) => void;
}

const makeUsername = (email: string) => {
  const username = email.split("@");
  return username[0];
};

function Login(props: LoginProps) {
  const [enteredEmail, setenteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState({
    message: "",
    title: "",
  });

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !enteredEmail.trim().includes("@") ||
      enteredPassword.trim().length <= 5
    ) {
      setError({
        title: "input invalid",
        message: "Email must contain @ and password length > 5",
      });
      return;
    }

    props.onLogin(true);
    const name = makeUsername(enteredEmail);
    props.getUsername(name);
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("username", name);
  };

  return (
    <div>
      {error.message && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onCloseModal={() => {
            setError({
              message: "",
              title: "",
            });
          }}
        />
      )}

      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.center}>
          <input
            type="text"
            name="email"
            value={enteredEmail}
            onChange={(e) => {
              setenteredEmail(e.target.value);
            }}
            className={styles["form-middle"]}
            placeholder="E-mail"
          />
          <input
            type="password"
            className={styles["form-middle"]}
            placeholder="Password"
            value={enteredPassword}
            onChange={(e) => {
              setEnteredPassword(e.target.value);
            }}
          />
          <button className={`btn btn-success ${styles["form-middle"]}`}>
            LOGIN
          </button>
          {/* <p className={styles["form-middle"]}>
            Not registerd? <span>Create an account</span>
          </p> */}
        </div>
      </form>
    </div>
  );
}

export default Login;
