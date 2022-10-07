import React from "react";
import { Button } from "@mantine/core";
import styled from "styled-components";
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "phosphor-react";

const PageButton = (props) => {
  const { onClick, disabled } = props;
  return (
    <Button onClick={onClick} disabled={disabled} variant="outline" size="xs">
      {props.children}
    </Button>
  );
};

const TablePagination = (props) => {
  const {
    pageIndex,
    pageOptions,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    pageCount,
    gotoPage,
  } = props;

  return (
    <Container>
      <p>{`Page ${pageIndex + 1} of ${pageOptions.length}`}</p>
      <PageButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <CaretDoubleLeft size={20} weight="fill" />
      </PageButton>
      <PageButton onClick={() => previousPage()} disabled={!canPreviousPage}>
        <CaretLeft size={20} weight="fill" />
      </PageButton>
      <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
        <CaretRight size={20} weight="fill" />
      </PageButton>
      <PageButton
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        <CaretDoubleRight size={20} weight="fill" />
      </PageButton>
    </Container>
  );
};

export default TablePagination;

const Container = styled.div`
  display: flex;
  p {
    margin: 7px 20px;
  }

  button {
    margin: 2px;
  }
`;
