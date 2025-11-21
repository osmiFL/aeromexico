import {FlightStatusResponse} from '../types/flightResponse';
import {FlightStatus} from '../components/StatusLabel';
import flightData from '../../assets/flightnumberresponse.json';
import destinationData from '../../assets/destinationresponse.json';

export const fetchFlightStatus = async (): Promise<FlightStatusResponse> => {
  try {
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    return flightData as FlightStatusResponse;
  } catch (error) {
    console.error('Error loading flight status:', error);
    throw error;
  }
};

export const fetchFlightStatusByDestination = async (): Promise<FlightStatusResponse> => {
  try {
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    return destinationData as FlightStatusResponse;
  } catch (error) {
    console.error('Error loading flight status by destination:', error);
    throw error;
  }
};

export const mapStatusToFlightStatus = (status: string): FlightStatus => {
  switch (status.toUpperCase()) {
    case 'ARRIVED':
      return 'ARRIVED';
    case 'ON_TIME':
    case 'ONTIME':
      return 'ON_TIME';
    case 'DELAYED':
      return 'DELAYED';
    case 'IN_THE_AIR':
    case 'IN THE AIR':
    case 'INTHEAIR':
      return 'IN_THE_AIR';
    default:
      return 'IN_THE_AIR';
  }
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatTime = (timeString: string): string => {
  if (timeString.includes('T')) {
    const timePart = timeString.split('T')[1];
    return timePart.substring(0, 5);
  }
  return timeString.substring(0, 5);
};

