import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import colors from '../shared/theme/colors';
import { NoteDetails, RoundIconBtn, NoteInputModal } from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../shared/context/NoteProvider';

const NoteScreen = ({ userName, route, navigation }) => {

   const [note, setNote] = useState(route.params.note);

   const { setNotes } = useNotes();

   const [isEdit, setIsEdit] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [name, setName] = useState("");

   useEffect(() => {
      if (userName !== "" && name !== "" && userName !== name) {
         setName(userName);
      }
   }, []);

   const deleteNote = async () => {
      const result = await AsyncStorage.getItem("@notes");
      let notes = [];
      if (result !== null) {
         notes = JSON.parse(result);
      }

      const newNotes = notes.filter(item => item.id !== note.id);
      await AsyncStorage.setItem("@notes", JSON.stringify(newNotes));
      setNotes(newNotes);
      navigation.goBack();
   }

   const displayDeleteAlert = () => {
      Alert.alert("Supprimer la note", "Souhaitez-vous supprimer cette note ?", [
         {
            text: "Annuler",
         },
         {
            text: "Supprimer",
            onPress: deleteNote
         }
      ],
         {
            cancelable: true,
         }
      );
   }

   const handleUpdate = async (title, description, time) => {
      const result = await AsyncStorage.getItem("@notes");
      let notes = [];
      if(result !== null){
         notes = JSON.parse(result);
      }

      const newNotes = notes.filter(thisNote => {
         if(thisNote.id === note.id){
            thisNote.title = title;
            thisNote.description = description;
            thisNote.isUpdated = true;
            thisNote.time = time;

            setNote(thisNote);
         }
         return thisNote;
      });

      setNotes(newNotes);
      await AsyncStorage.setItem("@notes", JSON.stringify(newNotes));
   }

   const toggleModal = () => {
      setShowModal(!showModal);
   };

   const openEditModal = () => {
      setIsEdit(true);
      toggleModal();
   }

   return (
      <View style={styles.container}>
         <NoteDetails
            note={note}
         />
         <View style={styles.btnsContainer}>
            <RoundIconBtn
               iconName="arrow-left"
               iconType="foundation"
               size={24}
               color={colors.WHITE}
               style={styles.returnBtn}
               onPress={() => navigation.goBack()}
            />
            <RoundIconBtn
               iconName="trash"
               iconType="foundation"
               size={36}
               color={colors.WHITE}
               style={styles.deleteBtn}
               onPress={() => displayDeleteAlert()}
            />
            <RoundIconBtn
               iconName="pencil"
               iconType="foundation"
               size={24}
               color={colors.WHITE}
               style={styles.modifyBtn}
               onPress={openEditModal}
            />
         </View>
         {showModal ? <NoteInputModal
            isEdit={isEdit}
            note={note}
            toggleModal={toggleModal}
            modalRequestClose={() => {
               Alert.alert("Quitter", "Souhaitez-vous quitter l'ajout de note ?", [
                  {
                     text: 'Non',
                  },
                  {
                     text: 'Oui',
                     onPress: () =>
                        toggleModal()
                  },
               ]);
            }}
            onSubmit={handleUpdate}
            visible={showModal}

         /> : null}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.ULTRALIGHT,
      justifyContent: 'center',
   },
   header: {
      fontSize: 25,
      fontWeight: "900",
   },
   btnsContainer: {
      width: "100%",
      maxHeight: 84,
      overflow: "hidden",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 12,
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 2,
   },
   checkBtn: {
      padding: 12,
   },
   returnBtn: {
      padding: 9,
      backgroundColor: colors.PRIMARY,
   },
   deleteBtn: {
      padding: 9,
      backgroundColor: colors.ERROR,
   },
   modifyBtn: {
      padding: 9,
      backgroundColor: colors.PRIMARY,
   }
})

export default NoteScreen;