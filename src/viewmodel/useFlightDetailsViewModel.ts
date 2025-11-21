import {useState, useEffect} from 'react';
import {useAppSelector} from '../store/store';
import {fetchFlightStatus, fetchFlightStatusByDestination, mapStatusToFlightStatus, formatDuration, formatTime} from '../services/flightService';
import {FlightStatusItem} from '../types/flightResponse';
import {FlightStatus} from '../components/StatusLabel';

export interface FlightCardData {
  status: FlightStatus;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  duration: string;
  flightNumber: string;
  arrivalGate: string;
  boardingTime: string;
  boardingTerminal: string;
  arrivalTerminal: string;
  boardingGate: string;
}

export const useFlightDetailsViewModel = () => {
  const flightNumber = useAppSelector(state => state.flight.flightNumber);
  const dateString = useAppSelector(state => state.flight.date);
  const searchType = useAppSelector(state => state.flight.searchType);
  const [flightCards, setFlightCards] = useState<FlightCardData[]>([]);
  const [loading, setLoading] = useState(true);

  const date = dateString ? new Date(dateString) : null;

  useEffect(() => {
    const loadFlightData = async () => {
      try {
        setLoading(true);
        const response = searchType === 'destination' 
          ? await fetchFlightStatusByDestination()
          : await fetchFlightStatus();
        
        const cards: FlightCardData[] = response.flightStatusCollection.map(
          (item: FlightStatusItem) => {
            const status = mapStatusToFlightStatus(item.status);
            const flightCode = `${item.segment.operatingCarrier} ${item.segment.operatingFlightCode}`;
            
            return {
              status,
              departureTime: formatTime(item.segment.departureDateTime),
              departureAirport: item.segment.departureAirport,
              arrivalTime: formatTime(item.segment.arrivalDateTime),
              arrivalAirport: item.segment.arrivalAirport,
              duration: formatDuration(item.totalFlightTimeInMinutes),
              flightNumber: flightCode,
              arrivalGate: item.arrivalGate,
              boardingTime: formatTime(item.boardingTime),
              boardingTerminal: item.boardingTerminal,
              arrivalTerminal: item.arrivalTerminal,
              boardingGate: item.boardingGate,
            };
          },
        );

        setFlightCards(cards);
      } catch (error) {
        console.error('Error loading flight data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFlightData();
  }, [searchType]);

  return {
    flightNumber,
    date,
    flightCards,
    loading,
  };
};

