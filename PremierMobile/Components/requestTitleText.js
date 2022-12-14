
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';





function RequestTitleText({text}){


    return(
            <View>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        )
}
const styles =StyleSheet.create({
textStyle: {
    fontFamily:'montserrat',
    textAlign: 'center',
    marginHorizontal: 18,
    fontSize: 20,
    marginTop: 10,
  }
})
export default RequestTitleText;