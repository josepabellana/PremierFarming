import React from 'react';
import {StyleSheet, Text,View, Dimensions, Pressable, StatusBar} from 'react-native';
const width = Dimensions.get('window').width; //full width


function Silo({silo,toggleSelect,addSilos}){

    const toTones = num => {
        if (num > 1000) return `${num / 1000} tones`;
        else `${num} kilograms`;
      };
    return(
        <View key={silo._id}>
        <Pressable
          onPress={() => {
            addSilos(current =>
              current.filter(el => el._id === silo.id)[0]
                ? current.filter(el => el._id !== silo.id)
                : [...current, silo],
            );
            toggleSelect(silo);
            
          }}>
          <View
            style={
              silo.act === 1
                ? [
                    styles.boxView,
                    styles.shadowProp,
                    styles.selectedView,
                  ]
                : [styles.boxView, styles.shadowProp]
            }>
            <View style={styles.leftBox}>
              <Text style={[styles.standardText]}>Silo Num:  {silo.number}</Text>
              <Text style={[styles.standardText]}>Capacity: {toTones(silo.capacity)}</Text>
            </View>
          </View>
        </Pressable>
      </View>)
}
const styles = StyleSheet.create({
    standardText:{
      fontFamily:'montserrat',
    },
    mainView: {
      flex: 1,
    },
    centeredView: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedView: {
      backgroundColor: 'beige',
    },
    modalView: {
      padding: 15,
    },
    
    textRegular: {
      fontFamily:'montserrat',
      textAlign: 'center',
      fontSize: 14,
      marginVertical: 5,
    },
    textStyle: {
      fontFamily:'montserrat',
      textAlign: 'center',
      marginHorizontal: 18,
      fontSize: 20,
      marginTop: 10,
    },
    container: {
      flex: 1,
      width: width,
      paddingTop: StatusBar.currentHeight,
    },
    boxView: {
      height: 60,
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
    shadowProp: {
      shadowOffset: {width: -2, height: 4},
      shadowColor: '#171717',
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    leftBox: {
      height: '80%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    }
  });


export default Silo