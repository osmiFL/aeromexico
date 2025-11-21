import React from 'react';
import styled from 'styled-components/native';
import {ScrollView, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useFlightDetailsViewModel} from '../viewmodel/useFlightDetailsViewModel';
import {FlightCard, HeaderFlightNumber} from '../components';
import {useAppDispatch} from '../store/store';
import {setSelectedFlight} from '../slices/FlightSlice';

type FlightResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FlightResult'
>;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin-top: 50px;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 24px 20px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const FlightResultScreen: React.FC<FlightResultScreenProps> = ({
  navigation,
}) => {
  const {flightCards, loading} = useFlightDetailsViewModel();
  const dispatch = useAppDispatch();

  const handleDetailsPress = (card: typeof flightCards[0]) => {
    dispatch(
      setSelectedFlight({
        status: card.status,
        departureTime: card.departureTime,
        departureAirport: card.departureAirport,
        arrivalTime: card.arrivalTime,
        arrivalAirport: card.arrivalAirport,
        arrivalGate: card.arrivalGate,
        boardingTime: card.boardingTime,
        boardingTerminal: card.boardingTerminal,
        arrivalTerminal: card.arrivalTerminal,
        boardingGate: card.boardingGate,
      }),
    );
    navigation.navigate('FlightDetails');
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#000000" />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderFlightNumber />
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        keyboardShouldPersistTaps="handled">
        {flightCards.map((card, index) => (
          <FlightCard
            key={index}
            status={card.status}
            departureTime={card.departureTime}
            departureAirport={card.departureAirport}
            arrivalTime={card.arrivalTime}
            arrivalAirport={card.arrivalAirport}
            duration={card.duration}
            flightNumber={card.flightNumber}
            onDetailsPress={() => handleDetailsPress(card)}
          />
        ))}
      </ScrollContainer>
    </Container>
  );
};

