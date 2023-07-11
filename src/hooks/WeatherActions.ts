import {
  getCurrentWeather,
  getWeatherForecast,
} from '../services/weatherService';
import {useMutation, useQuery} from 'react-query';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  CurrentWeatherPayloadProps,
  CurrentWeatherResponse,
  ErrorProps,
  ForecastData,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SEARCH_ITEM_KEY, storeRecentSearched} from '../utils/searchHelper';
import {handleCloseDropdown} from '../components/searchInput';

const useGetCurrentWeather = (): {
  handleGetCurrentWeather: (city: string) => void;
  error: ErrorProps;
  isLoading: boolean;
  data: CurrentWeatherResponse | null;
} => {
  const mutation = useMutation(
    ({city, latitude, longitude}: CurrentWeatherPayloadProps) =>
      getCurrentWeather(city, latitude, longitude),
    {
      onSuccess: async (res, {city}) => {
        handleCloseDropdown();
        if (city) {
          await storeRecentSearched(city, SEARCH_ITEM_KEY);
        }
      },
    },
  );
  const {error, data, isLoading} = mutation;
  const handleGetCurrentWeather = async (city: string) => {
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          mutation.mutate({
            city,
            latitude,
            longitude,
          });
          await AsyncStorage.setItem('position', JSON.stringify(position));
        },
        error => {
          console.error('Error getting current location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    try {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          getCurrentLocation();
        }
      }
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return {
    handleGetCurrentWeather,
    error: error as ErrorProps,
    isLoading,
    data: data as CurrentWeatherResponse | null,
  };
};

const useGetWeatherForecast = (latitude: number, longitude: number) => {
  const {data, isLoading, error} = useQuery(['weather-forecast'], () =>
    getWeatherForecast(latitude, longitude),
  );
  // @ts-ignore
  const forecastList = data?.forecast?.forecastday ?? [];
  const forecastData: ForecastData[] = forecastList.map((item: any) => ({
    date: item.date,
    temperature: item.day.avgtemp_c,
    weatherDescription: item.day.condition.text,
    icon: item.day.condition.icon,
  }));
  return {forecastData, isLoading, error};
};

export {useGetCurrentWeather, useGetWeatherForecast};
