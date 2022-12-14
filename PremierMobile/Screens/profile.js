import React,{useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {userContext} from '../App';
import apiService from '../Services/ApiService';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Profile() {
    const {setIsAuthenticated,userData} = useContext(userContext);
  function logout() {
    //connect db, delete session, delete current context
    apiService.logout();
    setIsAuthenticated(false)
  }
  return (
    <View style={styles.mainView}>
        
        <Text style={[
              styles.standardText,
              styles.standardTextSize,
              
            ]}>User First Name: {userData.firstName}</Text>
        <Text style={[
              styles.standardText,
              styles.standardTextSize,
             
            ]}>User Last Name: {userData.lastName}</Text>
        
      <TouchableOpacity
        onPress={() => {
          logout();
        }}>
        <View style={styles.logoutButton}>
          <Text
            style={[
              styles.standardText,
              styles.standardTextSize,
              {color: 'white'},
            ]}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  standardText: {
    fontFamily: 'montserrat',
  },
  standardTextSize: {
    fontSize: 13,
    marginVertical:5
  },
  mainView: {
    flex: 1,
    backgroundColor:'#FBF9F3',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logoutButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
  },
});

export default Profile;
