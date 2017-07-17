import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

//How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');
//async await system new for promises in ES7
//replacing .then

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      //Dispatch an action saying FB login is done
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
      //Start FB Login process, passing dispatch into helper function
      doFacebookLogin(dispatch);
    }
  };

//not an action creator, so no dispatch
//this is just one function, a helper function with async
const doFacebookLogin = async dispatch => {
  //type prop indicates whether auth was successful
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('450217348693836', {
    permissions: ['public_profile']
  });

  //if login fails
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
};
