import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  input: {
    height: 50,
    borderWidth: 1,
    margin: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: 'black',
    fontSize: 16,
  },
  dropdownContainer: {
    position: 'relative',
    marginHorizontal: 16,
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'grey',
    height: height,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: 'white',
  },
  itemText: {
    color: 'white',
  },
  recentText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export {styles};
