import React, { useState, useEffect } from "react";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import styled from "styled-components";
import dayjs from "dayjs";

function DatePicker({ setDateRange, dateRange }) {
  const [value, setValue] = useState<DateRangePickerValue | undefined>(
    undefined
  );

  useEffect(() => {
    if (value && value[1]) {
      const dateRange = value.map((date) => dayjs(date).valueOf());
      setDateRange(dateRange);
      return;
    }
    if (dateRange) {
      setDateRange(undefined);
      return;
    }
  }, [value]);

  return (
    <Container>
      <DateRangePicker
        className="daterange"
        placeholder="Choose Dates"
        radius="md"
        inputFormat="D MMM YYYY"
        size="md"
        value={value}
        onChange={setValue}
      />
    </Container>
  );
}

export default DatePicker;

const Container = styled.div`
  margin-left: auto;
  margin-right: 0;
  width: 280px;
  .mantine-DateRangePicker-cell {
    padding: 0;
  }
`;
