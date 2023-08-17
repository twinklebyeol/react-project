import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import { useNavigate } from "react-router-dom";
import homeButton from "../images/home.svg";
import penButton from "../images/pen.svg";


const YumHeadBlock = styled.div`
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;

.head_wrap{
display: flex;
    align-items: center; 
    justify-content: space-between;
}

  h1,
  h2 {
    font-family: 'Prompt', sans-serif;
    margin: 0;
  }
  h1 {
    font-size: 45px;
    margin-top: 20px;
    margin-left: 0;
  }
  h2 {
    margin-top: 0;
    margin-left: 5px;
  }
  p,
  .day,
  .tasks-left {
    font-family: 'Nanum Gothic', sans-serif;
  }
  p {
    margin: 0;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }
  .tasks-left {
    text-align: center;
    text-decoration: underline;
    color: #88DF18;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }


.button-container {
display: flex;
flex-direction: row; 
justify-content: flex-end; 
align-items: flex-end; 
margin: 0;
overflow: hidden;
}

.button1,
.button2 {
background-color: transparent;
border: none;
color: #ffffff;
margin-right: 0;
}

.homebutton {
margin-right: 10px;
width: 50px;
cursor: pointer;
}

.penbutton {
  margin-left: 10px;
  width: 40px;
  cursor: pointer;

}
`
;




function YumHead() {
  const todos = useTodoState();
  const [undoneTasks, setUndoneTasks] = useState(0);

  useEffect(() => {
    if (todos) {
      setUndoneTasks(todos.filter(todo => !todo.done).length);
    }
  },    [todos]);


  const today = new Date();
  const dateString = today.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'short' });

  const navigate = useNavigate();
  const goTotodopage = () => {
    navigate("/Todopage");
  };
  const goTomain = () => {
    navigate("/");
  };



  return (
    <YumHeadBlock>
    <div className='head_wrap'>
        <h1>YumDo!</h1>
          <div className="button-container">
      <button className="button1" onClick={goTomain}>
      <img className="homebutton" src={homeButton} alt="My Icon" />
      </button>   
      <button className="button2" onClick={goTotodopage}>
      <img className="penbutton" src={penButton} alt="My Icon" />
      </button>
        </div>
        </div>
      <h2>맛 집 등록하기🥘</h2>
  
    
      <p>
        {dateString} ({dayName})
      </p>
     <div className='tasks-left'>맛 집 {todos ? todos.length : 0}개 등록중</div>
     
    </YumHeadBlock>
  );
}

export default YumHead;
