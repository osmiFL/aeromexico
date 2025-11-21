import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

const StyledLinkText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  text-decoration-line: underline;
`;

interface LinkProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const Link: React.FC<LinkProps> = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <StyledLinkText>{children}</StyledLinkText>
    </TouchableOpacity>
  );
};

