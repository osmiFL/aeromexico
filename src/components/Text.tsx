import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  font-size: 16px;
  color: #666666;
  margin-bottom: 24px;
  text-align: center;
`;

interface TextProps {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({children}) => {
  return <StyledText>{children}</StyledText>;
};

