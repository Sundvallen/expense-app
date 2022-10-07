import React, { useState } from "react";
import { TrashSimple } from "phosphor-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../app/hooks";
import { removeExpense } from "./expenseSlice";

const DeleteButton = ({ ids, toggleSelected }) => {
  const dispatch = useDispatch();
  const [hovering, setHovering] = useState(false);
  const uid = useSelector((state) => state.auth.user.uid);
  return (
    <DeleteIcon>
      <TrashSimple
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        weight={hovering ? "fill" : "regular"}
        onClick={() => {
          toggleSelected(false);
          dispatch(
            removeExpense({
              uid,
              ids,
            })
          );
        }}
        size={20}
      />
      <p>{ids.length}</p>
    </DeleteIcon>
  );
};

const DeleteIcon = styled.div`
  position: absolute;
  display: flex;

  margin-top: 67px;
  margin-left: 25px;

  svg {
    color: rgb(34, 139, 230);
    transition: all 0.17s ease;
    :hover {
      transform: scale(1.15);
    }
  }

  p {
    font-weight: 400;
    font-size: 130%;
    margin: -5px 5px;
    color: rgb(34, 139, 230);
  }
`;

export default DeleteButton;
