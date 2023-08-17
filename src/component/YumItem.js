import React,{ useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #FF196C;
  }
`;

const YumItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid black;
      color: black;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function YumItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onDelete = () => {
    if (confirmDelete) {
      dispatch({ type: 'REMOVE', id });
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };
  return (
    <YumItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onDelete}>
        {confirmDelete ? '정말로 삭제하시겠습니까?' : <MdDelete />}
      </Remove>
    </YumItemBlock>
  );
}

export default React.memo(YumItem)