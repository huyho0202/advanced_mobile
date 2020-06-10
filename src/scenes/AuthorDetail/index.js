import React from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import {Colors} from '../../styles';
import data from '../../ExampleData/course';
import {CourseVerticalItem} from '../../components/ListCourseVertical';
import {Header} from '../../components/AuthorDetail';
import {CourseDetailScreenName} from '../../config/ScreenName';
const AuthorDetail = (props) => {
  const {navigation, route} = props;
  const onPressItem = (item) => {
    navigation.navigate(CourseDetailScreenName);
  };
  const flatListSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={data}
          ItemSeparatorComponent={flatListSeparator}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <CourseVerticalItem onPressItem={onPressItem} item={item} />
          )}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => {
            return <Header name={route.params.name} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
export default AuthorDetail;
