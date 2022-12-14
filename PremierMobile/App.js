import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignIn from './Screens/singIn';
import Dashboard from './Screens/Dashboard/dashboard';
import Navbar from './Screens/navBar';
import Requests from './Screens/requests';
import Profile from './Screens/profile';
import auth from './utils/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export const userContext = React.createContext(null);

const App = () => {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [userData, setUserData] = useState({});
  const [request, setRequest] = useState({});
  const [flag, setFlag] = useState(false);

  const stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 4000);
  }, []);

  return (
    
      <userContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          userData,
          setUserData,
          request,
          setRequest,
        }}>
        {isAuthenticated ? (
          <>
            <Navbar></Navbar>
            <NavigationContainer>
              <Tab.Navigator
                
                screenOptions={({route}) => ({
                  tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Dashboard') {
                      iconName = focused ? 'pig' : 'pig-variant';
                    } else if (route.name === 'Requests') {
                      iconName = focused ? 'history' : 'history';
                    } else if (route.name === 'Profile') {
                      iconName = focused ? 'face-man' : 'face-man'};
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{headerShown: false}}
                />
                <Tab.Screen
                  name="Requests"
                  component={Requests}
                  options={{headerShown: false}}
                />
                <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{headerShown: false}}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </>
        ) : (
          <>

            {!flag ? (
              <View style={styles.mainView}>
                <ActivityIndicator size="large" color="#880808" />
                <Text style={styles.textStyle}>Loading login page...</Text>
              </View>
            ) : (
              
                <NavigationContainer>
                  <stack.Navigator>
                    <stack.Screen
                     
                      name="SignIn"
                      component={SignIn}
                      options={{headerShown: false}}
                    />
                  </stack.Navigator>
                </NavigationContainer>
            
            )}
          </>
        )}
      </userContext.Provider>
    
  );
};

const styles = StyleSheet.create({
  
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F3',
  },
  textStyle: {
    fontFamily: 'montserrat',
    margin: 10,
    fontWeight: 'bold',
  },
});

export default App;
