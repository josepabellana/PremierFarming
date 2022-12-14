import 'react-native-gesture-handler';
import React, {useEffect, useState,useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectSilos from './selectSilos/selectSilos';
export const requestContext = React.createContext(null);
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {userContext} from '../../App';
import SelectTime from './SelectTime/selectTime';
import SelectFeed from './selectFeed';
import ProgressBar from '../../Components/progressBar';
import SummaryRequest from './summaryRequest';

const CreateRequest = ({setModalVisible}) => {
  const stack = createStackNavigator();
  const {request} = useContext(userContext);
  const [progressBar,setProgressBar] = useState(0)

  useEffect(()=>{
    console.log(progressBar)
  },[progressBar])
  return (
    <>
      <ProgressBar progressBar={progressBar}></ProgressBar>
      <View style={styles.rowView}>
        <Text style={ styles.standardText}>
          Create a request for:{' '}
        </Text>
        <Text>{request.farm.name} </Text>
      </View>
      <requestContext.Provider value={{setModalVisible,setProgressBar}}>
        <NavigationContainer independent={true}>
          <stack.Navigator>
            <stack.Screen
              name="SelectSilos"
              component={SelectSilos}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="SelectTime"
              component={SelectTime}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="SelectFeed"
              component={SelectFeed}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="SummaryRequest"
              component={SummaryRequest}
              options={{headerShown: false}}
            />
          </stack.Navigator>
        </NavigationContainer>
      </requestContext.Provider>
    </>
  );
};


const styles =StyleSheet.create({
standardText:{
  fontFamily:'montserrat',
},
rowView: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor:'white',
  height:30
}

});



export default CreateRequest;
