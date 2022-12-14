import React from 'react';
import {View,StyleSheet,Dimensions} from 'react-native';
const width = Dimensions.get('window').width; //full width


function ProgressBar({progressBar}){

    return(
        <View style={styles.layeredBar}>
      <View style={progressBar>=0?[styles.progressLayer,styles.progressColor]:styles.progressLayer}></View>
      <View style={progressBar>=1?[styles.progressLayer,styles.progressColor]:styles.progressLayer}></View>
      <View style={progressBar>=2?[styles.progressLayer,styles.progressColor]:styles.progressLayer}></View>
      <View style={progressBar===3?[styles.progressLayer,styles.progressColor]:styles.progressLayer}></View>
    </View>
    )
}

const styles =StyleSheet.create({
    layeredBar:{
      width:width,
      height:5,
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'flex-start'
    },
    progressLayer:{
      height:5,
      width:'25%',
    },
    progressColor:{
      backgroundColor:'red'
    },
  });
export default ProgressBar;