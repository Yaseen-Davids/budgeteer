import React from "react";
import styled from "styled-components";

import { CardType } from "../models/types";
import Pill from "./Pill";

import numeral from "numeral";

import moreicon from "../icons/more.svg";

type CardProps = {
  info: CardType;
};

const Card: React.FC<CardProps> = ({ info }) => {
  if (info.paid) {
    return (
      <CardWrapper style={{ backgroundColor: "#e5e2e2", boxShadow: "none" }}>
        <Indicator type={"paid"} />
        <Content>
          <div></div>
          <ContentCenter>
            <DateWrapper>Jun 27</DateWrapper>
            <NameWrapper>{info.name}</NameWrapper>
            <div>
              <p>{`R ${numeral(info.label).format("0,0.00")}`}</p>
            </div>
          </ContentCenter>
          <ContentBottom></ContentBottom>
        </Content>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper>
      <Indicator type={info.type} />
      <Content>
        <CheckboxWrapper>
          <input type="checkbox" />
          <img src={moreicon} style={{ width: "20px" }} />
        </CheckboxWrapper>
        <ContentCenter>
          <DateWrapper>Jun 27</DateWrapper>
          <NameWrapper>{info.name}</NameWrapper>
          <Pill
            type={info.type as "expense" | "income"}
            display={`R ${numeral(info.label).format("0,0.00")}`}
          />
        </ContentCenter>
        <ContentBottom></ContentBottom>
      </Content>
    </CardWrapper>
  );
};

const CardWrapper = styled.article`
  position: relative;
  margin-bottom: 10px !important;
  width: 100%;
  display: grid;
  grid-template-columns: 5px 1fr;
  border-radius: 5px;
  height: 90px;
  box-shadow: 2px 2px 10px #cecece;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
`;

const Indicator = styled.div`
  background-color: ${(props: { type: string }) =>
    props.type == "expense"
      ? "#dd1d1d"
      : props.type == "income"
      ? "#05AD2A"
      : "#a3a3a3"};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  input {
    background-color: #ebebeb;
    border: none;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 90px;
`;

const ContentCenter = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr max-content;
  gap: 10px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
`;

const NameWrapper = styled.div`
  color: #1f1f1f;
  cursor: text;
`;

const DateWrapper = styled.div`
  color: #1f1f1f;
  text-align: center;
  line-height: 18px;
  font-size: 13px;
  cursor: text;
`;

const ContentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default Card;
