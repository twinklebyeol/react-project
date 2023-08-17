import React from 'react';
import styled from 'styled-components';
import YumItem from './YumItem';
import { useTodoState } from '../TodoContext';

const YumListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  color : black;
  
`;


function YumList() {

    const todos = useTodoState();
       

    return (
    
        <YumListBlock>
            {todos.map(todo => (
                <YumItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />     
            ))}

        </YumListBlock>
    );
}


export default YumList;