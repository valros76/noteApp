import React from 'react';
import {View, StyleSheet} from 'react-native';

const ReplacementView = ({width, height, padding}) => {
   return(
      <View 
         style={[styles.replacementView, {
            width: width,
            height: height,
            padding: padding || 48, 
         }]}
      ></View>
   )
}

const styles = StyleSheet.create({
   replacementView: {
      backgroundColor: "transparent",
      alignSelf: "center",
   }
})

export default ReplacementView;