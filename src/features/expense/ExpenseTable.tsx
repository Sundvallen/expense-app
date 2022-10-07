import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector, useDispatch } from "../../app/hooks";
import "regenerator-runtime/runtime"; //Needs to be imported or "useAsyncDebounce will cause an error"
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useBlockLayout,
} from "react-table";
import { SortAscending, SortDescending } from "phosphor-react";
import { Table } from "@mantine/core";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import styled from "styled-components";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import currency from "currency.js";
import TableSkeleton from "./TableSkeleton";
import TableFilters from "./TableFilters";
import { getMsg, getSum } from "../../common/utilities/expensesInfo";
import { Expense, updateInfo } from "./expenseSlice";
import ExpenseItemButtons from "./ItemButtons";
import DeleteButton from "./DeleteButton";
import TablePagination from "./TablePagination";
import useWindowDimensions from "../../common/hooks/useWindowDimensions";

dayjs.extend(localizedFormat);

const renderAmount = (value): string => {
  return `${currency(value).format()}`;
};

const DateCell = ({ value }) => {
  return <div>{dayjs(value).format("MMM. D, YYYY")}</div>;
};

const AmountCell = ({ value }) => {
  return <div>{renderAmount(value)}</div>;
};

export const ExpenseTable = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);
  const loading = useSelector((state) => state.auth.loading);
  const [dateRange, setDateRange] = useState(undefined);
  const [textValue, setTextValue] = useState("");
  const { width } = useWindowDimensions();
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    if (width < 800) {
      setNarrow(true);
    } else {
      if (!narrow) {
        return;
      } else {
        setNarrow(false);
      }
    }
  }, [width]);

  useEffect(() => {
    setFilter("date", dateRange);
  }, [dateRange]);
  useEffect(() => {
    setFilter("expense", textValue);
  }, [textValue]);

  // Get Array of data
  const dataRows = useMemo(() => {
    return Object.values(expenses).map((expense: Expense) => {
      return {
        expense: expense.name,
        amount: expense.amount,
        date: expense.createdAt,
        note: expense.note,
        id: expense.id,
      };
    });
  }, [expenses]);

  const columns = React.useMemo(() => {
    return [
      {
        Header: "Expense",
        minWidth: !narrow ? 200 : false,
        width: narrow ? 75 : false,
        accessor: "expense",
      },
      {
        Header: "Amount",
        width: !narrow ? 150 : 100,
        Cell: AmountCell,
        accessor: "amount",
      },
      {
        Header: "Date",
        minWidth: 150,
        accessor: "date",
        Cell: DateCell,
        filter: "dateRange",
      },
      {
        Header: "Note",
        minWidth: 100,
        accessor: "note",
      },
      {
        Header: "Id",
        accessor: "id",
      },
    ];
  }, [narrow]);

  //  Date Range goes here?
  const filterTypes = React.useMemo(
    () => ({
      dateRange: (rows, id, filterValue) => {
        return rows.filter(
          (row) =>
            row.original.date > filterValue[0] &&
            row.original.date < filterValue[1]
        );
      },
    }),
    []
  );

  const table = useTable(
    {
      columns,
      data: dataRows,
      initialState: { pageIndex: 0, pageSize: 10 },
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useBlockLayout,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection", // Checkboxes for selecting expenses
          width: 70,
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns, // Rendered Columns + data
        {
          width: 75,
          id: "expense-options", // Icon column that shows when hovering over expense
          Header: () => <div></div>,
          Cell: ({ row }) => (
            <ExpenseItemButtons
              className="expense-options-icons"
              id={row.original.id}
            />
          ),
        },
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns,
    setHiddenColumns,
    toggleAllRowsSelected,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    filteredRows,
    setFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = table;

  useEffect(() => {
    if (narrow) {
      setHiddenColumns(["id", "note"]);
      return;
    }
    setHiddenColumns(["id"]);
  }, [narrow]);

  useEffect(() => {
    const expenseSum = getSum(filteredRows);
    const showingMsg = getMsg(dateRange);
    dispatch(updateInfo({ expenseSum, showingMsg }));
  }, [filteredRows]);

  return (
    <Container>
      {Object.keys(expenses).length === 0 && <TableSkeleton />}
      <Table highlightOnHover verticalSpacing="sm" {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                maxWidth: "100vw",
                textAlign: "left",
                display: "flex",
              }}
            >
              <TableFilters
                count={preGlobalFilteredRows.length}
                dateRange={dateRange}
                setDateRange={setDateRange}
                setTextValue={setTextValue}
              />
              {Object.keys(selectedRowIds).length !== 0 && (
                <DeleteButton
                  toggleSelected={toggleAllRowsSelected}
                  ids={Object.keys(selectedRowIds).map(
                    (key) => dataRows[key].id
                  )}
                />
              )}
            </th>
          </tr>

          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div style={{ display: "inline-flex" }}>
                    <span>{column.render("Header")}</span>
                    <span
                      style={{
                        marginLeft: "60px",
                        position: "absolute",
                      }}
                    >
                      {column.isSorted && (
                        <>
                          {!column.isSortedDesc && (
                            <SortDescending size={20} weight="light" />
                          )}
                          {column.isSortedDesc && (
                            <SortAscending size={20} weight="light" />
                          )}
                        </>
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <DataRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </DataRow>
            );
          })}
        </tbody>
      </Table>
      {/* Pagination Control */}
      {pageOptions.length > 1 && (
        <TablePagination
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          gotoPage={gotoPage}
          pageCount={pageCount}
        />
      )}
    </Container>
  );
};

export default ExpenseTable;

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
  min-height: 100vh;
  @media (max-width: 768px) {
    max-width: 768px;
  }
`;

const DataRow = styled.tr`
  .expense-options-icons {
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.17s ease-in-out;
  }
  :hover {
    .expense-options-icons {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
