import React from "react";

import styled from "styled-components";

type PillProps = {
  display: any;
  type: "expense" | "income";
};

const Pill: React.FC<PillProps> = ({ type, display }) => {
  return (
    <PillContainer type={type}>
      <p>{display}</p>
    </PillContainer>
  );
};

const PillContainer = styled.div`
  background-color: ${(props: { type: string }) =>
    props.type == "expense" ? "#feecf0" : "#effaf5"};
  color: ${(props: { type: string }) =>
    props.type == "expense" ? "#d63e5d" : "#64a186"};
  border-radius: 99px;
  font-size: 15px;
  height: 25px;
  max-height: 25px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: text;
`;

export default Pill;
