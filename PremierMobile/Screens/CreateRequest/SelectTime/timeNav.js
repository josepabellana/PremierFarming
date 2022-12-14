import React from 'react';
import {StyleSheet, Text, View,Dimensions,TouchableOpacity} from 'react-native';
const width = Dimensions.get('window').width; //full width
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



function FeedNav({setProgressBar,setRequest,navigation,description,date}){

    return(
        <View style={styles.navView}>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            setProgressBar(1);
            navigation.navigate('SelectFeed')}}>
          <Text style={styles.textButton}>
            <Icon name="arrow-left" size={20} color="white" />
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            setRequest(el => {
              return {...el, description: description};
            });
            setRequest(el => {
              return {...el, date: date};
            });
            navigation.navigate('SummaryRequest');
          }}>
          <Text style={styles.textButton}>
            Resume <Icon name="arrow-right" size={20} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    )
}
const styles={
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
export default FeedNav;