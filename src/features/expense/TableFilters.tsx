import React, { useState } from "react";
import { Input } from "@mantine/core";
import DatePicker from "./DatePicker";
import { MagnifyingGlass } from "phosphor-react";
import { useAsyncDebounce } from "react-table";
import styled from "styled-components";

const TableFilters = ({ dateRange, setDateRange, count, setTextValue }) => {
  const [value, setValue] = useState();
  const onTextChange = useAsyncDebounce((value) => {
    setTextValue(value || "");
  }, 200);

  return (
    <Container>
      <Input
        icon={<MagnifyingGlass size={24} weight="regular" />}
        variant="unstyled"
        placeholder={`${count} expenses...`}
        radius="md"
        size="md"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onTextChange(e.target.value);
        }}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />

      <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;

export default TableFilters;
