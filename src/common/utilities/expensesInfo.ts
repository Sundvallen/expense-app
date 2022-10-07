import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export const getSum = (expenseArr) => {
  let sum = 0;
  Object.values(expenseArr).forEach((expense: any) => {
    sum += expense.original.amount;
  });
  return sum;
};

export const getMsg = (dateRange) => {
  if (dateRange) {
    const fromDate = dayjs(dayjs(dateRange[0])).format("MMM D, YYYY");
    const toDate = dayjs(dayjs(dateRange[1])).format("MMM D, YYYY");
    return `Showing Expenses from ${fromDate} to ${toDate}`;
  } else {
    return "Showing Expenses";
  }
};
