import { firebaseInstance, authService, dbService } from "fbase";
import React, { useState, useEffect } from "react";
import BestEcho from "./BestEcho";

const Auth = ({ userObj }) => {
  const [echos, setEchos] = useState([]);
  useEffect(() => {
    dbService.collection("echos").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEchos(nweetArray);
    });
  }, []);
  const login = async (event) => {
    let provider;
    provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <input
        type="button"
        className="google_login login_btn"
        value="Google login"
        onClick={login}
      />
      <div id="best_echo_wrap">
        <section id="best_echo_section">
          {echos.map((echo) => (
            <BestEcho key={echo.id} echoObj={echo} userObj={userObj} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Auth;
