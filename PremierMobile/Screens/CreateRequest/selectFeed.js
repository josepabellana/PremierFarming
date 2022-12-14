 import React, {useEffect, useState, useContext} from 'react';
 import apiService from '../../Services/ApiService';
 import {userContext} from '../../App';
 import {requestContext} from './createRequest';
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 import {SelectList} from 'react-native-dropdown-select-list';
 import {StyleSheet, Text, ScrollView, SafeAreaView, View, Dimensions, TouchableOpacity, StatusBar,} from 'react-native';
 import { toTones } from '../../Functionalities/toTones';
 import SwitchSelector from 'react-native-switch-selector';
 //import FeedSilo from './SelectFeed/FeedSilo';
 import RequestTitleText from '../../Components/requestTitleText';
 const width = Dimensions.get('window').width; //full width

const SelectFeed = ({navigation}) => {
   const [feeds, setFeed] = useState([]);
   const {setProgressBar} = useContext(requestContext);
   const [amount, setAmount] = useState('');
   const {request, setRequest} = useContext(userContext);
   const [flagAmount,setflagAmount] = useState(false);
   const [selFeed, setSelected] = useState('');
   const [flagFeed,setflagFeed] = useState(false)
  
  useEffect(() => {
    (async function getData() {
      let feedTypes = await apiService.getFeed();
      let feed = [];
      feedTypes.forEach(el => {
        let name = el.name.charAt(0).toUpperCase() + el.name.slice(1);
        let aux = {key: el._id, value: name};
        feed.push(aux);
      });
      feed.push({
        key: '1',
        value: 'Premier X - disabled(no stock)',
        disabled: true,
      });
      setFeed(feed);
    })();
    setProgressBar(1);
    setAmount('0 Tones selected')
  }, []);
  const switchoptions = [
    {label: '100%', value: 1},
    {label: '75%', value: 0.75},
    {label: '50%', value: 0.5},
    {label: '25%', value: 0.25},
  ];

  const evalAmount = () => {
    let aux=0;
    request.silos.forEach(el =>{if(el.amount){aux+=el.amount}});
    request.amount = aux;
    setflagAmount(false)
    setAmount(toTones(aux));
  };
  

   return (
    
   <View style={styles.centeredView}>
         {feeds[0] ? ( 
          <>
             <RequestTitleText text={'Select the type of feed'}></RequestTitleText>
            <View style={styles.container}>
              <SelectList
                fontFamily="montserrat"
                setSelected={value => {
                  setflagFeed(false);
                  setSelected(value)}}
                data={feeds}
                save="value"
                boxStyles={{borderRadius: 0}}
              />

              <View>
              <RequestTitleText text={'Add amount'}></RequestTitleText>
                <ScrollView style={styles.scrollView}>
                  {request.silos.map(silo => (
                    <View
                    key={silo._id}
                    style={[styles.boxView, styles.shadowProp]}>
                    <View style={styles.leftBox}>
                      <Text style={[styles.standardText]}>
                        Silo Num: {silo.number}
                      </Text>
                      <Text style={[styles.standardText]}>
                        Capacity: {toTones(silo.capacity)}
                      </Text>
                    </View>
                    <View style={styles.rightBox}>
                      <SwitchSelector
                        options={switchoptions}
                        buttonColor="#ADC8CC"
                        initial={silo.value?silo.value:3}
                        fontSize={15}
                        onPress={value => {
                          silo.value = value;
                          silo.amount = silo.capacity * value;
                          console.log('silo amount:',silo.amount)
                          evalAmount();
                        }}
                      />
                    </View>
                  </View>
                    // <FeedSilo silo={silo} request={request} setflagAmount={setflagAmount} setAmount={setAmount}></FeedSilo>
                  ))}
                </ScrollView>
              </View>
            </View>
           </>
        ) : (
          <Text>No feed data</Text>
        )}
        {flagFeed?
                <View>
                  <Text style={[styles.textRegular,{color:'red'}]}>Select a type</Text>
                </View>
                :null}
        {flagAmount?
                <View>
                  <Text style={[styles.textRegular,{color:'red'}]}>Add amounts</Text>
                </View>
                :null}
        <View>
          <Text style={styles.textRegular}>Amount to request: {amount}</Text>
        </View>
        <View style={styles.navView}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setProgressBar(0);
              navigation.navigate('SelectSilos');
            }}>
            <Text style={styles.textButton}>
              <Icon name="arrow-left" size={20} color="white" />
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              console.log(selFeed)
              if(!request.amount)setflagAmount(true);
              if(!selFeed)setflagFeed(true);
              if(request.amount&&selFeed!==''){
                setRequest(el => {
                  return {...el, feed: selFeed};
                });
                navigation.navigate('SelectTime');
              }
            }}>
            <Text style={styles.textButton}>
              Continue
              <Icon name="arrow-right" size={20} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     
   )
 };

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
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
  textStyle: {
    fontFamily: 'montserrat',
    textAlign: 'center',
    marginHorizontal: 18,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  textRegular: {
    fontFamily:'montserrat',
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    width: width,
    paddingTop: StatusBar.currentHeight,
  },
  boxView: {
    height: 60,
    paddingHorizontal: 10,
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
    shadowRadius: 3,
  },
  navView: {
    height: 60,
    width: width - 30,
    marginVertical: 7,
    marginHorizontal: 18,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftBox: {
    width: '40%',
    height: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  rightBox: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});

export default SelectFeed;
