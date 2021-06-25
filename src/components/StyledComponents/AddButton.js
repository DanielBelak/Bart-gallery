import React from "react";
import styled from "styled-components";

const AddButtonStyle = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #43c68c;
  color: white;
  font-size: 1.6rem;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  border-radius: 5px;
  text-transform: uppercase;
  img {
    padding-right: 0.5em;
  }
`;

export const AddButton = ({ children, className }) => {
  return <AddButtonStyle className={className}>{children}</AddButtonStyle>;
};
