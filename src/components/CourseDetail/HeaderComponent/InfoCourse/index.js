import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Typography} from '../../../../styles';
import {Rating} from 'react-native-ratings';

const InfoCourse = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.level}</Text>
      <Text style={styles.text}>.</Text>
      <Text style={styles.text}>{props.timeToStart}</Text>
      <Text style={styles.text}>.</Text>
      <Text style={styles.text}>{props.totalHour}</Text>
      <Rating
        readonly={true}
        imageSize={12}
        startingValue={props.rate}
        ratingCount={5}
        style={styles.rating}
      />
      <Text style={styles.text}>({props.totalRate})</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  text: {
    color: Colors.grayDarkColor,
    marginLeft: 5,
    fontSize: 13,
    ...Typography.fontRegular,
  },
  divider: {
    color: Colors.grayDarkColor,
  },
  rating: {
    marginLeft: 10,
  },
});
export default InfoCourse;
