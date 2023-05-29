import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from "../shared/theme/colors";
import { getWidth } from "../shared/constants/ScreenSize"

const Note = ({ item, onPress }) => {
   const { title, description, author } = item;
   return (
         <TouchableOpacity 
            style={styles.container}
            onPress={onPress}
         >
            <Text numberOfLines={2} style={styles.title}>
               {title}
            </Text>
            <Text numberOfLines={2} style={styles.description}>
               {description}
            </Text>
            {author !== null ? <Text numberOfLines={2} style={styles.author}>
               DE : {author}
            </Text> : null}
         </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   container: {
      width: (getWidth() / 2) - 50,
      alignSelf: "center",
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: colors.SECONDARY,
      margin: 12,
      borderRadius: 6,
   },
   title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 12,
      color: colors.BLACK,
   },
   description: {
      minHeight: 48,
      fontSize: 18,
      color: colors.BLACK,
   },
   author: {
      minHeight: 20,
      fontSize: 12,
      color: colors.BLACK,
      opacity: 0.5,
   }
})

export default Note;
