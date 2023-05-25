import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import colors from '../shared/theme/colors';
import { RoundIconBtn } from '../components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../shared/context/NoteProvider";
import { reverseIntDatas } from "../shared/functions/SortFunctions";

const NoteListScreen = ({ userName, navigation }) => {

   const [name, setName] = useState("");
   const [modalVisible, setModalVisible] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const { notes, setNotes, findNotes } = useNotes();
   const [resultNotFound, setResultNotFound] = useState(false);
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         findNotes();
         setRefreshing(false);
      }, 325);
   }, []);

   useEffect(() => {
      if (userName !== "" && name !== "" && userName !== name) {
         setName(userName);
      }
      findNotes();
   }, []);

   const reverseNotes = reverseIntDatas(notes);

   const toggleModal = () => {
      setModalVisible(!modalVisible);
   }

   const handleSubmit = async (title, description) => {
      let author = (userName !== undefined && userName !== null) ? userName : null;

      const actualTime = Date.now();

      const note = {
         id: actualTime,
         title: title,
         description: description,
         author: author,
         created_at: actualTime,
      };
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);

      await AsyncStorage.setItem("@notes", JSON.stringify(updatedNotes));
   }

   return (
      <View style={styles.container}>
         {!notes.length ?
            <View
               style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
            >
               <Text style={styles.emptyHeader}>
                  Add notes
               </Text>
            </View>
            : null}
            <View style={styles.addBtnContainer}>
               <RoundIconBtn
                  iconName="clipboard-pencil"
                  iconType="foundation"
                  style={styles.addBtn}
                  color={colors.WHITE}
                  onPress={toggleModal}
               />
            </View>
      </View>
   )

}

const styles = StyleSheet.create({
   container: {
      flex:1,
      backgroundColor: colors.ULTRALIGHT,
      justifyContent: "flex-start",
      paddingVertical:6,
      paddingHorizontal:12,
      zIndex:1,
   },
   emptyHeaderContainer: {

   },
   emptyHeader: {

   },
   addBtnContainer: {

   },
   addBtn: {
      
   },
});

export default NoteListScreen;