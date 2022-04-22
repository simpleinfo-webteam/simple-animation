import React from "react";
import styled from "styled-components";

export interface ButtonProps {
  label: string;
  primary: boolean;
}

const Button = ({ label, ...rest }: ButtonProps) => {
  return <StyledButton {...rest}>{label}</StyledButton>;
};

const StyledButton = styled.button`
  line-height: 40px;
  border: 2px solid red;
  padding: 8px 16px;
`;

export default Button;
