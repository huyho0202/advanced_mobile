import React from 'react';
import {SafeAreaView} from 'react-native';
import {ListCourseVertical} from '../../components/ListCourseVertical';
const ListCourse = (props) => {
  const {navigation, route} = props;
  return (
    <SafeAreaView>
      <ListCourseVertical navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default ListCourse;
