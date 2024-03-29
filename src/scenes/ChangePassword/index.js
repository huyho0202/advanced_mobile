import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';
import {FormInput, PrimaryButton} from '../../components/Authentication';

import {Styles, Colors, Typography, Platform} from '../../styles';
import {CheckBox} from 'react-native-elements';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {UPDATE_PASSWORD} from '../../Constants/API';
import {ThemeContext} from '../../Provider/Theme';
import {AuthenticationContext} from '../../Provider/Authentication';
import {API} from '../../services';
import {LocalizeContext} from '../../Provider/Localize';
const ChangePassword = (props) => {
  const {theme} = useContext(ThemeContext);
  const {state} = useContext(AuthenticationContext);
  const [activeBtn, setActiveBtn] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const {getItem, setItem} = useAsyncStorage('@userToken');
  const {localize} = useContext(LocalizeContext);
  useEffect(() => {
    if (oldPass !== '' && newPass !== '') {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [newPass, oldPass]);
  console.disableYellowBox = true;

  const onChangePassword = (pass) => {
    setOldPass(pass);
  };
  const onChangeNewPassword = (pass) => {
    setNewPass(pass);
  };
  const onPressShowPass = () => {
    setShowPass(!showPass);
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await setItem(jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const handleChangePassWord = async () => {
    const item = await getItem();
    if (item !== null) {
      try {
        const jsonValue = JSON.parse(item);

        let response = await API.post(
          UPDATE_PASSWORD,
          {
            id: state.userInfo.id,
            oldPass: oldPass,
            newPass: newPass,
          },
          state.token,
        );
        if (response.isSuccess) {
          Alert.alert(response.data.message);

          let value = {email: jsonValue.email, password: newPass};
          storeData(value);
        } else {
          Alert.alert(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        Styles.mainCenter,
        {backgroundColor: theme.backgroundColor},
      ]}
      behavior={Platform.Ios ? 'padding' : 'height'}>
      <FormInput
        placeholder={localize.oldPass}
        value={oldPass}
        onChangeText={onChangePassword}
        autoCorrect={false}
        secureTextEntry={!showPass}
        returnKeyType={'next'}
      />
      <FormInput
        placeholder={localize.newPass}
        value={newPass}
        onChangeText={onChangeNewPassword}
        autoCorrect={false}
        secureTextEntry={!showPass}
        returnKeyType={'done'}
      />
      <CheckBox
        title={localize.showPass}
        checked={showPass}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{backgroundColor: Colors.overlayColor, borderWidth: 0}}
        textStyle={{...Typography.fontRegular}}
        onPress={onPressShowPass}
      />
      <PrimaryButton
        title={localize.profilePassword}
        onPress={handleChangePassWord}
        active={activeBtn}
      />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ChangePassword;
