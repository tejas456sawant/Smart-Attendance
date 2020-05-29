/** @format */

import React, { Component } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { Button, Block, Input, Text } from "../components";
import { theme, BACKENDURL } from "../constants";
import Axios from "axios";
import registerForPushNotificationsAsync from "../constants/registerForPushNotificationsAsync";
import Loading from "../constants/Loading";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  componentDidMount() {
    AsyncStorage.getItem("@App:email").then((data) => {
      console.log(data);
      if (data !== null) {
        registerForPushNotificationsAsync();
        return this.props.navigation.navigate("Browse");
      }
    });
  }

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (email === "" || password === "") {
      return alert("Please Check Input Fields :( ");
    }

    Axios.post(`${BACKENDURL}/login/`, { email, password })
      .then((user) => {
        if (email === user.data) {
          AsyncStorage.setItem("@App:email", user.data);
          return navigation.navigate("Browse");
        } else {
          return alert("User Not Found :(");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ errors, loading: false });
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior='padding'>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Login
          </Text>
          <Block middle>
            <Input
              label='Email'
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
            <Input
              secure
              label='Password'
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              <Text bold white center>
                Login
              </Text>
            </Button>
            <Loading loading={this.state.loading} />
            <Button onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
