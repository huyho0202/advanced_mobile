import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import {CourseHorizontalItem} from '../../components/Course';
import EmptyComponent from '../../components/EmptyComponent';
import {Distance, Styles, Typography, BoxModel, Size} from '../../styles';
import Banner from '../../components/Banner';
import backgroundImage02 from '../../assets/image/backgroundImage.jpg';
import SeeAllBtn from '../../components/common/see-all-button';
import {
  ShowListCourseScreenName,
  CourseDetailScreenName,
  CourseDetailScreenStack,
} from '../../Constants/ScreenName';
import {ThemeContext} from '../../Provider/Theme';
import {CategoryContext} from '../../Provider/Category';
import {AuthenticationContext} from '../../Provider/Authentication';
import {
  topNewCourseAPI,
  topRateCourseAPI,
  topSellerCourseAPI,
  topCourseUserFavorite,
} from '../../services/Courses';
import p from 'pretty-format';
const Home = (props) => {
  const {navigation, route} = props;
  // const {listCategory, setListCategory} = useContext(CategoryContext);
  const {theme} = useContext(ThemeContext);
  const [state1, setState1] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);
  const [state4, setState4] = useState([]);

  const fetchDataState1 = async () => {
    try {
      let response = await topNewCourseAPI();
      setState1(response.data.payload);
    } catch ({response}) {
      console.log(p(response));
    }
  };
  const fetchDataState2 = async () => {
    try {
      let response = await topSellerCourseAPI();
      setState2(response.data.payload);
    } catch ({response}) {
      console.log(p(response));
    }
  };
  const fetchDataState3 = async () => {
    try {
      let response = await topRateCourseAPI();
      setState3(response.data.payload);
    } catch ({response}) {
      console.log(p(response));
    }
  };
  useEffect(() => {
    fetchDataState1();
    fetchDataState2();
    fetchDataState3();
  }, []);

  const onPressEmptyComponent = (title) => {
    navigation.navigate(ShowListCourseScreenName, {
      title: title,
    });
  };
  const onPressBanner = () => {};
  const onPressItem = (item) => {
    navigation.navigate(CourseDetailScreenStack, {
      screen: CourseDetailScreenName,
      params: {id: item.id},
    });
  };

  const showListCourse = (title) => {
    navigation.navigate(ShowListCourseScreenName, {
      title: title,
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundColor}}>
      <ScrollView>
        <Banner
          backgroundImage={backgroundImage02}
          name="Stay at Home"
          onPress={onPressBanner}
        />
        <View style={styles.titleContainer}>
          <Text
            style={[
              Styles.titleRow,
              Typography.fontBold,
              {color: theme.primaryTextColor},
            ]}>
            New Releases
          </Text>
          <SeeAllBtn onPress={() => showListCourse('NewRelease')} />
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={state1}
          renderItem={({item}) => (
            <CourseHorizontalItem
              item={item}
              onPress={() => onPressItem(item)}
            />
          )}
          keyExtractor={(item, index) => item + index}
          getItemLayout={(data, index) => ({
            length: Size.scaleSize(200),
            offset: Size.scaleSize(200) * index,
            index,
          })}
        />
        <View style={styles.titleContainer}>
          <Text
            style={[
              Styles.titleRow,
              Typography.fontBold,
              {color: theme.primaryTextColor},
            ]}>
            Best Seller
          </Text>
          <SeeAllBtn onPress={() => showListCourse('BestSeller')} />
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={state2}
          renderItem={({item}) => (
            <CourseHorizontalItem
              item={item}
              onPress={() => onPressItem(item)}
            />
          )}
          keyExtractor={(item, index) => item + index}
          getItemLayout={(data, index) => ({
            length: Size.scaleSize(200),
            offset: Size.scaleSize(200) * index,
            index,
          })}
        />
        {state3.length === 0 ? (
          <EmptyComponent
            title="Top Rating"
            icon="book-open"
            message="Coming Soon "
          />
        ) : (
          <View>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  Styles.titleRow,
                  Typography.fontBold,
                  {color: theme.primaryTextColor},
                ]}>
                Top Rating
              </Text>
              <SeeAllBtn onPress={() => showListCourse('TopRating')} />
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={state3}
              renderItem={({item}) => (
                <CourseHorizontalItem
                  item={item}
                  onPress={() => onPressItem(item)}
                />
              )}
              keyExtractor={(item, index) => item + index}
              getItemLayout={(data, index) => ({
                length: Size.scaleSize(200),
                offset: Size.scaleSize(200) * index,
                index,
              })}
            />
          </View>
        )}

        {state4.length === 0 ? (
          <EmptyComponent
            title="Your Favorite"
            icon="book-open"
            message="Coming Soon "
          />
        ) : (
          <View>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  Styles.titleRow,
                  Typography.fontBold,
                  {color: theme.primaryTextColor},
                ]}>
                Your Favorite
              </Text>

              <SeeAllBtn onPress={() => showListCourse('YourFavorite')} />
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={state4}
              renderItem={({item}) => (
                <CourseHorizontalItem
                  item={item}
                  onPress={() => onPressItem(item)}
                />
              )}
              keyExtractor={(item, index) => item + index}
              getItemLayout={(data, index) => ({
                length: Size.scaleSize(200),
                offset: Size.scaleSize(200) * index,
                index,
              })}
            />
          </View>
        )}
        <EmptyComponent
          title="My channels"
          icon="radio"
          message="Use channels to save, organize, save and share content to accomplish your learning objectives"
        />
        <EmptyComponent
          title="Bookmarks"
          icon="bookmark"
          message="Use bookmarks to quickly save courses for later"
        />

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {height: Distance.spacing_20},
  titleContainer: {
    ...BoxModel.marginHorizontal,
    ...Styles.rowBetween,
    height: Distance.medium,
  },
});

export default Home;
