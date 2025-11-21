import React, {useState} from 'react';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {Title, Text, TabView, TabType} from '../components';
import {SearchByNumberScreen} from './SearchByNumberScreen';
import {SearchByDestinationScreen} from './SearchByDestinationScreen';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin-top: 50px;
`;

const HeaderContainer = styled.View`
  align-items: center;
  background-color: rgb(240, 240, 240);

`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 24px 20px;
`;

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState<TabType>('flightNumber');

  const handleDestinationPress = () => {
    setActiveTab('destination');
  };

  const handleFlightNumberPress = () => {
    setActiveTab('flightNumber');
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>Track your flight</Title>
        <Text>Keep you informed in real time!</Text>
      </HeaderContainer>
      <TabView activeTab={activeTab} onTabChange={setActiveTab} />
      <ContentContainer>
        {activeTab === 'flightNumber' && (
          <SearchByNumberScreen onDestinationPress={handleDestinationPress} />
        )}
        {activeTab === 'destination' && (
          <SearchByDestinationScreen onFlightNumberPress={handleFlightNumberPress} />
        )}
      </ContentContainer>
    </Container>
  );
};
