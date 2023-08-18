import "./App.css";
import { db, storage } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import YumHead from "./component/YumHead";

import ReactDOM from 'react-dom';
import YumTemplate from "./component/YumTemplate";
import styled, { createGlobalStyle, css } from "styled-components";
import { MdAdd } from "react-icons/md";
import AddressSearch from "./AddressSearch";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const ListContainer = styled.div`
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ListEntry = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  /* Add fixed width and height for each card */
  width: 280px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin: 0 10px;
  margin-bottom: 50px;
  background-color: #f8f9fa;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  .list-content {
    font-size: 18px;
    margin-top: 10px;
    margin-left: 10px;
  }

  .list-date {
    font-size: 14px;
    color: #868e96;
    margin-top: 10px;
    margin-right: 10px;
    align-self: flex-end;
  }
`;

const CircleButton = styled.button`
  background: #ffc619;
  &:hover {
    background: #0029ff;
  }
  &:active {
    background: #0029ff;
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
  ${(props) =>
    props.open &&
    css`
      background: #88df18;
      &:hover {
        background: #88df18;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
`;

const InsertFormp = styled.div`
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  margin: 100px 0;
  padding: 24px 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const TextArea = styled.input`
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
  background: #0029ff;
  color: white;
  margin: 0 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #0522b9;
  }
`;
const InputButton2 = styled.button`
  width: 100px;
  border: 0;
  outline: none;
  font-size: 15px;
  background: #ff196c;
  color: white;
  margin: 0 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #db155c;
  }
`;
const InputButton3 = styled.button`
  width: 100px;
  border: 0;
  outline: none;
  font-size: 15px;
  background: #000000;
  color: white;
  margin: 0;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #ffbf19;
  }
`;
const InputButton4 = styled.label`
  width: 100px;
  border: 0;
  outline: none;
  font-size: 15px;
  background: #000000;
  color: white;
  margin: 0;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #ffbf19;
  }
`;
const InputButton5 = styled.button`
  width: 100px;
  border: 0;
  outline: none;
  font-size: 15px;
  background: #ffc619;
  color: white;
  margin
  margin: 0;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #000000;
  }
`;





function Yumpage() {
  const [open, setOpen] = useState(false);
  const [postcodeOpen, setPostcodeOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [changed, setChanged] = useState(false);
  var [newList, setNewList] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  var [yums, setList] = useState([]);
  const yumsCollectionRef = collection(db, "yums");

  useEffect(() => {
    const getLists = async () => {
      const data = await getDocs(
        query(yumsCollectionRef, orderBy("timeStamp", "desc"))
      );
      setList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getLists();
    setChanged(false);
  }, [changed]);

  const date = new Date();
  const now_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const createList = () => {
    addDoc(yumsCollectionRef, {
      content: newList,
      d_date: now_date,
      timeStamp: date,
    });
    setNewList("");
    setSelectedAddress("");
    setChanged(true);
  };

  const updateList = async (id, content) => {
    const msg = prompt("내용 수정", content);

    if (msg) {
      const listDoc = doc(db, "yums", id);

      const editData = {
        content: msg,
        d_date: now_date,
        timeStamp: date,
        imageUrl: imageUrl,
      };

      await updateDoc(listDoc, editData);
      setNewList("");
      setImageUrl("");
      setChanged(true);
    }
  };

  const deleteList = async (id) => {
    var del_ck = window.confirm("정말 삭제하시겠습니까?");

    if (del_ck) {
      const listDoc = doc(db, "yums", id);

      await deleteDoc(listDoc);
      setChanged(true);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const contentWithAddress = `${newList} - ${selectedAddress}`;
      createList(contentWithAddress);
    }
  };

  

  const showList = yums.map((value) => (
    <ListEntry key={value.id}>
      <div className="list-content">- {value.content}</div>
      <div className="list-date">
        <span className="d_date"> / {value.d_date}</span>
      </div>
      <ButtonContainer>
        <InputButton1
          onClick={() => {
            updateList(value.id, value.content);
          }}
        >
          수정
        </InputButton1>
        <InputButton2
          onClick={() => {
            deleteList(value.id);
          }}
        >
          삭제
        </InputButton2>
      </ButtonContainer>
 
    </ListEntry>
  ));

  const openPostcode = () => {
    setPostcodeOpen(true);

    console.log("postcodeOpen : "+ postcodeOpen);
  };

  const closePostcode = () => {
    setPostcodeOpen(false);
  };

  const handleAddress = (data) => {
    console.log("data : "+data);
    const { address } = data;
    setSelectedAddress(address);
    console.log(address);
    closePostcode();
  };

  const onToggle = () => setOpen(!open);

  return (
    <div>
    <YumTemplate>
      <GlobalStyle />
      <YumHead />
        <div>
        <div>{selectedAddress}</div>
      </div>
      <ListContainer>{showList}</ListContainer>
      <CircleButton open={open} onClick={onToggle}>
        <MdAdd />
      </CircleButton>
      {open && (
        <InsertFormPositioner>
          <InsertFormp>
            <TextArea
              type="text"
              placeholder="오늘은 어떤 맛집을 다녀왔니?"
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              onKeyPress={handleInputKeyPress}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
             
              <InputButton3 type="button" onClick={openPostcode}>
                주소검색
              </InputButton3>
              <InputButton4 htmlFor="imageInput">
                사진첨부
              </InputButton4>
              <InputButton5 type="button" onClick={createList}>
                등록
              </InputButton5>
            </div>
            <div>
            {postcodeOpen && (
              <AddressSearch
                onComplete={handleAddress}
                isOpen={postcodeOpen}
                onClose={closePostcode}
              />
            )}</div>
          </InsertFormp>
        </InsertFormPositioner>
      )}
      </YumTemplate>
    </div>
  );
}


export default Yumpage;
