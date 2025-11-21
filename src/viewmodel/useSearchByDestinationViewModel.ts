import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch} from '../store/store';
import {setDate, setOrigin, setDestination, setSearchType} from '../slices/FlightSlice';
import {RootStackParamList} from '../navigation/AppNavigator';
import {Airport} from '../components/SelectAirport';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useSearchByDestinationViewModel = (
  onFlightNumberPress?: () => void,
) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const [origin, setOriginLocal] = useState<Airport | null>(null);
  const [destination, setDestinationLocal] = useState<Airport | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSearch = () => {
    if (origin && destination) {
      dispatch(setOrigin(origin.code));
      dispatch(setDestination(destination.code));
      dispatch(setDate(selectedDate));
      dispatch(setSearchType('destination'));

      navigation.navigate('FlightResult');
    }
  };

  return {
    origin,
    setOrigin: setOriginLocal,
    destination,
    setDestination: setDestinationLocal,
    selectedDate,
    setSelectedDate,
    handleSearch,
    onFlightNumberPress,
  };
};

