import React, {useState, useRef} from 'react';
import styled from 'styled-components/native';
import {TextInput, StyleSheet} from 'react-native';

const Container = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 13px;
  color: #666666;
  margin-bottom: 8px;
`;

const InputContainer = styled.TouchableOpacity`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 12px;
  background-color: #ffffff;
`;

const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Prefix = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #999999;
  margin-right: 8px;
`;

const inputStyles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    padding: 0,
  },
});

interface SelectFlightProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export const SelectFlight: React.FC<SelectFlightProps> = ({
  value: controlledValue,
  onChangeText,
  placeholder = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const value = controlledValue ?? internalValue;

  const handleChangeText = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 3);
    
    if (onChangeText) {
      onChangeText(numericText);
    } else {
      setInternalValue(numericText);
    }
  };

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  const displayValue = value || '';

  return (
    <Container>
      <InputContainer onPress={handleContainerPress} activeOpacity={1}>
        <Label>Flight number</Label>
        <ContentRow>
          <Prefix>AM</Prefix>
          <TextInput
            ref={inputRef}
            style={inputStyles.input}
            value={displayValue}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor="#999999"
            keyboardType="numeric"
            maxLength={3}
            underlineColorAndroid="transparent"
          />
        </ContentRow>
      </InputContainer>
    </Container>
  );
};

