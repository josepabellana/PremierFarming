import {StyleSheet, ActivityIndicator, Modal, Text, View, Dimensions, Pressable, SafeAreaView, StatusBar,TouchableOpacity,} from 'react-native';
import RequestTitleText from '../../Components/requestTitleText';
import apiService from '../../Services/ApiService';
import React, {useEffect, useState, useContext} from 'react';
import {userContext} from '../../App';
import {requestContext} from './createRequest';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const width = Dimensions.get('window').width; //full width

const SummaryRequest = ({navigation}) => {
  const {request} = useContext(userContext);
  const {userData} = useContext(userContext);
  const {setModalVisible, setProgressBar} = useContext(requestContext);
  const [modalVisible, setModalRequest] = useState(false);
  const [tickSuccess,setTick] = useState(false);
  useEffect(() => {
    setProgressBar(3);
    console.log(request);
  }, []);
  //mostrar resumen para cada silo, en total y la descripción.

  const createRequest = async () => {
    let silos = [];
    request.silos.forEach(el => silos.push(el._id));
    let req = {
      user: userData._id,
      farm: request.farm._id,
      comment: request.description,
      deliveryDate: request.date,
      status: 'pending',
      silos: silos,
      type: request.feed,
      amount:request.amount
    };
    console.log(req);
    let res = await apiService.createRequest(req);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      console.log('request created');
      setTimeout(() => {
        setTick(true);
        setTimeout(()=>{setModalVisible(false)},2000)
      }, 3000);
      
    }
  };
  
  return (
    <View style={styles.centeredView}>
      <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(false);
    }}
    >
      <View style={styles.modelCenteredView}>
        <View style={styles.modalView}>
          
          {tickSuccess?
          <>
          <Text style={styles.modalText}>Request submitted!</Text>
          <Icon name="check" size={20} color="black" />
          </>
          :
          <>
          <Text style={styles.modalText}>Processing the request!</Text>
          <ActivityIndicator size="large" color="#880808" />
          </>
          }
        </View>
      </View>
    </Modal>
      <RequestTitleText text={'Request Summary'} ></RequestTitleText>
      <View style={styles.container}>
      <View style={styles.rowView}>
          <Text style={styles.textLeft}>
            <Icon name="factory" size={14} color="black" /> 
            - - - - - - - - - - - - - -
            <Icon name="truck" size={14} color="black" /> 
            - - - - - - - - - - - - - -
            <Icon name="circle-outline" size={14} color="black" /> 
          </Text>
        </View>
        <View style={[styles.rowView,styles.rowViewNoMargin]}>
          <Text style={styles.textRight}>Created</Text>
          <Text style={styles.textRight}>Delivery Date</Text>
        </View>
        <View style={[styles.rowView,{marginBottom:8},styles.rowViewNoMargin]}>
          {request.date?
          <>
          <Text style={styles.textLeft}>{(new Date().toUTCString().slice(0,-18))} </Text>
          <Text style={styles.textLeft}>{request.date.toUTCString().slice(0,-18)} </Text>
          </>
          :
          null}
        </View>
        
      </View>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <Text style={styles.textLeft}>Full Name </Text>
          <Text style={styles.textRight}>
            {userData.firstName} {userData.lastName}
          </Text>
        </View>
        <View style={styles.separationLine}></View>
        <View style={styles.rowView}>
          <Text style={styles.textLeft}> Farm</Text>
          <Text style={styles.textRight}>{request.farm.name}</Text>
        </View>
        <View style={styles.separationLine}></View>
        <View style={styles.rowView}>
          <Text style={styles.textLeft}> Feed Type</Text>
          <Text style={styles.textRight}>{request.feed}</Text>
        </View>
        <View style={styles.separationLine}></View>
        <Text style={[styles.textRight,styles.textTitle]}>Silos</Text>
        {request.silos.map(silo => (
          <SafeAreaView key={silo._id}>
            <View style={styles.separationLineShort} ></View>
            {silo.amount ? (
              <>
                <View style={styles.separationLineShort} ></View>
                <View style={styles.rowViewShort}  >
                  <Text style={styles.textLeft}>Silo {silo.number}</Text>
                  <Text style={styles.textRight}> Amount: {silo.amount} kgs</Text>
                </View>
              </>
            ) : null}
          </SafeAreaView>
        ))}
        <View style={styles.separationLine}></View>
        {request.description ? (
          <>
            <Text style={[styles.textRight,styles.textTitle]}>Description: </Text>
            <Text style={styles.textRight}>{request.description}</Text>
          </>
        ) : null}
        

        <View style={styles.navView}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setProgressBar(2);
              navigation.navigate('SelectTime');
            }}>
            <Text style={styles.textButton}><Icon name="arrow-left" size={20} color="white" /></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalRequest(true);
              createRequest();
            }}>
            <Text style={styles.textButton}>Send <Icon name="send" size={20} color="white" /></Text>
          </TouchableOpacity>
        </View>
        
      </View>
            
    </View>
  );
};

const styles = {
  centeredView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  separationLine: {
    width: '90%',
    height: 0.3,
    backgroundColor: 'grey',
  },
  separationLineShort: {
    width: '65%',
    height: 0.3,
    backgroundColor: 'grey',
  },
  rowView: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  rowViewShort: {
    width: '65%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  rowViewNoMargin:{
    marginVertical:0,
  },
  textStyle: {
    fontFamily: 'montserrat',
    textAlign: 'center',
    marginHorizontal: 18,
    fontSize: 20,
    marginVertical: 10,
  },
  textTitle:{
    fontSize:15,
    marginVertical:7
  },
  container: {
    width: width - 70,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 20,
    marginVertical:4
  },
  navView: {
    height: 60,
    width: width - 150,
    marginVertical: 10,
    marginHorizontal: 18,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'montserrat',
    fontSize: 20,
    color: 'white',
  },
  buttonClose: {
    backgroundColor: '#229F94',
  },
  textLeft: {
    fontFamily: 'montserrat',
    color: '#B6B6B6',
  },
  textRight: {
    fontFamily: 'montserrat',
    fontSize:13,
    fontWeight: '900'
  },
  modelCenteredView:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22

  },
  modalView: {
    width:width-100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
};

export default SummaryRequest;
