import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import {Size} from '../../styles';
import {CourseVerticalItem} from '../../components/Course';
import {Header} from '../../components/AuthorDetail';
import {INSTRUCTOR_DETAIL} from '../../Constants/API';
import {API} from '../../services';

import {
  CourseDetailScreenName,
  LessonCourseScreenStack,
} from '../../Constants/ScreenName';
import {ThemeContext} from '../../Provider/Theme';
const AuthorDetail = (props) => {
  const {navigation, route} = props;
  const {theme} = useContext(ThemeContext);
  const [data, setData] = useState({});
  console.log(route);
  useEffect(() => {
    const fetchInstructorDetail = async () => {
      try {
        let response = await API.get(`${INSTRUCTOR_DETAIL}${route.params.id}`);
        setData(response.data.payload);
      } catch ({response}) {
        console.log(response);
      }
    };
    fetchInstructorDetail();
  }, [route.params.id]);
  const onPressItem = (item) => {
    navigation.navigate(CourseDetailScreenName, {id: item.id});
  };
  const flatListSeparator = () => {
    return (
      <View
        style={[styles.separator, {backgroundColor: theme.backgroundColor}]}
      />
    );
  };
  return (
    <SafeAreaView
      style={{backgroundColor: theme.backgroundColor, height: '100%'}}>
      <FlatList
        data={data.courses}
        ItemSeparatorComponent={flatListSeparator}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CourseVerticalItem onPressItem={onPressItem} item={item} />
        )}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={() => {
          return <Header data={data} />;
        }}
        getItemLayout={(data, index) => ({
          length: Size.scaleSize(100),
          offset: Size.scaleSize(100) * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});
export default AuthorDetail;
