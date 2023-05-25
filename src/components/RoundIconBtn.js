import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';
import colors from '../shared/theme/colors';

const RoundIconBtn = ({ iconName, iconType, size, color, style, onPress }) => {
   return (
      <Icon
         type={iconType || "antdesign"}
         name={iconName}
         size={size || 24}
         color={color || colors.LIGHT}
         style={[styles.icon, { ...style }]}
         onPress={onPress}
      />
   );
}

const styles = StyleSheet.create({
   icon: {
      backgroundColor: colors.PRIMARY,
      padding: 24,
      borderRadius: 50,
      alignSelf: "center",
      elevation: 2,
      shadowRadius: 50,
      shadowColor: colors.DARK,
      margin: 12,
      aspectRatio: 1 / 1,
      zIndex: 3,
   }
})

export default RoundIconBtn;