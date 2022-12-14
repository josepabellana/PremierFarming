import 'react-native-gesture-handler';
import React, {useEffect, useState, useContext} from 'react';
import apiService from '../../Services/ApiService';
import Farm from './farm'
import {userContext} from '../../App';
import CreateRequest from '../CreateRequest/createRequest';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const width = Dimensions.get('window').width; //full width

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {userData, setUserData} = useContext(userContext);
  const { setRequest} = useContext(userContext);
  
  useEffect(() => {
    getData();
  }, [modalVisible]);

  const getData = async () => {
    let {firstName, lastName, farms, requests,_id} = await apiService.getUserData();
    setUserData(prevState => {
      return {
        ...prevState,
        _id,
        firstName,
        lastName,
        farms,
        requests,
      };
    });
  };

  return (
    <View style={styles.mainView}>
      {modalVisible ? (
        <CreateRequest setModalVisible={setModalVisible}></CreateRequest>
      ) : userData.farms ? (
        <>
          <View>
            <Text style={[styles.textStyle,styles.standardText]}>Farms</Text>
          </View>
          <View style={styles.dashView}>
            {userData.farms.map(farm => (
              <Farm farm={farm} userData={userData} setModalVisible={setModalVisible} setRequest={setRequest} key={farm._id}></Farm>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  standardText:{
    fontFamily:'montserrat',
  },
  standardTextSize:{
    fontSize:18,
  },
  mainView: {
    flex: 1,
    backgroundColor:'#FBF9F3'
  },
  button: {
    borderRadius: 100,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#F0F7EE',
  },
  textStyle: {
    fontWeight: '900',
    marginHorizontal: 18,
    fontSize: 20,
    marginTop: 10,
  },
  dashView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  boxView: {
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
  shadowProp: {
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  leftBox: {
    height: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  rightBox: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default Dashboard;
