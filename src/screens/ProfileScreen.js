import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { initProfileName, getProfileName } from '../shared/functions/AsyncFunctions';

const ProfileScreen = () => {
   const [connectedUser, setConnectedUser] = useState("Invité");

   useEffect(() => {
      initProfileName();
   }, []);

   const loadProfile = () => {
      getProfileName()
         .then((newUser) => {
            setConnectedUser(newUser);
         })
   }

   return (
      <View style={styles.container}>
         <Text style={styles.hello}>
            Bonjour, {connectedUser}
         </Text>
         <TouchableOpacity
            activeOpacity={0.5}
            onPress={loadProfile}
            style={styles.buttonStyle}
         >
            <Text style={styles.buttonText}>
               Charger le profil de test
            </Text>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      margin: 24,
      borderWidth: 1,
      padding: 32,
   },
   hello: {
      textAlign: "center",
   },
   buttonStyle: {
      borderWidth: 2,
      borderColor: "#333",
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 24,
   },
   buttonText: {
      textAlign: "center",
   }

})

export default ProfileScreen;