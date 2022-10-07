import React from "react";
import { Skeleton } from "@mantine/core";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  border-top: 1px solid #dee2e6;
  padding: 12px;
  max-width: 800px;

  .select {
    margin-right: 50px;
  }
  .name {
    margin-right: 100px;
  }
  .amount {
    margin-right: 80px;
  }
  .date {
    margin-right: 60px;
  }
`;

const Head = styled.div`
  max-width: 800px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
`;
const TableSkeleton = () => {
  // Setup row
  const row = () => {
    return (
      <Row>
        <Skeleton className="data select" width={20} height={20} radius="sm" />
        <Skeleton className="data name" width={100} height={20} radius="sm" />
        <Skeleton className="data amount" width={70} height={20} radius="sm" />
        <Skeleton className="data date" width={90} height={20} radius="sm" />
        <Skeleton className="data note" width={150} height={20} radius="sm" />
      </Row>
    );
  };

  // Setting up render funtion for head
  const renderTableHead = () => (
    <Head>
      <Skeleton className="search" width={100} height={42} radius="sm" />
      <Skeleton className="datePicker" width={280} height={42} radius="sm" />
    </Head>
  );

  // Setting up render function for rows
  const renderTableRows = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(row());
    }
    //Returns JSX of rows
    return <>{rows.map((row) => row)}</>;
  };

  return (
    <>
      {renderTableHead()}
      {renderTableRows()}
    </>
  );
};

export default TableSkeleton;
