import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const BestEcho = ({ echoObj, userObj }) => {
  const onClickLikeBtn = () => {
    if (userObj) {
      console.log(userObj);
    } else {
      alert("로그인이 필요합니다");
    }
  };

  const random = () => {
    const array = [
      "http://cdn.shopify.com/s/files/1/0472/6621/products/TPT_Ad_300x300_600x.png?v=1507047788",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz17qCPkhu7ifEVUnWmAAO02HzJsnDmfO3iJKxpmGBhzS_aAo-vRsrTEvQ6TfDbOwF1kw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNUvnXSQYzRET-NdGZDYonYh0MuuTrR7pIXilCbOfVaYgjt2UVhMUsnF4F2GokRG_mAw0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZKUkmWXyblq4PhZC0vOB6XWgILa6-2IWcqaGmSazpbTgB2dDmBtj_5Dn4Visdi6ZJbhk&usqp=CAU",
    ];
    return array[Math.floor(Math.random() * array.length)];
  };

  return (
    <div className="best_echo_grid">
      <div className="best_echo_img_area">
        <img
          className="best_echo_img"
          src={
            echoObj.imgUrl ||
            "http://cdn.shopify.com/s/files/1/0472/6621/products/TPT_Ad_300x300_600x.png?v=1507047788"
          }
          alt="베스트에코이미지"
        />
      </div>
      <div className="best_echo_content">
        <p className="echo">{echoObj.text}</p>
        <div className="best_echo_like_area">
          <p>{echoObj.creatorEmail}</p>
          <p className="like_Btn_off">
            {echoObj.like}
            <AiFillStar color={"#006064"} onClick={onClickLikeBtn} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestEcho;
