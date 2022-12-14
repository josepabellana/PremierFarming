import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {userContext} from '../App';
var width = Dimensions.get('window').width; //full width

const Navbar = () => {
  const {userData} = useContext(userContext);

  function toUpperCase(str){
    if(str) return (str.charAt(0).toUpperCase()+ str.slice(1));
  }
  return (
    <>
      <View style={styles.navView}>
        {userData.firstName?
        <Text style={styles.textStyle}> Welcome <Text style={[styles.textStyle,{fontWeight:'bold'}]}>{toUpperCase(userData.firstName)}</Text></Text>
        :
        null
        }
        <Image
          style={styles.logo}
          source={require('../assets/logo-grande-Premier.png')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navView: {
    width: width,
    height: 100,
    backgroundColor: '#FFE2D1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

  },
  textStyle: {
    fontFamily:'montserrat',
    fontSize: 20,
    margin: 10,
  },
  logo: {
    height: 50,
    width: 60,
    resizeMode: 'contain',
    marginRight:20
  },
});

export default Navbar;
