import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
  },
  weatherDescription: {
    fontSize: 18,
    color: 'white',
  },
  image: {height: 100, width: 100},
});

export {styles};
