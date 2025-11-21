import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {useAppSelector} from '../store/store';
import {StatusLabel, FlightStatus} from './StatusLabel';

const Container = styled.View`
  flex: 1;
`;

const GrabHandle = styled.View`
  width: 40px;
  height: 4px;
  background-color: #d0d0d0;
  border-radius: 2px;
  align-self: center;
  margin-bottom: 20px;
`;

const TopSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const LeftInfo = styled.View`
  flex: 1;
`;

const FlightNumberRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 4px;
`;

const CarrierCode = styled.Text`
  font-size: 20px;
  color: #999999;
  margin-right: 4px;
`;

const FlightNumber = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: #000000;
`;

const StatusButton = styled.View`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #000000;
`;

const StatusButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
`;

const BottomSection = styled.View`
  margin-top: 20px;
`;

const FlightInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const AirportInfo = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const AirportInfoRight = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const TimeText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 4px;
`;

const AirportCode = styled.Text`
  font-size: 16px;
  color: #000000;
`;

const TimelineContainer = styled.View`
  flex: 1;
  margin: 0 16px;
  align-items: center;
  justify-content: center;
    margin-top: 18px;
`;

const TimelineLine = styled.View`
  width: 100%;
  height: 2px;
  background-color: #000000;
  position: relative;

`;

const TimelineDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #000000;
  position: absolute;
  top: -3px;
`;

const DotStart = styled(TimelineDot)`
  left: -30px;
`;

const DotEnd = styled(TimelineDot)`
  right: 0;
`;

const AirplaneIcon = styled.Text`
  position: absolute;
  left: -15px;
  top: -10px;
  font-size: 16px;
`;

const FlightDetailsSection = styled.View`
  margin-top: 32px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 24px;
`;

const DetailSection = styled.View`
  margin-bottom: 24px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const SectionIconContainer = styled.View`
  margin-right: 8px;
`;

const SectionIcon = styled.Text`
  font-size: 16px;
`;

const iconRotatedStyle = StyleSheet.create({
  rotated45: {
    transform: [{rotate: '45deg'}],
  },
  rotatedMinus45: {
    transform: [{rotate: '-45deg'}],
  },
});

const SectionTitleText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  flex: 1;
`;

const SectionLocation = styled.Text`
  font-size: 14px;
  color: #999999;
`;

const InfoBox = styled.View`
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-around;
`;

const InfoItem = styled.View`
  align-items: center;
  flex: 1;
`;

const InfoLabel = styled.Text`
  font-size: 12px;
  color: #666666;
  margin-bottom: 8px;
`;

const InfoValue = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`;

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

export interface FlightDetailsBottomSheetProps {
  status: FlightStatus;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  arrivalGate: string;
  boardingTime: string;
  boardingTerminal: string;
  arrivalTerminal: string;
  boardingGate: string;
}

export const FlightDetailsBottomSheet: React.FC<
  FlightDetailsBottomSheetProps
> = ({
  status,
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  arrivalGate,
  boardingTime,
  boardingTerminal,
  arrivalTerminal,
  boardingGate,
}) => {
  const flightNumber = useAppSelector(state => state.flight.flightNumber);
  const dateString = useAppSelector(state => state.flight.date);
  const origin = useAppSelector(state => state.flight.origin);
  const destination = useAppSelector(state => state.flight.destination);
  const searchType = useAppSelector(state => state.flight.searchType);

  const date = dateString ? new Date(dateString) : new Date();
  const formattedDate = formatDate(date);

  const getFlightDisplay = () => {
    if (searchType === 'destination' && origin && destination) {
      return (
        <FlightNumberRow>
          <FlightNumber>{origin} → {destination}</FlightNumber>
        </FlightNumberRow>
      );
    }
    return (
      <FlightNumberRow>
        <CarrierCode>AM</CarrierCode>
        <FlightNumber>{flightNumber}</FlightNumber>
      </FlightNumberRow>
    );
  };

  return (
    <Container>
      <GrabHandle />
      <TopSection>
        <LeftInfo>
          {getFlightDisplay()}
          <DateText>{formattedDate}</DateText>
        </LeftInfo>
        <StatusLabel status={status} />
      </TopSection>

      <Divider />

      <BottomSection>
        <FlightInfoRow>
          <AirportInfo>
            <TimeText>{departureTime}</TimeText>
            <AirportCode>{departureAirport}</AirportCode>
          </AirportInfo>

          <TimelineContainer>
            <TimelineLine>
              <DotStart />
              <AirplaneIcon>✈</AirplaneIcon>
              <DotEnd />
            </TimelineLine>
          </TimelineContainer>

          <AirportInfoRight>
            <TimeText>{arrivalTime}</TimeText>
            <AirportCode>{arrivalAirport}</AirportCode>
          </AirportInfoRight>
        </FlightInfoRow>
      </BottomSection>

      <FlightDetailsSection>
        <SectionTitle>Flight details</SectionTitle>

        <DetailSection>
          <SectionHeader>
            <SectionIconContainer style={iconRotatedStyle.rotatedMinus45}>
              <SectionIcon>✈</SectionIcon>
            </SectionIconContainer>
            <SectionTitleText>Departure</SectionTitleText>
            <SectionLocation>Ciudad de México - AICM</SectionLocation>
          </SectionHeader>
          <InfoBox>
            <InfoItem>
              <InfoLabel>Terminal</InfoLabel>
              <InfoValue>{boardingTerminal}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Gate</InfoLabel>
              <InfoValue>{boardingGate}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Boarding</InfoLabel>
              <InfoValue>{boardingTime}</InfoValue>
            </InfoItem>
          </InfoBox>
        </DetailSection>

        <DetailSection>
          <SectionHeader>
            <SectionIconContainer style={iconRotatedStyle.rotated45}>
              <SectionIcon>✈</SectionIcon>
            </SectionIconContainer>
            <SectionTitleText>Arrival</SectionTitleText>
            <SectionLocation>Cancún - Terminal 4</SectionLocation>
          </SectionHeader>
          <InfoBox>
            <InfoItem>
              <InfoLabel>Terminal</InfoLabel>
              <InfoValue>{arrivalTerminal}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Est. Landing</InfoLabel>
              <InfoValue>{arrivalTime}</InfoValue>
            </InfoItem>
          </InfoBox>
        </DetailSection>
      </FlightDetailsSection>
    </Container>
  );
};

