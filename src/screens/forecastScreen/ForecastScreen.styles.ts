import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  forecastItem: {
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  temperature: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },
  weatherDescription: {
    fontSize: 12,
    color: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    color: 'white',
  },
  image: {
    height: 100,
    width: 100,
  },
});

export {styles};
