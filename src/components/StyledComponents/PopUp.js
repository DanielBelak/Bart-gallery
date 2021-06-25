import React from "react";
import styled from "styled-components";

const PopUpSection = styled.section`
  width: 760px;
  max-width: 85%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: 400ms ease-in-out;
  &.active {
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const PopUp = ({ children, className }) => {
  return <PopUpSection className={className}>{children}</PopUpSection>;
};
