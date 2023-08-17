import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { Line } from "rc-progress";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  width: 10rem;
  background-color: #ffc619;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const ImageList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ImageItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const UploadedImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const ImageUploader = () => {
  const storage = getStorage();
  const [files, setFileList] = useState([]); // 파일 리스트
  const [isUploading, setUploading] = useState(false); // 업로드 상태
  const [photoURL, setPhotosURL] = useState([]); // 업로드 완료된 사진 링크들
  const [progress, setProgress] = useState(0); // 업로드 진행상태

  // 파일 선택시 파일리스트 상태 변경해주는 함수
  const handleImageChange = (e) => {
    for (const image of e.target.files) {
      setFileList((prevState) => [...prevState, image]);
    }
  };

  // 업로드시 호출될 함수
  const handleImageUpload = async (e, fileList) => {
    e.preventDefault();
    try {
      setUploading(true);
      // 업로드의 순서는 상관없으니 Promise.all로 이미지 업로드후 저장된 url 받아오기
      const urls = await Promise.all(
        fileList?.map(async (file) => {
          // 스토리지 어디에 저장되게 할껀지 참조 위치를 지정. 아래와 같이 지정해줄시 images 폴더에 파일이름으로 저장
          const storageRef = ref(storage, `images/${file.name}`);

          // File 또는 Blob 타입일 경우 uploadBytes 또는 uploadBytesResumable 메소드를 사용
          // 만약 base64 또는 data_url 문자열로 업로드를 진행할 경우는 uploadString 사용
          // 자세한 내용은 https://firebase.google.com/docs/storage/web/upload-files 공식문서 참고
          const task = uploadBytesResumable(storageRef, file);

          // 업로드 진행률을 모니터링, 업로드 진행률 퍼센트로 상태 지정
          task.on("state_changed", (snapshot) => {
            setProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            );
          });

          const url = await getDownloadURL(storageRef);
          return { url, name: file.name };
        })
      );
      // 업로드된 이미지 링크 상태로 지정 (보통은 해당 링크를 데이터베이스(파이어스토어)에 저장)
      setPhotosURL(urls);
    } catch (err) {
      console.error(err);
    }
    // 초기화
    setProgress(0);
    setUploading(false);
  };

  return (
    <Container>
      <Form>
        {/* rc-progress의 Line 컴포넌트로 파일 업로드 상태 표시 */}
        <Line percent={progress} strokeWidth={3} strokeColor="#eeeeee" />
        <label>
          <input
            multiple
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </label>
        <Button type="submit" onClick={(e) => handleImageUpload(e, files)}>
          {isUploading ? "업로드 중..." : "업로드"}
        </Button>
      </Form>
      {/* 업로드된 사진 목록 */}
      <ImageList>
        {photoURL?.length > 0 &&
          photoURL.map((image, index) => (
            <ImageItem key={index}>
              <UploadedImage src={image.url} alt={`업로드된 이미지 ${index}`} />
              <span>{image.name}</span>
            </ImageItem>
          ))}
      </ImageList>
    </Container>
  );
};

export default ImageUploader;
