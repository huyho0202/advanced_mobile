import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  SectionList,
  TouchableHighlight,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Collapsible from 'react-native-collapsible';
import {API} from '../../services';
import {COURSE_DETAIL} from '../../Constants/API';
import {AuthenticationContext} from '../../Provider/Authentication';
import {useSafeArea} from 'react-native-safe-area-context';
import {Size, Colors, Typography, Styles, BoxModel} from '../../styles';
import * as screenName from '../../Constants/ScreenName';
import Header from '../../components/CourseDetail/HeaderComponent';
import {ThemeContext} from '../../Provider/Theme';
import p from 'pretty-format';
const CourseDetail = (props) => {
  const {theme} = useContext(ThemeContext);
  const {navigation, route} = props;
  const {state} = useContext(AuthenticationContext);
  const [item, setItem] = useState({});
  const [collapsibleItems, setCollapsibleItems] = useState([]);
  const insets = useSafeArea();
  // console.log(item);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await API.get(
          `${COURSE_DETAIL}/${route.params.id}/null`,
        );
        if (response.isSuccess) {
          setItem(response.data.payload);
        }
      } catch ({response}) {
        console.log(p(response.data));
      }
    };
    fetchData();
  }, [route.params.id]);
  const flatListSeparator = () => {
    return (
      <View
        style={[
          styles.separator,
          {backgroundColor: theme.backgroundSeeAllButton},
        ]}
      />
    );
  };
  const onPressHeader = (section) => {
    const newIds = [...collapsibleItems];
    const index = newIds.indexOf(section.data[0].sectionId);
    if (index > -1) {
      newIds.splice(index, 1);
    } else {
      newIds.push(section.data[0].sectionId);
    }
    setCollapsibleItems(newIds);
    // setExpand(!isExpand);
  };
  const renderHeader = (section) => {
    const {title} = section;
    return (
      <TouchableHighlight
        style={[
          styles.headerTouchable,
          {backgroundColor: theme.backgroundSeeAllButton},
        ]}
        onPress={() => onPressHeader(section)}
        underlayColor={theme.backgroundSeeAllButton}>
        <View
          style={[
            styles.headerContainer,
            {backgroundColor: theme.backgroundSeeAllButton},
          ]}>
          <Text style={[styles.textHeader, {color: theme.primaryTextColor}]}>
            {title}
          </Text>
          {collapsibleItems.includes(section.data[0].sectionId) ? (
            <MaterialIcons
              name="expand-less"
              size={15}
              color={theme.primaryTextColor}
            />
          ) : (
            <MaterialIcons
              name="expand-more"
              size={15}
              color={theme.primaryTextColor}
            />
          )}
        </View>
      </TouchableHighlight>
    );
  };

  const renderListItem = (itemLesson) => {
    // console.log(itemLesson);
    return (
      <Collapsible collapsed={collapsibleItems.includes(itemLesson.sectionId)}>
        <TouchableHighlight
          onPress={() => onPressPreviewLesson(itemLesson)}
          underlayColor={theme.overlayColor}>
          <View
            style={[styles.textContainer, {backgroundColor: theme.themeColor}]}>
            <Text style={[styles.textContent, {color: theme.primaryTextColor}]}>
              {itemLesson.name}
            </Text>
            {itemLesson.isPreview ? (
              <View
                style={[
                  styles.previewContainer,
                  {borderColor: theme.primaryColor},
                ]}>
                <Text style={[styles.previewText, {color: theme.primaryColor}]}>
                  Preview
                </Text>
              </View>
            ) : undefined}
          </View>
        </TouchableHighlight>
      </Collapsible>
    );
  };

  const onPressPreviewLesson = (itemLesson) => {
    if (itemLesson.videoUrl && itemLesson.isPreview) {
      navigation.navigate(screenName.PlayVideoScreenName, {
        urlVideo: itemLesson.videoUrl,
        typeUploadVideoLesson: item.typeUploadVideoLesson,
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={[styles.container, {backgroundColor: theme.themeColor}]}>
        <View
          style={[styles.mainContainer, {backgroundColor: theme.themeColor}]}>
          <SectionList
            ItemSeparatorComponent={flatListSeparator}
            sections={
              item.section
                ? item.section.map((data) => {
                    return {
                      title: data.name,
                      data: data.lesson,
                    };
                  })
                : []
            }
            keyExtractor={(itemLesson, index) => itemLesson + index}
            renderItem={({item}) => renderListItem(item)}
            renderSectionHeader={({section}) => renderHeader(section)}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <Header navigation={navigation} route={route} item={item} />
              );
            }}
            ListFooterComponent={() => {
              return (
                <View
                  style={[
                    styles.footer,
                    {
                      marginBottom: insets.bottom,
                      backgroundColor: theme.themeColor,
                    },
                  ]}
                />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Size.HEIGHT,
  },

  mainContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  footer: {height: 40},
  separator: {
    height: 1,
  },
  headerTouchable: {
    height: 50,
  },
  headerContainer: {
    height: 50,
    ...Styles.rowBetween,
    marginHorizontal: 20,
  },
  textHeader: {
    fontSize: Typography.fontSize14,
    ...Typography.fontBold,
  },
  maxHeightText: {
    height: null,
  },
  minHeightText: {
    height: 0,
  },
  textContent: {
    marginHorizontal: 20,
    ...Typography.fontRegular,
  },
  textContainer: {
    height: Size.scaleSize(50),
    ...Styles.rowBetween,
  },
  checkContainer: {
    marginRight: 20,
  },
  image: {
    resizeMode: 'cover',
  },
  previewContainer: {
    borderWidth: 1,
    ...BoxModel.tinyPadding,

    ...BoxModel.marginHorizontal,
  },
  previewText: {
    ...Typography.fontRegular,
    fontSize: Typography.fontSize14,
  },
});
export default CourseDetail;
