import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { googleAuthProvider, auth } from "../../firebase/firebase";
import {
  query,
  collection,
  where,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { signInWithPopup, signOut } from "@firebase/auth";
import { getExpenses } from "../expense/expenseSlice";
// import { getExpenses } from "../expense/expenseSlice";

const addNewUserToFirestore = async (userRef, authUser) => {
  const { displayName, email, photoURL } = authUser;
  await setDoc(userRef, {
    user: { displayName, email, photoURL },
  });
};

export const login = createAsyncThunk(
  "auth/login",
  async (action, { dispatch }) => {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const { uid, displayName } = result.user;
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await addNewUserToFirestore(userRef, result.user);
    }
    return { displayName, uid };
  }
);

export const logout = createAsyncThunk("auth/logout", async (action) => {
  await signOut(auth);
});

interface AuthState {
  user: {
    isLoggedIn: boolean;
    displayName: string | null;
    uid: any;
    error: string;
  };
  loading: boolean;
}

const initialState: AuthState = {
  user: {
    isLoggedIn: false,
    displayName: null,
    uid: null,
    error: "",
  },
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    loginGuest: (state, action) => {
      state.user = {
        isLoggedIn: true,
        displayName: "Guest",
        uid: "guest",
        error: "",
      };
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { displayName, uid } = action.payload;
      state.user = {
        isLoggedIn: true,
        displayName,
        uid,
        error: "",
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user.error = "Could not log in";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {
        isLoggedIn: false,
        displayName: null,
        uid: undefined,
        error: "",
      };
    });
  },
});

export const { setLoading, loginGuest, setAuthUser } = authSlice.actions;

export default authSlice.reducer;
