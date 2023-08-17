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
// collection : 테이블 선택하는 기능
import { useEffect, useState } from "react";
import YumHead from "./component/YumHead";
import YumTemplate from "./component/YumTemplate";
import styled, { createGlobalStyle, css } from "styled-components";
import { MdAdd } from "react-icons/md";
import ImageUploader from "./ImageUploader";

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
  margin: 0; /* Adjusted margin */
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #ffbf19;
  }
`;
const InputButton4 = styled.button`
  width: 100px;
  border: 0;
  outline: none;
  font-size: 15px;
  background: #000000;
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
const InputButton5 = styled.button`
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
    background: #000000;
  }
`;

function Yumpage() {
  const [open, setOpen] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false); // 사진첨부 기능 보여줄지 여부
  const onToggle = () => setOpen(!open); // Toggle the state when the button is clicked

  // 렌더링 상태를 체크하기 위한 state 추가
  const [changed, setChanged] = useState(false);

  // 추가할 데이터를 저장할 state 생성

  var [newList, setNewList] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploaderVisible, setImageUploaderVisible] = useState(false);
  // console.log(newList)

  // 데이터를 저장할 state 생성
  var [yums, setList] = useState([]);

  // 데이터베이스 연결 객체 생성
  const yumsCollectionRef = collection(db, "yums");

  useEffect(() => {
    const getLists = async () => {
      // getDocs(DB 연결객체)로 데이터 가져오기
      // query(DB 연결객체, orderBy("기준열", "정렬 방식"))
      const data = await getDocs(
        query(yumsCollectionRef, orderBy("timeStamp", "desc"))
      );
      // console.log(data)
      setList(
        data.docs.map(
          //
          (doc) => ({ ...doc.data(), id: doc.id })
        )
      );
      // console.log(todos)
    };

    getLists();
    setChanged(false);
  }, [changed]); //새로고침하면 나옴
  // })

  // DB에 이벽할 날짜 생성
  const date = new Date();
  const now_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  // console.log(now_date)

  // 파이어베이스에 데이터 추가
  const createList = () => {
    // addDoc(DB 연결 객체, 저장할 데이터)
    addDoc(yumsCollectionRef, {
      content: newList,
      d_date: now_date,
      // 최신 글 순으로 출력될 수 있도록 timeStamp 추가
      timeStamp: date,
    });
    setNewList("");
    setChanged(true);
  };

  const updateList = async (id, content) => {
    // console.log(id,"/",content)
    const msg = prompt("내용 수정", content);

    if (msg) {
      // id를 이용하여 데이터베이스에서 수정할 데이터 검색
      //doc("데이터베이스", "콜렉션", 검색할 key(id))
      const listDoc = doc(db, "yums", id);

      // 수정할 데이터
      const editData = {
        content: msg,
        d_date: now_date,
        timeStamp: date,
        imageUrl: imageUrl,
      };

      // updateDoc(변경될 데이터, 수정할 데이터)
      await updateDoc(listDoc, editData);
      setNewList("");
      setImageUrl("");
      setChanged(true);
    }
  };

  // 삭제
  const deleteList = async (id) => {
    var del_ck = window.confirm("정말 삭제하시겠습니까?");

    if (del_ck) {
      const listDoc = doc(db, "yums", id);

      // deleteDoc(삭제할 데이터)
      await deleteDoc(listDoc);
      setChanged(true);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createList();
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Upload the file to Firebase Storage
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);

      // Get the download URL of the uploaded file
      const imageUrl = await fileRef.getDownloadURL();

      // Set the imageUrl state
      setImageUrl(imageUrl);

      // Append the image URL to the text input
      setNewList((prevText) => `${prevText} ![Image](${imageUrl})`); // Markdown image syntax
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
      {value.imageUrl && <img src={value.imageUrl} alt="Uploaded" />}
    </ListEntry>
  ));

  return (
    <YumTemplate>
      <GlobalStyle />
      <YumHead />
      <ListContainer>{showList}</ListContainer>
      <CircleButton open={open} onClick={onToggle}>
        <MdAdd />
      </CircleButton>
      {open && ( // Conditionally render the form if open is true
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
              <InputButton3 type="button" onClick={createList}>
                주소검색
              </InputButton3>
              <InputButton4 as="label" htmlFor="imageInput">
                사진첨부
              </InputButton4>
              <InputButton5 type="button" onClick={createList}>
                등록
              </InputButton5>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}{" "}
            {/* Display uploaded image */}
          </InsertFormp>
        </InsertFormPositioner>
      )}
    </YumTemplate>
  );
}

export default Yumpage;
