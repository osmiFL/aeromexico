import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FlightStatus} from '../components/StatusLabel';

export interface SelectedFlightData {
  status: FlightStatus;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  arrivalGate: string;
  boardingTime: string;
  boardingTerminal: string;
  arrivalTerminal: string;
  boardingGate: string;
}

interface FlightState {
  flightNumber: number;
  date: string | null;
  selectedFlight: SelectedFlightData | null;
  origin: string | null;
  destination: string | null;
  searchType: 'flightNumber' | 'destination';
}

const initialState: FlightState = {
  flightNumber: 0,
  date: null,
  selectedFlight: null,
  origin: null,
  destination: null,
  searchType: 'flightNumber',
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlightNumber: (state, action: PayloadAction<number>) => {
      state.flightNumber = action.payload;
    },
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload.toISOString();
    },
    setSelectedFlight: (state, action: PayloadAction<SelectedFlightData>) => {
      state.selectedFlight = action.payload;
    },
    setOrigin: (state, action: PayloadAction<string | null>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<string | null>) => {
      state.destination = action.payload;
    },
    setSearchType: (state, action: PayloadAction<'flightNumber' | 'destination'>) => {
      state.searchType = action.payload;
    },
  },
});

export const {setFlightNumber, setDate, setSelectedFlight, setOrigin, setDestination, setSearchType} =
  flightSlice.actions;
export default flightSlice.reducer;

