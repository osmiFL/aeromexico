import React from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import {
  SelectAirport,
  SelectDate,
  PrimaryButton,
  SubText,
  Link,
  Airport,
} from '../components';
import {useSearchByDestinationViewModel} from '../viewmodel/useSearchByDestinationViewModel';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const InputsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const Spacer = styled.View`
  width: 12px;
`;

const InputWrapper = styled.View`
  flex: 1;
`;

const HelpContainer = styled.View`
  margin-top: 16px;
  align-items: center;
`;

const HelpTextRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

interface SearchByDestinationScreenProps {
  onFlightNumberPress?: () => void;
}

const airports: Airport[] = [
  {code: 'MEX', city: 'Mexico City'},
  {code: 'CUN', city: 'Cancún'},
  {code: 'LAX', city: 'Los Angeles'},
];

export const SearchByDestinationScreen: React.FC<
  SearchByDestinationScreenProps
> = ({onFlightNumberPress}) => {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    selectedDate,
    setSelectedDate,
    handleSearch,
    onFlightNumberPress: onFlightNumberPressFromViewModel,
  } = useSearchByDestinationViewModel(onFlightNumberPress);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <InputsContainer>
          <InputWrapper pointerEvents="box-none">
            <SelectAirport
              label="Origin"
              airports={airports}
              value={origin}
              onChange={setOrigin}
              placeholder="Select airport"
            />
          </InputWrapper>
          <Spacer />
          <InputWrapper pointerEvents="box-none">
            <SelectAirport
              label="Destination"
              airports={airports}
              value={destination}
              onChange={setDestination}
              placeholder="Select airport"
            />
          </InputWrapper>
        </InputsContainer>

        <SelectDate value={selectedDate} onChange={setSelectedDate} />

        <PrimaryButton onPress={handleSearch}>Search Flights</PrimaryButton>

        <HelpContainer>
          <SubText>Looking for a specific flight?</SubText>
          <HelpTextRow>
            <SubText>Try searching by </SubText>
            <Link onPress={onFlightNumberPressFromViewModel}>flight number</Link>
          </HelpTextRow>
        </HelpContainer>
      </ScrollView>
    </Container>
  );
};

