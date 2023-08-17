import React from 'react';
import styled from 'styled-components';
import { useTodoState } from './TodoContext';

const TodoHeadBlock = styled.div`
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  h1,
  h2 {
    font-family: 'Prompt', sans-serif;
  }
  h1 {
    font-size: 45px;
    margin-top: 20px;
    margin-left: 20px;
  }
  h2 {
    margin-top: 0;
    margin-left: 20px;
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
`;
function TodoHead() {
  const todos = useTodoState();
  const undoneTasks = todos.filter(todo => !todo.done);
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <TodoHeadBlock>
      <h1>YumDo!</h1>   
      <h2>할 일 등록하기✏️</h2>
      <p>{dateString}</p>
      <p className="tasks-left">할 일 {undoneTasks.length}개 남음</p>
    </TodoHeadBlock>
  );
}

export default TodoHead;
