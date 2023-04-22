import React from 'react';
import { StyleSheet, View } from 'react-native';
const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style}}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    elevation: 0,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 8,

  }
});
export default Card;