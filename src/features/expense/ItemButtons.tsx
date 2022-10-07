import React from "react";
import { useDispatch, useSelector } from "../../app/hooks";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { openEditModal, removeExpense } from "./expenseSlice";
import styled from "styled-components";
import CustomButton from "../../common/components/CustomButton";
const ExpenseItemButtons = ({ id, className }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.user.uid);
  return (
    <ActionTableCell className={className}>
      <CustomButton
        color={"#fa5252"}
        phosphorIcon={TrashSimple}
        callback={() => dispatch(removeExpense({ uid, ids: [id] }))}
      />
      <CustomButton
        color={"rgb(34, 139, 230)"}
        phosphorIcon={PencilSimple}
        callback={() => dispatch(openEditModal(id))}
      />
    </ActionTableCell>
  );
};

const ActionTableCell = styled.div`
  padding: 0 2.5px;
  display: flex;
  flex-direction: row-reverse;
`;

export default ExpenseItemButtons;
