import React from 'react';
import styled from 'styled-components/native';

const StyledSubText = styled.Text`
  font-size: 16px;
  color: #333333;
  margin-bottom: 8px;
`;

interface SubTextProps {
  children: React.ReactNode;
}

export const SubText: React.FC<SubTextProps> = ({children}) => {
  return <StyledSubText>{children}</StyledSubText>;
};

