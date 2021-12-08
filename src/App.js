import React, { useEffect, useState } from "react";
import AppRouter from "Components/Router";
import { authService, dbService } from "fbase";
import "App.css";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      <header id="header">
        <h1 id="logo">Echo</h1>
        {init ? (
          <AppRouter
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
            setUserObj={setUserObj}
          />
        ) : (
          "initializing..."
        )}
      </header>
    </>
  );
}

export default App;
