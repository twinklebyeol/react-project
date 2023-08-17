// TodoUpdate.js
import React, { useState } from 'react';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from './firebase';

function TodoUpdate({ id, content, onTodoUpdated }) {
  const [msg, setMsg] = useState(content);

  const handleUpdateList = async () => {
    if (!msg.trim()) return;

    const date = new Date();
    const now_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const listDoc = doc(db, 'todos', id);
    const editData = {
      content: msg,
      d_date: now_date,
      timeStamp: date,
    };

    await updateDoc(listDoc, editData);
    onTodoUpdated();
  };

  return (
    <div>
      <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button type="button" onClick={handleUpdateList}>
        수정
      </button>
    </div>
  );
}

export default TodoUpdate;
