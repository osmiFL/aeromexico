import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../store/store';
import {Link} from './Link';
import CalendarIconSvg from '../../assets/calendar-icon.svg';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: #ffffff;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const BackIcon = styled.Text`
  font-size: 32px;
  color: #000000;
  font-weight: 300;
`;

const RightSection = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const FlightNumberText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 4px;
`;

const DateRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: #000000;
  margin-right: 8px;
`;

const Divider = styled.View`
  width: 1px;
  height: 14px;
  background-color: #000000;
  margin-right: 8px;
`;

const IconContainer = styled.View`
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`;

interface HeaderFlightNumberProps {
  onDateChangePress?: () => void;
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

export const HeaderFlightNumber: React.FC<HeaderFlightNumberProps> = ({
  onDateChangePress,
}) => {
  const navigation = useNavigation();
  const flightNumber = useAppSelector(state => state.flight.flightNumber);
  const dateString = useAppSelector(state => state.flight.date);
  const origin = useAppSelector(state => state.flight.origin);
  const destination = useAppSelector(state => state.flight.destination);
  const searchType = useAppSelector(state => state.flight.searchType);

  const date = dateString ? new Date(dateString) : new Date();
  const formattedDate = formatDate(date);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const getFlightDisplay = () => {
    if (searchType === 'destination' && origin && destination) {
      return `${origin} → ${destination}`;
    }
    return `AM ${flightNumber}`;
  };

  return (
    <Container>
      <BackButton onPress={handleBack}>
        <BackIcon>‹</BackIcon>
      </BackButton>

      <RightSection>
        <FlightNumberText>{getFlightDisplay()}</FlightNumberText>
        <DateRow>
          <DateText>{formattedDate}</DateText>
          <Divider />
          <IconContainer>
            <CalendarIconSvg width={16} height={16} fill="#000000" />
          </IconContainer>
          <Link onPress={onDateChangePress}>Change</Link>
        </DateRow>
      </RightSection>
    </Container>
  );
};

