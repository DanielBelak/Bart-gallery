import React from "react";
import styled from "styled-components";

const ContainerDiv = styled.div`
  width: 1250px;
  max-width: 90%;
  margin: 0 auto;
  height: 100%;
  position: relative;

  @media (max-width: 885px) {
    width: 590px;
  }
  @media (max-width: 440px) {
    width: 250px;
    max-width: 80%;
  }
`;

export const Container = ({ children }) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};
