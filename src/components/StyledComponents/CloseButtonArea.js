import React from "react";
import styled from "styled-components";

const CloseButtonAreaStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 1em;
`;
export const CloseButtonArea = ({ children, ...otherProps }) => {
  return (
    <CloseButtonAreaStyle {...otherProps}>{children}</CloseButtonAreaStyle>
  );
};
