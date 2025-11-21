import React from 'react';
import styled from 'styled-components/native';
import {StatusLabel, FlightStatus} from './StatusLabel';

const CardContainer = styled.View`
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  position: relative;
`;

const StatusLabelContainer = styled.View`
  align-self: flex-start;
  margin-start: -17px;
  margin-top: -17px;
`;

const TopSection = styled.View`
  margin-bottom: 16px;
`;

const FlightInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 8px;
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
  margin: 20px 0 0 -20px;
`;

const TimelineLine = styled.View`
  width: 100%;
  height: 2px;
  background-color: #000000;
  position: relative;
  margin-bottom: 8px;
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
  left: 0;
`;

const DotEnd = styled(TimelineDot)`
  right: -25;
`;

const AirplaneIcon = styled.Text`
  position: absolute;
  right: -15;
  top: -11px;
  font-size: 16px;
`;

const DurationText = styled.Text`
  font-size: 14px;
  color: #666666;
  text-align: center;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin: 0 0 5px 0;
`;

const BottomSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FlightNumberText = styled.Text`
  font-size: 16px;
  color: #000000;
`;

const DetailsLink = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  min-height: 44px;
  justify-content: center;
`;

const DetailsText = styled.Text`
  font-size: 16px;
  color: #000000;
  text-decoration-line: underline;
  margin-right: 4px;
`;

const ArrowIcon = styled.Text`
  font-size: 12px;
  color: #000000;
`;

export interface FlightCardProps {
  status: FlightStatus;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  duration: string;
  flightNumber: string;
  onDetailsPress?: () => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  status,
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  duration,
  flightNumber,
  onDetailsPress,
}) => {
  return (
    <CardContainer>
      <StatusLabelContainer>
        <StatusLabel status={status} />
      </StatusLabelContainer>

      <TopSection>
        <FlightInfoRow>
          <AirportInfo>
            <TimeText>{departureTime}</TimeText>
            <AirportCode>{departureAirport}</AirportCode>
          </AirportInfo>

          <TimelineContainer>
            <TimelineLine>
              <DotStart />
              <DotEnd />
              <AirplaneIcon>✈</AirplaneIcon>
            </TimelineLine>
            <DurationText>{duration}</DurationText>
          </TimelineContainer>

          <AirportInfoRight>
            <TimeText>{arrivalTime}</TimeText>
            <AirportCode>{arrivalAirport}</AirportCode>
          </AirportInfoRight>
        </FlightInfoRow>
      </TopSection>

      <Divider />

      <BottomSection>
        <FlightNumberText>{flightNumber}</FlightNumberText>
        <DetailsLink
          onPress={() => {
            console.log('DetailsLink pressed, onDetailsPress:', onDetailsPress);
            if (onDetailsPress) {
              onDetailsPress();
            }
          }}
          activeOpacity={0.7}>
          <DetailsText>Details</DetailsText>
          <ArrowIcon>›</ArrowIcon>
        </DetailsLink>
      </BottomSection>
    </CardContainer>
  );
};

