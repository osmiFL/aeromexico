import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: #000000;
  border-radius: 12px;
  padding: 16px 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onPress,
  disabled = false,
}) => {
  return (
    <Button onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

