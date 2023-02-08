import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import CountryPicker from '@logisticinfotech/react-native-custom-country-picker';

const App = () => {
  const [countryCode, setCountryCode] = useState<string>('IN');

  const selectedValue = (value: string) => {
    console.log(value);
    setCountryCode(value);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'#000'}
        barStyle="light-content"
        translucent
      />
      <Text style={styles.titleText}>
        React Native Dark Theme Country Picker
      </Text>

      <CountryPicker
        disable={false}
        animationType={'slide'}
        containerStyle={styles.pickerStyle}
        pickerTitleStyle={styles.pickerTitleStyle}
        dropDownImage={require('./res/ic_drop_down.png')}
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        pickerTitle={'Country Picker'}
        searchBarPlaceHolder={'Search......'}
        hideCountryFlag={false}
        hideCountryCode={false}
        searchBarStyle={styles.searchBarStyle}
        countryFlagStyle={styles.roundImageStyle}
        dropDownImageStyle={styles.dropDownStyle}
        flatListStyle={styles.flatListStyle}
        theme={'dark'}
        backButtonImage={require('./res/ic_back_black.png')}
        searchButtonImage={require('./res/ic_search.png')}
        countryCode={countryCode}
        hideSearchBar={false}
        hidePickerTitle={true}
        selectedValue={selectedValue}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  titleText: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  pickerStyle: {
    height: 54,
    width: 150,
    marginVertical: 10,
    borderColor: '#efefef',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    borderWidth: 2,
    fontSize: 16,
    color: '#fff',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: '#fff',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
  },
  roundImageStyle: {
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  dropDownStyle: {
    tintColor: '#fff',
  },
  flatListStyle: {
    padding: 5,
  },
});
