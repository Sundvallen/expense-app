import React from "react";
import { useDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { List } from "phosphor-react";
import styled from "styled-components";
import { Drawer } from "@mantine/core";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const onClickLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container>
      <ButtonContainer onClick={onClickLogout}></ButtonContainer>
      {/* Drawer */}
      {/* <List
        className="button"
        onClick={() => setOpen(true)}
        size={40}
        color="white"
        weight="regular"
      />
      <Drawer
        position="right"
        opened={open}
        onClose={() => setOpen(false)}
        title="Drawer"
        size="sm"
      ></Drawer> */}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  right: 25px;
  top: 20px;
`;

const ButtonContainer = styled.div`
  backdrop-filter: invert(100%) saturate(0%) brightness(2.5);
  height: 35px;
  width: 35px;
  mask-image: url(./signout.svg);
  .button {
    color: white;
    :hover {
      cursor: pointer;
    }
  }
`;

export default Navbar;
