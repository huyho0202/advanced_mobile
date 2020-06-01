import React from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import Item from '../PathItem';
import SeeAllBtn from '../../common/see-all-button';
import {Styles, BoxModel, Distance, Typography} from '../../../styles';
import {ShowListPathScreenName} from '../../../config/ScreenName';
const Path = (props) => {
  const {navigation, route, data} = props;
  const seeAllPath = () => {
    navigation.navigate(ShowListPathScreenName);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[Styles.titleRow, Typography.fontBold]}>
          {props.title}{' '}
        </Text>
        <SeeAllBtn onPress={seeAllPath} />
      </View>
      <FlatList
        data={data.slice(0, 5)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Item
            navigation={navigation}
            route={route}
            name={item.name}
            numberOfCourse={item.numberOfCourse}
            totalHour={item.totalHour}
            key={item.id}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  titleContainer: {
    ...BoxModel.smallMargin,
    ...Styles.rowBetween,
    height: Distance.medium,
  },
});
export default Path;
