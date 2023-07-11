import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useGetCurrentWeather} from '../../hooks/WeatherActions';
import SearchComponent from '../../components/searchInput';
import {styles} from './HomeScreen.styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getRecentSearched, SEARCH_ITEM_KEY} from '../../utils/searchHelper';
import {AppStackParamList} from '../../navigations/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const {isLoading, handleGetCurrentWeather, data, error} =
    useGetCurrentWeather();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchedItems, setSearchedItems] = useState<string[]>([]);

  const handleGetSearchedItems = async () => {
    const res = await getRecentSearched(SEARCH_ITEM_KEY);
    setSearchedItems(res);
  };

  const handleSearch = async (city: string) => {
    await handleGetCurrentWeather(city);
    handleGetSearchedItems();
  };

  useEffect(() => {
    handleGetSearchedItems();
    handleGetCurrentWeather('');
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'grey'}}>
      <SearchComponent
        onPerformSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchedItems={searchedItems}
      />
      {data && !isLoading && (
        <View style={styles.container}>
          <Text style={styles.weatherDescription}>{data.location.country}</Text>
          <Text style={styles.weatherDescription}>{data.location.name}</Text>
          <Text style={styles.temperature}>{data.current.temp_c}°C</Text>
          <Image
            source={{uri: `https:${data.current.condition.icon}`}}
            style={styles.image}
          />
          <Text style={[styles.weatherDescription]}>
            {data.current.condition.text}
          </Text>
        </View>
      )}
      {isLoading && (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )}
      {error?.message && (
        <View style={styles.container}>
          <Text style={styles.weatherDescription}>{error?.message}</Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          padding: 16,
          borderWidth: 1,
          borderRadius: 4,
          margin: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#23395d',
          borderColor: '#23395d',
        }}
        onPress={() =>
          navigation.navigate('Forecast', {
            latitude: data?.location.lat as number,
            longitude: data?.location.lon as number,
            town: data?.location.name as string,
          })
        }>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Next Five Days Forecast
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
