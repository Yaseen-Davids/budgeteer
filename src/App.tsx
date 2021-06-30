import React, { useState, useEffect } from "react";

import "bulma/css/bulma.min.css";

import styled from "styled-components";

import Navbar from "./Components/Navbar";
import Column from "./Components/Column";
import { CardType, ColumnType } from "./models/types";

import { columnsData, rowsData } from "./data.json";

const App: React.FC<{}> = ({}) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [rows, setRows] = useState<CardType[]>([]);

  const loadData = () => {
    setColumns(columnsData);
    setRows(rowsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Navbar />
      <Columns>
        {columns.map((column, idx) => (
          <Column
            cards={rows.filter((item) => item.column_id == column.id)}
            column={column}
            columnIndex={idx}
          />
        ))}
      </Columns>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  max-height: 100vh;
  height: 100vh;
  grid-template-rows: 60px calc(100vh - 60px);
  overflow-y: hidden;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
  overflow-x: auto;
  gap: 5px;
  overflow-y: hidden;
`;

export default App;
