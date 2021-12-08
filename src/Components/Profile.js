import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { AiFillStar } from "react-icons/ai";
import BestEcho from "./BestEcho";
import Echo from "./Echo";

const Profile = ({ userObj, setUserObj }) => {
  const [echos, setEchos] = useState([]);
  const [newEcho, setNewEcho] = useState("");
  useEffect(() => {
    dbService.collection("echos").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEchos(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const nweetObj = {
      text: newEcho,
      like: 0,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorEmail: userObj.email,
    };
    await dbService.collection("echos").add(nweetObj);
    alert("echo가 등록되었습니다");
    setNewEcho("");
  };

  const logout = (event) => {
    authService.signOut();
    setUserObj(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewEcho(value);
  };

  return (
    <>
      {userObj ? (
        <>
          {userObj.email}
          <div id="user_log">환영합니다 </div>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        "init"
      )}
      <section id="input_section">
        {userObj && (
          <>
            <div id="input_area">
              <form onSubmit={onSubmit}>
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
                  value={newEcho}
                  onChange={onChange}
                  maxLength={20}
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
      <div id="best_echo_wrap">
        {/* <h2 id="best_echo_title">Best Echo</h2> */}
        <section id="best_echo_section">
          {echos.map((echo) => (
            <BestEcho key={echo.id} echoObj={echo} userObj={userObj} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Profile;
