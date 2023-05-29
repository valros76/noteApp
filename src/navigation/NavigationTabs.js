import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/NoteScreen';
import NoteEditScreen from '../screens/NoteEditScreen';
import NotesListScreen from '../screens/NotesListScreen';
import { Foundation as FoundationIcons } from 'react-native-vector-icons';
import { StyleSheet } from 'react-native';
import colors from '../shared/theme/colors';
import {getUsername} from '../shared/functions/AsyncFunctions';

const Tab = createBottomTabNavigator();

const NavigationTabs = ({ userName, modifyGlobalUsername }) => {

   const [navUserName, setNavUserName] = useState(null);

   const verifyUsername = async (username) => {
      if(username !== null && username !== undefined){
         const result = await getUsername().then((existingUsername)=>{
            return JSON.parse(existingUsername)?.name;
         });
         if(result !== null && result !== undefined && typeof(result) === "string"){
            setNavUserName(result);
         }
      }
   }

   useEffect(() => {
      if (userName !== undefined && userName !== null) {
         setNavUserName(userName.name);
      }
      verifyUsername(userName);
   }, []);

   return (
      <Tab.Navigator
         initialRouteName="Home"
         backBehavior="history"
      >
         <Tab.Screen
            name="Home"
            style={styles.tabScreen}
            options={{
               tabBarLabel: "Accueil",
               tabBarActiveTintColor: "#917FB3",
               tabBarInactiveTintColor: "#E5BEEC",
               tabBarIcon: ({ color, size }) => (
                  <FoundationIcons name="home" color={color} size={size} />
               ),
               title: "Accueil",
            }}
         >
            {(props) => <HomeScreen {...props} userName={userName} setNavUserName={setNavUserName} modifyGlobalUsername={modifyGlobalUsername}/>}
         </Tab.Screen>

         <Tab.Screen
            name="NotesList"
            style={styles.tabScreen}
            listeners={{
               tabPress: e => {
                  verifyUsername(userName);
                  if (navUserName === null || navUserName === undefined) {
                     e.preventDefault();
                     alert("Vous devez entrer votre prénom pour accéder à cette fonctionnalité.");
                  }
               }
            }}
            options={{
               tabBarLabel: "Liste de notes",
               tabBarActiveTintColor: "#917FB3",
               tabBarInactiveTintColor: "#E5BEEC",
               tabBarIcon: ({ color, size }) => (
                  <FoundationIcons name="clipboard-notes" color={color} size={size} />
               ),
               title: `Liste de notes de ${userName || "Invité"}`,
            }}
         >
            {(props) => <NotesListScreen {...props} userName={userName} />}
         </Tab.Screen>

         <Tab.Screen
            name="NoteScreen"
            style={styles.tabScreen}
            options={{
               /**
               * tabBarVisible + tabBarButton permettent de masquer l'icône de la tapBar.
               */
               tabBarVisible: false,
               tabBarButton: (props) => null,
               tabBarLabel: `Note`,
               tabBarActiveTintColor: "#917FB3",
               tabBarInactiveTintColor: "#E5BEEC",
               tabBarIcon: ({ color, size }) => (
                  <FoundationIcons name="page-search" color={color} size={size} />
               ),
               title: `Note de ${userName || "Invité"}`,
            }}
         >
            {(props) => <NoteScreen {...props} userName={userName} />}
         </Tab.Screen>

         <Tab.Screen
            name="NoteEditScreen"
            style={styles.tabScreen}
            options={{
               /**
               * tabBarVisible + tabBarButton permettent de masquer l'icône de la tapBar.
               */
               tabBarVisible: false,
               tabBarButton: (props) => null,
               tabBarLabel: `Modifier une note`,
               tabBarActiveTintColor: "#917FB3",
               tabBarInactiveTintColor: "#E5BEEC",
               tabBarIcon: ({ color, size }) => (
                  <FoundationIcons name="page-search" color={color} size={size} />
               ),
               title: `Modifier une note`,
            }}
         >
            {(props) => <NoteEditScreen {...props} userName={userName} />}
         </Tab.Screen>
      </Tab.Navigator>
   )
}

const styles = StyleSheet.create({
   tabScreen: {
      color: colors.LIGHT,
   }
})
export default NavigationTabs;