import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    //can change permissions on fb developers app to have
    //testers to login, until then, only I can
    //This drops the token to make sure the login is still working
    //AsyncStorage.removeItem('fb_token');
    //if token exists, navigate user to map screen
    this.onAuthComplete(this.props);
  }
  //called when component is just about to re-render
  //called when user successfully logs in
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions) (AuthScreen);

