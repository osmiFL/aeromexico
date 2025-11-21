import React from 'react';
import styled from 'styled-components/native';

export type FlightStatus = 'ARRIVED' | 'ON_TIME' | 'DELAYED' | 'IN_THE_AIR';

interface StatusLabelProps {
  status: FlightStatus;
}

const getStatusConfig = (status: FlightStatus) => {
  switch (status) {
    case 'ARRIVED':
      return {
        text: 'Arrived',
        backgroundColor: '#000000',
        textColor: '#ffffff',
      };
    case 'ON_TIME':
      return {
        text: 'On Time',
        backgroundColor: '#4caf50',
        textColor: '#ffffff',
      };
    case 'DELAYED':
      return {
        text: 'Delayed',
        backgroundColor: '#ffeb3b',
        textColor: '#000000',
      };
    case 'IN_THE_AIR':
    default:
      return {
        text: 'In the air',
        backgroundColor: '#2196f3',
        textColor: '#ffffff',
      };
  }
};

const LabelContainer = styled.View<{
  backgroundColor: string;
}>`
  background-color: ${props => props.backgroundColor};
  padding: 8px 16px;
  border-radius: 12px 0 20px 0;
  align-self: flex-start;
`;

const LabelText = styled.Text<{
  textColor: string;
}>`
  color: ${props => props.textColor};
  font-size: 14px;
  font-weight: bold;
`;

export const StatusLabel: React.FC<StatusLabelProps> = ({status}) => {
  const config = getStatusConfig(status);

  return (
    <LabelContainer backgroundColor={config.backgroundColor}>
      <LabelText textColor={config.textColor}>{config.text}</LabelText>
    </LabelContainer>
  );
};

