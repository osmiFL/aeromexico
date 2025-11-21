import React, {useState} from 'react';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';
import CalendarIconSvg from '../../assets/calendar-icon.svg';

const Container = styled.View`
  margin-bottom: 24px;
`;

const Label = styled.Text`
  font-size: 13px;
  color: #666666;
  margin-bottom: 8px;
`;

const InputContainer = styled.TouchableOpacity`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background-color: #ffffff;
`;

const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DateText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
`;

const IconContainer = styled.View`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

interface SelectDateProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
}

const formatDate = (date: Date): string => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayName = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${dayName}, ${month} ${day}`;
};

export const SelectDate: React.FC<SelectDateProps> = ({
  value: controlledValue,
  onChange,
  placeholder = 'Select date',
}) => {
  const [internalValue, setInternalValue] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const value = controlledValue ?? internalValue;

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        if (onChange) {
          onChange(selectedDate);
        } else {
          setInternalValue(selectedDate);
        }
      }
    } else {
      if (event.type === 'dismissed') {
        setShowPicker(false);
      } else if (selectedDate) {
        if (onChange) {
          onChange(selectedDate);
        } else {
          setInternalValue(selectedDate);
        }
      }
    }
  };

  const handlePress = () => {
    setShowPicker(true);
  };

  return (
    <Container>
      <InputContainer onPress={handlePress}>
        <Label>Date of departure</Label>
        <ContentRow>
          <DateText>{formatDate(value)}</DateText>
          <IconContainer>
            <CalendarIconSvg width={20} height={20} fill="#666666" />
          </IconContainer>
        </ContentRow>
      </InputContainer>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </Container>
  );
};

