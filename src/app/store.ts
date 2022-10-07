import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import expenseReducer from "../features/expense/expenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
  },
});

export default store;
// Rootstate and dispatch type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
