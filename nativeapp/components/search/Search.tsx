import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import Characters from './Characters';
import RNPickerSelect from 'react-native-picker-select';

const Search = () => {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');

  const handleReset = () => {
    if(search) setSearch('') 
    if(gender) setGender('')
    if(status)setStatus('')
    if(species )setSpecies('')
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search the multiverse"
        onChangeText={setSearch}
        value={search}
      />
      <View style={styles.pickerGroup}>
        <View style={styles.picker}>
          <RNPickerSelect
            key={gender}
            placeholder={{ label: 'Gender', value: '', color: '#9EA0A4' }}
            items={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Unknown', value: 'unknown' },
            ]}
            onValueChange={(value) => setGender(value)}
            style={pickerStyle}
            value={gender}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View style={styles.picker}>
          <RNPickerSelect
            key={status}
            placeholder={{ label: 'Status', value: '', color: '#9EA0A4' }}
            onValueChange={(value) => setStatus(value)}
            items={[
              { label: 'Dead', value: 'dead' },
              { label: 'Alive', value: 'alive' },
              { label: 'Unknown', value: 'unknown' },
            ]}
            style={pickerStyle}
            value={status}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View style={styles.picker}>
          <RNPickerSelect
            key={species}
            placeholder={{ label: 'Species', value: '', color: '#9EA0A4' }}
            onValueChange={(value) => setSpecies(value)}
            items={[
              { label: 'Human', value: 'human' },
              { label: 'Alien', value: 'alien' },
              {
                label: 'Mythological',
                value: 'mythological creature',
              },
              { label: 'Robot', value: 'robot' },
              { label: 'Humanoid', value: 'humanoid' },
              { label: 'Cronenberg', value: 'cronenberg' },
              { label: 'Unknown', value: 'unknown' },
            ]}
            value={species}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <Button onPress={handleReset} labelStyle={styles.btn}>
          Reset
        </Button>
      </View>
      <Characters
        searchInput={search}
        gender={gender}
        status={status}
        species={species}
      />
    </View>
  );
};
// To prevent selected filtration from getting invisible on Android.
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    color: 'black',
    fontSize:12,
  },
  inputIOS: {
    textAlign: 'center'
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
    flex: 1
  },
  picker: {
    width: '25%',
    display: 'flex',
    justifyContent:'center',
    alignContent:'center',
  },
  btn:{
    fontSize:12,
  },
  pickerGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: '2%',
  },
});

export default Search;
