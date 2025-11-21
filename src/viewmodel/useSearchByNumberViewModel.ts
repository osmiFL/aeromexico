import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch} from '../store/store';
import {setFlightNumber, setDate, setSearchType} from '../slices/FlightSlice';
import {RootStackParamList} from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useSearchByNumberViewModel = (
  onDestinationPress?: () => void,
) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const [flightNumber, setFlightNumberLocal] = useState('300');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSearch = () => {
    const flightNumberNum = parseInt(flightNumber, 10) || 0;

    dispatch(setFlightNumber(flightNumberNum));
    dispatch(setDate(selectedDate));
    dispatch(setSearchType('flightNumber'));

    navigation.navigate('FlightResult');
  };

  return {
    flightNumber,
    setFlightNumber: setFlightNumberLocal,
    selectedDate,
    setSelectedDate,
    handleSearch,
    onDestinationPress,
  };
};

