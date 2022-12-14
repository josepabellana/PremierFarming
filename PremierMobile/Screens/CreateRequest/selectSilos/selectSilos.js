import React, { useState, useContext} from 'react';
import {StyleSheet, Text, ScrollView, SafeAreaView, View, Dimensions, StatusBar,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {userContext} from '../../../App';
import RequestTitleText from '../../../Components/requestTitleText';
import {requestContext} from '../createRequest';
import Silo from './silo';
const width = Dimensions.get('window').width; //full width

const SelectSilos = ({navigation}) => {
  const [silos, addSilos] = useState([]);
  const {request, setRequest} = useContext(userContext);
  const {setModalVisible} = useContext(requestContext);
  const [count,addCount] = useState(0)
  const [flagCount,setflagCount] = useState(false);
  function toggleSelect(obj) {
    if (obj.act) {
      if (obj.act === 1){ obj.act = 0; addCount(count=>count-1);
      }else{ obj.act = 1;addCount(count=>count+1)}
    } else {
      obj.act = 1;
      addCount(count=>count+1);
    }
    setflagCount(false);
  }


  

  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {request.farm.silos ?
            <>
              <RequestTitleText text={'Select Silos'} ></RequestTitleText>
              <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                  {request.farm.silos.map(silo => (
                    <Silo silo={silo} toggleSelect={toggleSelect} addSilos={addSilos} key={silo._id}></Silo>
                  ))}
                </ScrollView>
                {flagCount?
                <View>
                  <Text style={[styles.textRegular,{color:'red'}]}>Select 1 silo at least</Text>
                </View>
                :
                null
                }
                <View>
                  <Text style={styles.textRegular}>Silos selected:  {count}</Text>
                </View>
              </View>
            </>
           : 
            <View>
              <Text>No silo data</Text>
            </View>
          }
          <View style={styles.navView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textButton}>
              <Icon name="arrow-left" size={20} color="white"/>
                Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                if(count===0){
                  setflagCount(true);
                }else{
                  setRequest(el=>{return{...el,silos:silos}});
                  navigation.navigate('SelectFeed');
                }
                }}>
              <Text style={styles.textButton}>Continue
              <Icon name="arrow-right" size={20} color="white"/>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
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
  button: {
    borderRadius: 20,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton:{
    fontFamily:'montserrat',
    fontSize: 20,
    color:'white'
  },
  buttonClose: {
    backgroundColor: '#229F94',
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

export default SelectSilos;
