import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useGetWeatherForecast} from '../../hooks/WeatherActions';
import {dateBuilder} from '../../utils/dateBuilder';
import {styles} from './ForecastScreen.styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../navigations/types';

type Props = NativeStackScreenProps<AppStackParamList, 'Forecast'>;

const ForecastScreen = ({route}: Props) => {
  const {latitude, longitude, town} = route.params;
  const {forecastData, isLoading} = useGetWeatherForecast(latitude, longitude);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Next Five Days Forecast in</Text>
      <Text style={[styles.header, {marginTop: 4}]}>{town}</Text>

      <ScrollView style={{padding: 16}}>
        {forecastData &&
          !isLoading &&
          forecastData.map(data => (
            <View key={data?.date} style={styles.forecastItem}>
              <Text style={styles.date}>
                {dateBuilder(new Date(data.date))}
              </Text>
              <Text style={styles.temperature}>{data?.temperature}°C</Text>
              <Image
                source={{uri: `https:${data.icon}`}}
                style={styles.image}
              />
              <Text style={styles.weatherDescription}>
                {data.weatherDescription}
              </Text>
            </View>
          ))}
      </ScrollView>
      {isLoading && (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ForecastScreen;
