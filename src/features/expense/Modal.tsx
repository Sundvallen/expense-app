import React from "react";
import { useDispatch, useSelector } from "../../app/hooks";
import ExpenseForm from "./Form";
import { addExpense, editExpense, closeModal } from "./expenseSlice";
import dayjs from "dayjs";
import { Modal } from "@mantine/core";

const ExpenseModal = () => {
  const dispatch = useDispatch();
  const { open, defaultValues } = useSelector(
    (state) => state.expense.expenseModal
  );
  const uid = useSelector((state) => state.auth.user.uid);

  const onSubmitAdd = (data) => {
    dispatch(
      addExpense({
        expense: {
          name: data.name,
          amount: parseInt(data.amount),
          createdAt: dayjs().valueOf(),
          note: data.note,
        },
        uid,
      })
    );
    dispatch(closeModal());
  };

  const onSubmitEdit = (data, id) => {
    dispatch(
      editExpense({
        updates: {
          name: data.name,
          amount: parseInt(data.amount),
          note: data.note,
        },
        id,
        uid,
      })
    );
    dispatch(closeModal());
  };

  return (
    <Modal
      opened={open}
      onClose={() => dispatch(closeModal())}
      centered
      title={`${defaultValues ? "Edit Expense" : "Add New Expense"}`}
    >
      {/* Render Edit Form if defaultValues exist */}
      {defaultValues ? (
        <ExpenseForm
          defaultValues={defaultValues}
          onSubmit={(data) => onSubmitEdit(data, defaultValues.id)}
        />
      ) : (
        <ExpenseForm onSubmit={(data) => onSubmitAdd(data)} />
      )}
    </Modal>
  );
};

export default ExpenseModal;
