import React, {useEffect, useState, useContext, useDebugValue} from 'react';
import {userContext} from '../App';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
const width = Dimensions.get('window').width; //full width

function Requests() {
  const {userData} = useContext(userContext);

  useEffect(() => {
    console.log(userData);
  }, []);
  return (
    <View style={styles.mainView}>
      {userData.requests[0] ? (
        <>
          <View>
            <Text style={[styles.textStyle, styles.standardText]}>
              Requests
            </Text>
          </View>
          <ScrollView>
            {userData.requests.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt)).map(req => (
              <View style={[styles.boxView, styles.shadowProp]} key={req._id}>
                <Text style={[styles.standardTextSize, styles.standardText]}>
                  Requested by: {userData.firstName} {userData.lastName} |{' '}
                  {req.farm.name}
                </Text>
                <View style={styles.rowView}>
                  <View style={styles.leftBox}>
                    <Text style={styles.standardText}>
                      Status:
                      {req.status === 'pending' ? (
                        <Text style={{color: '#FEE55E'}}> '{req.status}'</Text>
                      ) : req.status === 'approved' ? (
                        <Text style={{color: 'green'}}> '{req.status}'</Text>
                      ) : (
                        <Text style={{color: 'red'}}> '{req.status}'</Text>
                      )}
                    </Text>
                    {req.createdAt ? (
                      <Text style={styles.standardText}>
                        Created at: {req.createdAt.slice(0, 10)}
                      </Text>
                    ) : null}
                    {req.deliveryDate ? (
                      <Text style={styles.standardText}>
                        Delivery Data: {req.deliveryDate.slice(0, 10)}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.rightBox}>
                    <Text style={styles.standardText}>
                      Nº silos: {req.silos.length}
                    </Text>
                    <Text style={styles.standardText}>
                       {req.type}
                    </Text>
                    <Text style={styles.standardText}>
                      Amount(kgs): {req.amount}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text>No requests on this user</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  standardText: {
    fontFamily: 'montserrat',
   
  },
  standardTextSize: {
    fontSize: 13,
  },
  mainView: {
    flex: 1,
    backgroundColor:'#FBF9F3'
  },
  rowView: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  centeredView: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  selectedView: {
    backgroundColor: 'yellow',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  standardText: {
    fontFamily: 'montserrat',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    marginHorizontal: 18,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    width: width,
    paddingTop: StatusBar.currentHeight,
  },
  dashView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  boxView: {
    height: 100,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: width - 30,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  shadowProp: {
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  leftBox: {
    flex: 0.55,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 5,
  },
  rightBox: {
    flex: 0.45,
    display: 'flex',
    justifyContent: 'center',
    alignItems:'flex-end',
    flexDirection: 'column',
    marginTop: 5,
  },
});

export default Requests;
