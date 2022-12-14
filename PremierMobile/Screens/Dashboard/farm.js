import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, View, TouchableOpacity,Dimensions} from 'react-native';
const width = Dimensions.get('window').width; //full width

function Farm({farm,userData,setModalVisible,setRequest}){

    return(
        <>
        <View style={[styles.boxView, styles.shadowProp]} key={farm._id}>
                <View style={styles.leftBox}>
                  <Text style={[styles.standardText,styles.standardTextSize]}>{farm.name}</Text>
                  <Text style={styles.standardText}>
                    {
                      userData.requests.filter(req =>
                        req.farm._id === farm._id
                          ? req.status === 'pending'
                            ? true
                            : false
                          : false,
                      ).length
                      ?
                      <>
                      Pending Requests:{' '}
                        {userData.requests.filter(req =>
                        req.farm._id === farm._id
                          ? req.status === 'pending'
                            ? true
                            : false
                          : false,
                      ).length}  
                      <Icon name="flag-variant" size={20} color="red"/>
                      </>
                      :
                      <>
                      No pending requests
                      <Icon name="check" size={20} color="green"/>
                      </>
                    }
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(true);
                    setRequest(el => {
                      return {...el, farm: farm};
                    });
                  }}>
                  <View style={styles.rightBox}>
                    <Text style={{color:'#AFDEDC',fontSize:30}}> + </Text>
                  </View>
                </TouchableOpacity>
              </View>
        </>
    )

}


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

export default Farm