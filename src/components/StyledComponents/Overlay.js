import React from "react";
import styled from "styled-components";

const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0;
  pointer-events: none;
  transition: 400ms ease-in-out;
  &.active {
    opacity: 0.75;
    pointer-events: all;
  }
`;

export const Overlay = ({ children, className, ...otherProps }) => {
  return (
    <OverlayDiv className={className} {...otherProps}>
      {children}
    </OverlayDiv>
  );
};
