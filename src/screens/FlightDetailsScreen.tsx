import React from 'react';
import styled from 'styled-components/native';
import {ImageBackground, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {FlightDetailsBottomSheet} from '../components/FlightDetailsBottomSheet';
import {useAppSelector} from '../store/store';

type FlightDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FlightDetails'
>;

const Container = styled.View`
  flex: 1;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const BottomSheet = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px 20px;
  max-height: 70%;
  min-height: 55%;
`;

const BottomSheetContent = styled.View`
  flex: 1;
`;

const BackButtonContainer = styled.View`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 10;
`;

const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #ffffff;
  border: 1px solid #000000;
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled.Text`
  font-size: 24px;
  color: #000000;
  font-weight: 300;
`;

export const FlightDetailsScreen: React.FC<FlightDetailsScreenProps> = () => {
  const navigation = useNavigation();
  const selectedFlight = useAppSelector(state => state.flight.selectedFlight);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (!selectedFlight) {
    return null;
  }

  return (
    <Container>
      <BackgroundImage
        source={require('../../assets/photo.jpg')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover">
        <BackButtonContainer>
          <BackButton onPress={handleBack}>
            <BackIcon>‹</BackIcon>
          </BackButton>
        </BackButtonContainer>
        <BottomSheet>
          <BottomSheetContent>
            <FlightDetailsBottomSheet
              status={selectedFlight.status}
              departureTime={selectedFlight.departureTime}
              departureAirport={selectedFlight.departureAirport}
              arrivalTime={selectedFlight.arrivalTime}
              arrivalAirport={selectedFlight.arrivalAirport}
              arrivalGate={selectedFlight.arrivalGate}
              boardingTime={selectedFlight.boardingTime}
              boardingTerminal={selectedFlight.boardingTerminal}
              arrivalTerminal={selectedFlight.arrivalTerminal}
              boardingGate={selectedFlight.boardingGate}
            />
          </BottomSheetContent>
        </BottomSheet>
      </BackgroundImage>
    </Container>
  );
};

