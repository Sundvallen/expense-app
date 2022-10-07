import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import {
  query,
  collection,
  where,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
// import mockData from "../../mocks/mockData";

export interface Expense {
  name: string;
  amount: number;
  createdAt: any;
  note: string;
  id: string;
}

export type Expenses = {
  [key: string]: Expense;
};

interface Info {
  expenseSum: number;
  showingMsg: string;
}

interface StateProps {
  info: Info;
  expenses: Expenses;
  expenseModal: {
    open: boolean;
    defaultValues: Partial<Expense> | undefined;
  };
}

const initialState: StateProps = {
  expenses: {},
  expenseModal: {
    open: false,
    defaultValues: undefined,
  },
  info: {
    expenseSum: null,
    showingMsg: "Add an expense to get started",
  },
};

interface UserRef {
  expenses: Expense[];
  user: {
    displayName: string;
    email: string;
    photoURL: string;
  };
}

// Fallback for guest, returns thunks before calling DB
const guest = (uid) => uid === "guest";

export const getExpenses = createAsyncThunk<Expense[], { uid: string }>(
  "expense/getExpenses",
  async ({ uid }) => {
    const userRef = doc(db, "users", uid);
    const expensesRef = collection(userRef, "expenses");
    const expensesSnap = await getDocs(expensesRef);
    let expenses = [];
    expensesSnap.forEach((snap) => {
      expenses.push(snap.data());
    });
    return expenses;
  }
);
// { expense: Partial<Expense>, uid: string }
export const addExpense = createAsyncThunk<Expense, { expense: any; uid: any }>(
  "expense/addExpense",
  async (payload) => {
    const { expense, uid } = payload;
    const id = uuid();
    if (guest(uid)) return { ...expense, id };
    const colRef = collection(db, "users");
    const docRef = doc(colRef, `${uid}`);
    const res = await setDoc(doc(docRef, "expenses", id), { ...expense, id });
    return { ...expense, id };
  }
);

export const removeExpense = createAsyncThunk<
  any,
  { uid?: any; ids: string[] }
>("expense/removeExpense", async (payload) => {
  const { uid, ids } = payload;
  if (guest(uid)) return { ids };
  ids.forEach(async (id) => {
    const docRef = doc(db, `users/${uid}/expenses/${id}`);
    await deleteDoc(docRef);
  });
  return { ids };
});

export const editExpense = createAsyncThunk<
  { id: string; updates: Partial<Expense> },
  { id: string; uid: any; updates: Partial<Expense> }
>("expense/editExpense", async (payload) => {
  const { uid, id, updates } = payload;
  if (guest(uid)) return { id, updates };
  const expenseRef = doc(db, `users/${uid}/expenses`, id);
  await updateDoc(expenseRef, updates);
  return { id, updates };
});

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateInfo: (state, action) => {
      const { expenseSum, showingMsg } = action.payload;
      state.info = { expenseSum, showingMsg };
    },
    openAddModal: (state) => {
      state.expenseModal.open = true;
    },
    openEditModal: (state, action) => {
      state.expenseModal.open = true;
      state.expenseModal.defaultValues = state.expenses[action.payload];
    },
    closeModal: (state) => {
      state.expenseModal.open = false;
      state.expenseModal.defaultValues = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExpense.fulfilled, (state, { payload }) => {
      state.expenses[payload.id] = payload;
    });
    builder.addCase(removeExpense.fulfilled, (state, { payload }) => {
      const { ids } = payload;
      ids.forEach((id) => {
        delete state.expenses[id];
      });
    });
    builder.addCase(editExpense.fulfilled, (state, { payload }) => {
      const { id, updates } = payload;
      state.expenses[id] = { ...state.expenses[id], ...updates };
    });
    builder.addCase(getExpenses.fulfilled, (state, { payload }) => {
      payload.forEach((expense) => {
        state.expenses[expense.id] = expense;
      });
    });
  },
});

export const { updateInfo, openAddModal, openEditModal, closeModal } =
  expenseSlice.actions;

export default expenseSlice.reducer;
