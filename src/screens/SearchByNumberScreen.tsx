import React from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import {
  SelectFlight,
  SelectDate,
  PrimaryButton,
  SubText,
  Link,
} from '../components';
import {useSearchByNumberViewModel} from '../viewmodel/useSearchByNumberViewModel';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const InputsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
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

interface SearchByNumberScreenProps {
  onDestinationPress?: () => void;
}

export const SearchByNumberScreen: React.FC<SearchByNumberScreenProps> = ({
  onDestinationPress,
}) => {
  const {
    flightNumber,
    setFlightNumber,
    selectedDate,
    setSelectedDate,
    handleSearch,
    onDestinationPress: onDestinationPressFromViewModel,
  } = useSearchByNumberViewModel(onDestinationPress);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <InputsContainer>
          <InputWrapper pointerEvents="box-none">
            <SelectFlight
              value={flightNumber}
              onChangeText={setFlightNumber}
            />
          </InputWrapper>
          <Spacer />
          <InputWrapper pointerEvents="box-none">
            <SelectDate value={selectedDate} onChange={setSelectedDate} />
          </InputWrapper>
        </InputsContainer>

        <PrimaryButton onPress={handleSearch}>Search Flight</PrimaryButton>

        <HelpContainer>
          <SubText>Can't find your flight number?</SubText>
          <HelpTextRow>
            <SubText>Try searching by </SubText>
            <Link onPress={onDestinationPressFromViewModel}>destination</Link>
          </HelpTextRow>
        </HelpContainer>
      </ScrollView>
    </Container>
  );
};

