import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Profile from "./Profile";

const AppRouter = ({ isLoggedIn, userObj, setUserObj }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route
            exact
            path="/"
            element={<Profile userObj={userObj} setUserObj={setUserObj} />}
          />
        ) : (
          <Route exact path="/" element={<Auth userObj={userObj} />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
