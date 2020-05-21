import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import colors from '../../../../styles/color';
const Author = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 100,
    marginLeft: 15,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    color: colors.blackTitleColor,
  },
});
export default Author;
