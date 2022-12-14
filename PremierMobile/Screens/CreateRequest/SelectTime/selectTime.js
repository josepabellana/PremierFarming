import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity, Text, ScrollView, View, Dimensions, SafeAreaView, Pressable, StatusBar, Button, TextInput,} from 'react-native';
import RequestTitleText from '../../../Components/requestTitleText';
import {userContext} from '../../../App';
import {requestContext} from '../createRequest';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedNav from './timeNav';

const width = Dimensions.get('window').width; //full width

const SelectTime = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const {setProgressBar} = useContext(requestContext);
  const {request, setRequest} = useContext(userContext);
  const [description, setDescription] = useState('');

  useEffect(()=>{
    setProgressBar(2)
  },[])

  return (
    <View style={styles.centeredView}>
      <RequestTitleText text={'Select the delivery date'} ></RequestTitleText>
      <View style={styles.container}>
        <DatePicker
          date={date}
          mode={'date'}
          onDateChange={setDate}
          minimumDate={new Date()}
        />

        <Text style={styles.textRegular}>
          Current Selected Date: {date.toUTCString().slice(0, -12)}
        </Text>

        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text style={[styles.textStyle, styles.textBlue]}>
            {' '}
            <Icon name="plus" size={20} color="blue" />
            Add description{' '}
          </Text>
          {modalVisible && (
            <View styles={styles.container}>
              <TextInput
                style={styles.input}
                name="description"
                onChangeText={newText => setDescription(newText)}
                value={description}
                multiline={true}
                numberOfLines={3}
                placeholder="add description..."
                autoCorrect={false}></TextInput>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <FeedNav navigation={navigation} setProgressBar={setProgressBar} setRequest={setRequest} description={description} date={date}></FeedNav>
      
    </View>
  );
};

const styles = {
  input: {
    width:width-20,
    fontFamily: 'montserrat',
    fontSize: 16,
    height: 70,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#C5C6CC',
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: width,
    paddingTop: StatusBar.currentHeight,
  },
  textRegular: {
    fontFamily: 'montserrat',
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  farmview: {
    height: 100,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: width - 30,
    marginVertical: 10,
    marginHorizontal: 18,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontFamily: 'montserrat',
    textAlign: 'center',
    marginHorizontal: 18,
    fontSize: 20,
    marginVertical: 10,
  },
  textBlue: {
    color: 'blue',
  },
  navView: {
    height: 60,
    width: width - 30,
    marginVertical: 10,
    marginHorizontal: 18,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: 'montserrat',
    fontSize: 20,
    color: 'white',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#229F94',
  },
};
export default SelectTime;
