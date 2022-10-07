import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../../app/hooks";
import ExpenseTable from "./ExpenseTable";
import { useNavigate } from "react-router-dom";
import ExpensesSummary from "./Summary";
import { Button, Modal } from "@mantine/core";
import { Plus } from "phosphor-react";
import ExpenseModal from "./Modal";
import Header from "./Header";
import styled from "styled-components";
import { openAddModal } from "./expenseSlice";
import Navbar from "../../common/components/Navbar";

const ExpenseDashboardPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Navbar />
      <Header />
      {!loading && (
        <div>
          <ExpensesSummary />

          <ButtonContainer>
            <Button
              leftIcon={<Plus size={20} weight="bold" />}
              variant="outline"
              radius="md"
              size="md"
              onClick={() => dispatch(openAddModal())}
            >
              Add Expense
            </Button>
          </ButtonContainer>
          <ExpenseModal />
          <ExpenseTable />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    transition: transform 0.17s ease;
    :hover {
      transform: scale(1.1);
      border-width: 2px;
    }
    :focus {
      border: inherit;
    }
  }
`;

export default ExpenseDashboardPage;
