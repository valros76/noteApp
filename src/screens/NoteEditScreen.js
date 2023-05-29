import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

const NoteEditScreen = () => {

   useEffect(()=>{
      console.log("Notescreen loaded")
   }, []);
   return (
      <View style={styles.container}>
         
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      
   },
})

export default NoteEditScreen;
