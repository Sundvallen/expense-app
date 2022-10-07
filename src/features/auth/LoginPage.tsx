import React from "react";
import { useDispatch, useSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { login, loginGuest, setAuthUser } from "./authSlice";
import { Button } from "@mantine/core";
import styled from "styled-components";
import { getExpenses } from "../expense/expenseSlice";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const loginAuth = async () => {
    await dispatch(login());
    if (isLoggedIn) {
      navigate("/");
    }
  };

  const loginGuest = () => {
    dispatch(
      setAuthUser({
        isLoggedIn: true,
        displayName: "Guest",
        uid: "guest",
        error: "",
      })
    );
    dispatch(getExpenses({ uid: "guest" }));
    navigate("/");
  };

  return (
    <Container>
      <img src="./loginPic.jpg" alt="" />
      {/* <h1>Budget App</h1>
        <p>It's time to get your expenses under control.</p> */}
      <Modal>
        <h2>Welcome</h2>
        <Button onClick={loginAuth} radius="md" size="md">
          Log in
        </Button>
        <span>or</span>
        <Button
          onClick={loginGuest}
          variant="light"
          color="white"
          radius="md"
          size="md"
        >
          Log in as guest
        </Button>
      </Modal>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
  img {
    min-width: 100%;
    min-height: 100%;
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 300px;
  height: 300px;
  z-index: 9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 29px -6px rgba(0, 0, 0, 1);

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.47);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.1px);
  -webkit-backdrop-filter: blur(10.1px);

  h2 {
    color: white;
    margin-top: 70px;
    font-size: 170%;
    margin-bottom: auto;
    font-weight: 400;
    text-align: center;
  }

  span {
    text-align: center;
    padding-bottom: 2px;
  }
`;
