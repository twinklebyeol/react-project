import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import "./App.css";
import yumdoLogo from "./images/mainimg.png";
import pulsIcon from "./images/plusbutton.svg";
import foodImg from "./images/food.png";

const MainBlock = styled.div`

.Container {
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 50px auto;
  padding: 100px;
  border-radius: 10px;
  overflow: hidden; /* 컨테이너 영역을 넘어가는 요소들을 숨김 */
}

.maintitle_wrap {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.foodimg {
  width: 550px;
  text-align: center;
  margin-bottom: -50px;
}

h1 {
  font-family: "Prompt", sans-serif;
  font-size: 150px;
  text-align: center;
  margin: 0;
}

h2 {
  font-family: "Nanum Gothic", sans-serif;
  font-size: 40px;
  margin-right: 40px;
}

.yumdologo {
  width: 550px; /* 이미지의 너비 설정 */
  height: auto; /* 높이는 비율에 맞추기 위해 auto 설정 */
  margin: 0 auto; /* 좌우 가운데 정렬을 위해 margin 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  overflow: hidden;
}

.container {
  display: inline-block;
  padding: 10px;
  overflow: hidden; /* 컨테이너 영역을 넘어가는 요소들을 숨김 */
}

.plusbutton1,
.plusbutton2 {
  background-color: transparent;
  border: none;
  color: #ffffff;
}

.imgbutton1 {
  width: 80px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.imgbutton2 {
  width: 80px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.todotitle_wrap {
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬로 변경 */
  align-items: center;
}
.todologo {
  font-size: 40px; /* 원하는 폰트 크기로 변경 */
  margin: 0;
  padding-left: 20px; /* 로고를 왼쪽으로 이동 */
}
// 

`



function Main() {
  const navigate = useNavigate();
  const goTotodopage = () => {
    navigate("/Todopage");
  };
  const goToyumpage = () => {
    navigate("/Yumpage");
  };

  return (
    <MainBlock>
    <div className="Container">
      <div className="maintitle_wrap">
        <img className="foodimg" src={foodImg} alt="Foodimg" />
        <h1>YumDo!</h1>
        <img className="yumdologo" src={yumdoLogo} alt="YumDo! Logo" />
      </div>
      <div className="button-container">
        <h2>✏️ 할 일 등록하기</h2>

        <button className="plusbutton1" onClick={goTotodopage}>
          <img className="imgbutton1" src={pulsIcon} alt="My Icon" />
        </button>
      </div>

      <div className="button-container">
        <h2>🥘 맛 집 등록하기</h2>
        <button className="plusbutton2" onClick={goToyumpage}>
          <img className="imgbutton2" src={pulsIcon} alt="My Icon" />
        </button>
      </div>
      </div>
      </MainBlock>
  );
}

export default Main;
