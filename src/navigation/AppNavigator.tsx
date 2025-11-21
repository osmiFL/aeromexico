import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {FlightResultScreen} from '../screens/FlightResultScreen';
import {FlightDetailsScreen} from '../screens/FlightDetailsScreen';
import {FlightStatus} from '../components/StatusLabel';

export type RootStackParamList = {
  Home: undefined;
  FlightResult: undefined;
  FlightDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="FlightResult"
          component={FlightResultScreen}
        />
        <Stack.Screen
          name="FlightDetails"
          component={FlightDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

