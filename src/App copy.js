import { useState, useEffect } from "react";
import { firebaseInstance, dbService, authService } from "./fbase";
import "./App.css";

import BestEcho from "./Components/BestEcho";
import Echo from "./Components/Echo";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [echos, setEchos] = useState([]);

  useEffect(() => {
    dbService.collection("echos").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEchos(nweetArray);
    });

    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        setInit(true);
      } else {
        setUserObj(null);
        setInit(false);
      }
    });
  }, []);

  // login 함수
  const login = async () => {
    let provider = new firebaseInstance.auth.GoogleAuthProvider();
    const data = await authService.signInWithPopup(provider);
    // setUserObj(data);
    setIslogin(true);
    // console.log(userObj);
  };

  // logout 함수
  const logout = (event) => {
    // firebase logout
    authService.signOut();
    setIslogin(false);
  };

  return (
    <div className="App">
      {init ? (
        <>
          <header id="header">
            <h1 id="logo">Echo</h1>
            {init ? (
              <>
                <div id="user_log">환영합니다</div>
                <button onClick={logout}>logout</button>
              </>
            ) : (
              <>
                {userObj !== null ? (
                  "loading"
                ) : (
                  <input
                    type="button"
                    className="google_login login_btn"
                    value="Google login"
                    onClick={login}
                  />
                )}
              </>
            )}
          </header>

          <section id="input_section">
            {userObj && (
              <>
                <div id="input_area">
                  <form>
                    <div id="input_file_area">
                      {false ? (
                        <img
                          id="preview_echo"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL2tEJHaM69kKAY1n13ClXc8dGkvvRt-vY9Q&usqp=CAU"
                          alt=""
                        />
                      ) : (
                        <label htmlFor="input_file">
                          +<br />
                          사진등록{" "}
                          <input
                            type="file"
                            id="input_file"
                            accept="image/jpeg, image/jpg, image/png"
                            style={{ display: "none" }}
                          />
                        </label>
                      )}
                    </div>
                    <input
                      type="text"
                      id="input_echo"
                      placeholder="Echo를 입력해주세요!"
                    />
                    <br />
                    <input type="submit" id="input_echo_btn" value="ECHO!" />
                  </form>
                </div>
                <div id="user_area">
                  <AiFillStar color={"yellow"} />
                </div>
              </>
            )}
          </section>
        </>
      ) : (
        ""
      )}

      <div id="best_echo_wrap">
        <h2 id="best_echo_title">Best Echo</h2>
        <section id="best_echo_section">
          {echos.map((echo) => (
            <BestEcho key={echo.id} echoObj={echo} />
          ))}
        </section>
      </div>
      <Echo />
    </div>
  );
}

export default App;
