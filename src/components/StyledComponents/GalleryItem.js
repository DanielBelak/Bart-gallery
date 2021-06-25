import React from "react";
import styled from "styled-components";

const GalleryItemStyle = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  text-decoration: none;
  transform: translateY(-50%);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &:hover,
  &:focus {
    transform: translateY(-55%);
  }
`;

export const GalleryItem = ({ children, className, ...otherProps }) => {
  return (
    <GalleryItemStyle className={className} {...otherProps}>
      {children}
    </GalleryItemStyle>
  );
};
