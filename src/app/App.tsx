import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExpenseDashboardPage from "../features/expense/Dashboard";
import { auth } from "../firebase/firebase";
import LoginPage from "../features/auth/LoginPage";
import { useNavigate, useLocation } from "react-router-dom";
import NotFoundPage from "../common/components/NotFoundPage";
import { useDispatch, useSelector } from "./hooks";
import { getExpenses } from "../features/expense/expenseSlice";
import { setAuthUser, setLoading } from "../features/auth/authSlice";

const AppRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  useEffect(() => {
    // Auth functionality
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName } = user;
        dispatch(
          setAuthUser({
            isLoggedIn: true,
            displayName,
            uid,
            error: "",
          })
        );
        dispatch(getExpenses({ uid: user.uid }));
        if (location.pathname === "/") {
          navigate("/");
        }
      } else {
        console.log("redirecting");
        navigate("/login");
      }
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 200);
    });
  }, []);

  return (
    <div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: "99",
            height: "100%",
            width: "100%",
            backgroundColor: "white",
          }}
        ></div>
      )}
      <Routes>
        <Route path="/" element={<ExpenseDashboardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/*" element={<ExpenseDashboardPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
