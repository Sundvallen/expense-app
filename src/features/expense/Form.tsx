import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { Input, Textarea, Button } from "@mantine/core";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { Expense } from "./expenseSlice";

interface ExpenseFormType {
  onSubmit: (any, string?) => void;
  defaultValues?: Partial<Expense>;
}

const ExpenseForm = ({ onSubmit, defaultValues }: ExpenseFormType) => {
  const { name, amount, note } = defaultValues ?? {};

  const defaultValuesForm = {
    name: name || "",
    amount: amount || "",
    note: note || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: defaultValuesForm });

  const [date, setDate] = useState(null);

  // Manually register name of input, "react-number-format does not support ref prop"
  useEffect(() => {
    setDate(
      defaultValues ? dayjs(defaultValues.createdAt).toDate() : new Date()
    );
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* EXPENSE NAME */}
      <Input
        sx={{ padding: 5 }}
        placeholder="name"
        {...register("name", { required: true })}
      />
      <Input
        type="number"
        sx={{ padding: 5 }}
        placeholder="amount"
        {...register("amount", { required: true })}
      />
      <Textarea
        sx={{ padding: 5 }}
        placeholder="note"
        rows={4}
        {...register("note")}
      />
      <Button
        sx={{ marginTop: 15, marginLeft: 5 }}
        leftIcon={<Check size={20} />}
        type="submit"
        variant="outline"
        color="green"
      >
        Save
      </Button>
    </form>
  );
};

export default ExpenseForm;
