import 'react-native-gesture-handler'
import React,{useState,useContext} from 'react';
import auth from '../utils/auth';

import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import { userContext } from "../App";
import apiService from '../Services/ApiService';

const SignIn =(props)=>{
    const {setIsAuthenticated} = useContext(userContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validateForm = () => {
      return !username || !password;
    };
    const handleSubmit = async () => {
      const user = { username, password };
      const res = await apiService.login(user);
      if (res.error) {
        alert(`${res.message}`);
        setUsername('');
        setPassword('');
      } else {
        auth.login(() => {});
        setIsAuthenticated(true)
      }
      
    };
    return (
      <View style ={styles.mainView}>
        <View style ={styles.centeredView}>
          <Image
            style={styles.logo}
            source={require('../assets/logo-grande-Premier.png')}
          />
          <Text style={styles.baseText}>
            Welcome
            <Text style={styles.innerText}> to Premier Pigs</Text>
          </Text>
          
          <TextInput
            style={styles.input}
            name="username"
            onChangeText={newText => setUsername(newText)}
            value={username}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            name="username"
            onChangeText={newText => setPassword(newText)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCorrect={false}
          />
          <View>
          <Button 
            title="Login"
            color="red"
            backgroundColor='beige'
            disabled={validateForm()}
            onPress={() => handleSubmit()}
          
          />
          </View>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
    mainView:{
      flex:1,
      backgroundColor:'#FBF9F3'
    },
    centeredView:{
      marginTop:20,
      flex:1,
      marginHorizontal:18,
    },
    baseText: {
      fontFamily: 'montserrat',
      fontWeight: 'bold',
      fontSize:19
    },
    innerText: {
      fontFamily: 'montserrat',
      color: 'red',
    },
    button:{
      backgroundColor:'#000',
      fontFamily: 'montserrat',
      fontWeight: 'bold',
      fontSize:17
    },
    input: {
      fontFamily: 'montserrat',
      fontSize:16,
      
      height: 55,
      marginVertical: 15,
      borderWidth: 1,
      borderRadius:15,
      borderColor: '#C5C6CC',
      padding: 10,
    },
    logo:{
      height:300,
      width:330,
      resizeMode: 'contain'
    }
  });

  export default SignIn;