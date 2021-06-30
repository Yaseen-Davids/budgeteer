import React, { useMemo } from "react";

import styled from "styled-components";
import { CardType, ColumnType } from "../models/types";

import Card from "./Card";

import numeral from "numeral";

import format from "date-fns/format";

type ColumnProps = {
  columnIndex: number;
  column: ColumnType;
  cards: CardType[];
};

const Column: React.FC<ColumnProps> = ({ cards, column, columnIndex }) => {
  const { remainingAmount, paidAmount, outstandingPayments } = useMemo(() => {
    return cards.reduce(
      (arr, val) => {
        if (!val.paid && val.type == "expense") {
          arr["outstandingPayments"] = arr["outstandingPayments"] + val.value;
        }
        if (val.paid) {
          arr["paidAmount"] = arr["paidAmount"] + val.value;
        }
        arr["remainingAmount"] = arr["remainingAmount"] + val.value;
        return arr;
      },
      {
        remainingAmount: 0,
        paidAmount: 0,
        outstandingPayments: 0,
      }
    );
  }, [cards]);

  return (
    <ColumnWrapper key={`column-${columnIndex}`}>
      <ColumnHeader>
        <h3>{format(new Date(column.date), "MMM yyyy")}</h3>
        <button
          className="button is-success is-light"
          style={{
            padding: "0px 15px",
            height: "fit-content",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          +
        </button>
      </ColumnHeader>
      <ColumnCards>
        {cards
          .sort((a, b) => (a.paid ? 1 : -1))
          .map((card, cardIdx) => (
            <Card key={`card-${cardIdx}`} info={card} />
          ))}
      </ColumnCards>
      <ColumnFooter>
        <ColumnFooterContent>
          <div>
            <p>Outstanding</p>
            <p>{numeral(outstandingPayments * -1).format("0,0.00")}</p>
          </div>
          <div>
            <p>Paid</p>
            <p>{numeral(paidAmount * -1).format("0,0.00")}</p>
          </div>
          <div>
            <p>Remaining</p>
            <p>{numeral(remainingAmount).format("0,0.00")}</p>
          </div>
        </ColumnFooterContent>
      </ColumnFooter>
    </ColumnWrapper>
  );
};

const ColumnWrapper = styled.div`
  border-right: 1px solid #888;
  /* background-color: #d3d3d3; */
  position: relative;
  height: 100%;
  min-width: 300px;
  position: relative;
  overflow: hidden;
`;

const ColumnHeader = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  h3 {
    font-weight: bold;
    font-size: 20px;
    color: #5a5a5a;
  }
`;

const ColumnCards = styled.div`
  position: relative;
  height: calc(100% - 135px);
  display: flex;
  flex-direction: column;
  padding: 5px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ColumnFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90px;
`;

const ColumnFooterContent = styled.div`
  padding: 10px;
  font-weight: bold;
  background-color: #888;
  color: white;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Column;
