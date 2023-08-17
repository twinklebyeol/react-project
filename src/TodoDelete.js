// TodoDelete.js
import React from 'react';
import { doc, deleteDoc } from '@firebase/firestore';
import { db } from './firebase';

function TodoDelete({ id, onTodoDeleted }) {
  const handleDeleteList = async () => {
    const del_ck = window.confirm('정말 삭제하시겠습니까?');
    
    if (del_ck) {
      const listDoc = doc(db, 'todos', id);
      await deleteDoc(listDoc);
      onTodoDeleted();
    }
  };

  return (
    <button type="button" onClick={handleDeleteList}>
      삭제
    </button>
  );
}

export default TodoDelete;
