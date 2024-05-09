import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";

function TableComponent({ model, keyIndex }) {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const rows = model.tableData.split("\n").map((row) => row.split(","));

  const isFirstRowHeader = model.isFirstRowHeader;

  const headers = isFirstRowHeader ? rows.shift() : null;

  const sortRows = (columnIndex) => {
    const sortedRows = [...rows];
    sortedRows.sort((a, b) => {
      const aValue = a[columnIndex] || "";
      const bValue = b[columnIndex] || "";
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    return sortedRows;
  };

  const handleSort = (columnIndex) => {
    if (sortedColumn === columnIndex) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnIndex);
      setSortOrder("asc");
    }
  };

  return (
    <Container key={keyIndex}>
      <h2>{model.title}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers &&
              headers.map((header, index) => (
                <th key={index} onClick={() => model.isSortable && handleSort(index)}>
                  {header}
                  {model.isSortable && sortedColumn === index && (sortOrder === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sortRows(sortedColumn).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableComponent;
