import React from "react";
import { useSelector } from "../../app/hooks";
import styled from "styled-components";

export const ExpensesSummary = () => {
  const { info } = useSelector((state) => state.expense);

  return (
    <Container>
      <h1>{info.showingMsg}</h1>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 5%;

  h1 {
    text-align: center;
    font-size: 250%;
    overflow-wrap: break-word;
    font-weight: 200;
  }

  @media (max-width: 768px) {
    width: 100%;

    h1 {
      font-size: 180%;
    }
  }
  margin: 0 auto;
`;

export default ExpensesSummary;
