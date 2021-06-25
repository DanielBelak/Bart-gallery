import React from "react";
import styled from "styled-components";

const CloseButtonDiv = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: white;
  border: none;
  background-color: transparent;
  img {
    padding-right: 0.5em;
  }
`;

export const CloseButton = ({ children }) => {
  return <CloseButtonDiv>{children}</CloseButtonDiv>;
};
