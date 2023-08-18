import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage for Firebase Storage
import "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPG_H9-ptwoqaOk1T5Vn2nkvAokFJVS7c",
  authDomain: "cameregallery.firebaseapp.com",
  databaseURL: "https://cameregallery-default-rtdb.firebaseio.com",
  projectId: "cameregallery",
  storageBucket: "cameregallery.appspot.com",
  messagingSenderId: "432024193208",
  appId: "1:432024193208:web:f0a8052a6c86f26e764c4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage using getStorage

export const saveTodoToFirebase = async (todo) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(todo);
    console.log("Todo added to Firestore");
  } catch (error) {
    console.error("Error adding todo to Firestore:", error);
  }
};
