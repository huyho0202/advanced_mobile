import React, {useContext} from 'react';
import {SectionList, View, Text} from 'react-native';
import {Styles, Size, Typography, BoxModel} from '../../../styles';
import {ThemeContext} from '../../../Provider/Theme';
import {SearchContext} from '../../../Provider/Search';
import SeeAllBtn from '../../common/see-all-button';
import {
  SearchCourseScreenName,
  SearchAuthorScreenName,
  AuthorDetailScreenName,
  CourseDetailScreenName,
} from '../../../Constants/ScreenName';
import {CourseVerticalItem} from '../../Course';
import {AuthorVerticalItem} from '../../Author';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LocalizeContext} from '../../../Provider/Localize';
const AllResultTopTab = (props) => {
  const {theme} = useContext(ThemeContext);
  const {navigation} = props;
  const {searchData} = useContext(SearchContext);
  const {localize} = useContext(LocalizeContext);
  const {
    searchTry,
    searchErr,
    searchCourse,
    searchAuthor,
    searchResult,
  } = localize;
  const flatListSeparator = () => {
    return (
      <View style={[Styles.separator, {backgroundColor: theme.DialogColor}]} />
    );
  };
  const onPressAuthor = (item) => {
    navigation.navigate(AuthorDetailScreenName, {
      id: item.id,
    });
  };
  const onPressItem = (item) => {
    navigation.navigate(CourseDetailScreenName, {id: item.id});
  };
  const showAll = (e) => {
    if (e === searchCourse) {
      navigation.jumpTo(SearchCourseScreenName);
    }
    if (e === searchAuthor) {
      navigation.jumpTo(SearchAuthorScreenName);
    }
  };
  const renderResultNumber = (title) => {
    if (title === searchCourse) {
      return `${searchData.courses.total} ${searchResult}`;
    } else {
      return `${searchData.instructors.total} ${searchResult}`;
    }
  };
  const renderHeader = (title) => {
    return (
      <View
        style={[
          Styles.rowBetween,
          {
            height: Size.scaleSize(40),
            backgroundColor: theme.backgroundSeeAllButton,
          },
        ]}>
        <Text
          style={[
            Styles.titleRow,
            Typography.fontBold,
            {color: theme.primaryTextColor},
          ]}>
          {title}
        </Text>
        <SeeAllBtn
          title={renderResultNumber(title)}
          onPress={() => showAll(title)}
        />
      </View>
    );
  };
  const renderListItem = (item) => {
    // return <Text>1</Text>;
    if (searchData.courses) {
      if (searchData.courses.data.includes(item)) {
        return <CourseVerticalItem onPressItem={onPressItem} item={item} />;
      }
    }
    if (searchData.instructors) {
      if (searchData.instructors.data.includes(item)) {
        return <AuthorVerticalItem onPressItem={onPressAuthor} item={item} />;
      }
    }
  };
  const renderResult = () => {
    if (searchData.instructors.total === 0 && searchData.courses.total === 0) {
      return (
        <View style={[Styles.columnCenter, Styles.maxHeight]}>
          <FontAwesome5 name="link" size={70} color={theme.primaryColor} />
          <Text
            style={[
              Typography.fontBold,
              BoxModel.marginVertical,
              {fontSize: Typography.fontSize20, color: theme.primaryTextColor},
            ]}>
            {searchErr}
          </Text>
          <Text
            style={[
              Typography.fontRegular,
              {fontSize: Typography.fontSize18, color: theme.grayColor},
            ]}>
            {searchTry}
          </Text>
        </View>
      );
    } else {
      return (
        <SectionList
          ItemSeparatorComponent={flatListSeparator}
          sections={[
            {title: searchCourse, data: searchData.courses.data},
            {
              title: searchAuthor,
              data: searchData.instructors.data,
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => renderListItem(item)}
          renderSectionHeader={({section: {title}}) => renderHeader(title)}
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
          style={[Styles.maxHeight, {backgroundColor: theme.backgroundColor}]}
        />
      );
    }
  };
  return (
    <View>
      {searchData.instructors && searchData.courses
        ? renderResult()
        : undefined}
    </View>
  );
};
export default AllResultTopTab;
