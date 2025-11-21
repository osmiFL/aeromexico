import React from 'react';
import styled from 'styled-components/native';

const StyledTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 8px;
  text-align: center;
`;

interface TitleProps {
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({children}) => {
  return <StyledTitle>{children}</StyledTitle>;
};

