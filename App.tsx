import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/homeScreen/HomeScreen';
import ForecastScreen from './src/screens/forecastScreen/ForecastScreen';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './src/services/queryClient';

export type AppStackParamList = {
  ['Forecast']: {
    latitude: number;
    longitude: number;
    town: string;
  };
  ['Home']: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Forecast" component={ForecastScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
