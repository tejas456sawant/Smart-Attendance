/** @format */

import React, { Component } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme, BACKENDURL } from "../constants";
import Axios from "axios";

export default class Forgot extends Component {
  state = {
    email: "abc@gmail.com",
    errors: [],
  };

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();

    Axios.post(`${BACKENDURL}/updateInfo/forgetPassword/`, {
      emailAddress: email,
    })
      .then((data) => {
        Alert.alert(
          data.data.head,
          data.data.text,
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ],
          { cancelable: false },
        );
      })
      .catch((data) => {
        Alert.alert(
          "Error",
          "Please check you Email address.",
          [{ text: "Try again" }],
          { cancelable: false },
        );
      });
  }

  render() {
    const { navigation } = this.props;
    const { errors } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.forgot} behavior='padding'>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Forgot
          </Text>
          <Block middle>
            <Input
              label='Email'
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
            <Button gradient onPress={() => this.handleForgot()}>
              <Text bold white center>
                Forgot
              </Text>
            </Button>

            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  forgot: {
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
