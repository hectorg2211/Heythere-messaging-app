import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: actionTypes.SET_USER,
        user,
      });
    });
  }, [dispatch]);

  return (
    <div className="login">
      <div className="login__container">
        <img src="./assets/Heythere.png" alt="Heythere logo" />
        <div className="login__text">
          <h1>Sign in to HeyThere</h1>
        </div>

        <Button
          type="submit"
          variant="outlined"
          onClick={() => signInWithPopup(auth, provider)}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
