import './App.css';
import { db } from './firebase';
import { collection, getDocs, doc, addDoc, query, orderBy, updateDoc, deleteDoc } from '@firebase/firestore'
// collection : 테이블 선택하는 기능
import { useEffect, useState } from 'react';
import TodoHead from './component/TodoHead';
import YumTemplate from './component/YumTemplate';
import styled, { createGlobalStyle, css } from "styled-components";
import { MdAdd } from 'react-icons/md';






const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;


const ListEntry = styled.div`
   font-family: 'Nanum Gothic', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin :20px 0;

  background-color: #f8f9fa;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  .list-content {
    flex: 1;
    font-size: 18px;
    margin-left: 20px;
  }

  .list-date {
    font-size: 14px;
    color: #868e96;
    margin-right: 20px;
  }
`;



const CircleButton = styled.button`
  background: #FFC619;
  &:hover {
    background: #0029FF;
  }
  &:active {
    background: #0029FF;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
        props.open &&
        css`
      background: #88DF18;
      &:hover {
        background: #88DF18;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}

`;

const InsertFormPositioner = styled.div`

width : 100%;
bottom : 0;
left : 0;

`;

const InsertFormp = styled.div`
display: flex;
  flex-direction: column;
  background: #f8f9fa;
  margin-top:20px
  margin-bottom:40px
  padding: 24px 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;

`;

const Input = styled.input`
  padding: 12px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  padding-right: 8px;
  margin-bottom: 12px;
`;



const InputButton1 = styled.button`
width: 100px;
border: 0;
  outline: none;
  font-size: 15px;
  background: #0029FF;
  color: white;
  margin : 0 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {color: white;
  background: #0522B9;
}
`;
const InputButton2 = styled.button`
width: 100px;
border: 0;
  outline: none;
  font-size: 15px;
  background: #FF196C;
  color: white;
  margin : 0 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {color: white;
  background: #DB155C;
}
`;
const InputButton3 = styled.button`
  width: 100px;
  border: 0;
  outline: none;
  font-size: 15px;
  background: #ffc619;
  color: white;
  margin: 0; /* Adjusted margin */
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #ffbf19;
  }
`;


function Todopage() {

      const [open, setOpen] = useState(false);
  
    const onToggle = () => setOpen(!open); // Toggle the state when the button is clicked

  // 렌더링 상태를 체크하기 위한 state 추가
  const [changed, setChanged] = useState(false)


  // 추가할 데이터를 저장할 state 생성
  var [newList,setNewList] = useState("")
  // console.log(newList)

  // 데이터를 저장할 state 생성
  var [todos, setList] = useState([]);

  // 데이터베이스 연결 객체 생성
  const todosCollectionRef=collection(db,'todos')

  useEffect(()=>{
    const getLists = async () => {
      // getDocs(DB 연결객체)로 데이터 가져오기
      // query(DB 연결객체, orderBy("기준열", "정렬 방식"))
      const data = await getDocs(
        query(todosCollectionRef, orderBy("timeStamp", "desc"))
      )
      // console.log(data)
      setList(
        data.docs.map(           //
          (doc) => (
            {...doc.data(), id:doc.id}
          )
        )
      );
      // console.log(todos)
    }

    getLists();
    setChanged(false)
  },[changed]) //새로고침하면 나옴
  // })

  // DB에 이벽할 날짜 생성
  const date = new Date();
  const now_date = `${date.getHours()}:${date.getMinutes()}`;

  // console.log(now_date)

  // 파이어베이스에 데이터 추가
  const createList = () => {
    // addDoc(DB 연결 객체, 저장할 데이터)
    addDoc(todosCollectionRef, 
      {
        content:newList, 
        d_date:now_date,
        // 최신 글 순으로 출력될 수 있도록 timeStamp 추가
        timeStamp:date
      }
      )
       setNewList("");
    setChanged(true)
  }

  const updateList= async(id, content)=>{
    // console.log(id,"/",content)
    const msg = prompt("내용 수정", content)

    if(msg){
      // id를 이용하여 데이터베이스에서 수정할 데이터 검색
      //doc("데이터베이스", "콜렉션", 검색할 key(id))
      const listDoc = doc(db, "todos", id);

      // 수정할 데이터
      const editData = {
        content:msg,
        d_date:now_date,
        timeStamp:date
      }

      // updateDoc(변경될 데이터, 수정할 데이터)
      await updateDoc(listDoc, editData )
      setChanged(true)
    }
  }

  // 삭제
    const deleteList = async (id) => {
        var del_ck = window.confirm("정말 삭제하시겠습니까?")

        if (del_ck) {
            const listDoc = doc(db, "todos", id);

            // deleteDoc(삭제할 데이터)
            await deleteDoc(listDoc)
            setChanged(true)
        }
    };

    
     const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createList();
    }
  };
    
    
    const showList = todos.map(
        (value) => (
            <ListEntry key={value.id}>
            <div className="list-content">
                   - {value.content}
                </div>
                 <div className="list-date">
                    <span className='d_date'> / {value.d_date}</span>
                    </div>
                    <InputButton1
                        onClick={() => { updateList(value.id, value.content) }}
                    >수정
                    </InputButton1>
                    <InputButton2
                        onClick={() => { deleteList(value.id) }}
                    >삭제</InputButton2>
       
            </ListEntry>
        )
    );

  
 return (
    <YumTemplate>
      <GlobalStyle />
         <TodoHead />
          {showList}
      <CircleButton open={open} onClick={onToggle}>
        <MdAdd />
      </CircleButton>
      {open && ( // Conditionally render the form if open is true
        <InsertFormPositioner>
          <InsertFormp>
            <Input
              type="text"
              placeholder="just do it !!!!!"
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              onKeyPress={handleInputKeyPress}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <InputButton3 type="button" onClick={createList}>
                등록
              </InputButton3>
              <div>
     
              </div>
            </div>
          </InsertFormp>
        </InsertFormPositioner>
      )}
     
    </YumTemplate>
  );
}

export default Todopage;