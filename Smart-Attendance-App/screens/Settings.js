/** @format */

import React, { Component } from "react";
import { Image, ScrollView, AsyncStorage, StyleSheet } from "react-native";
import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, BACKENDURL } from "../constants";
import Axios from "axios";

class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
    StudentName: "",
    StudentEnrollment: "",
    StudentPhone: "",
    StudentEmail: "",
    StudentImage:
      "https://cdn1.iconfinder.com/data/icons/education-1-15/151/26-512.png",
    loading: false,
  };

  componentDidMount() {
    if (AsyncStorage.getItem("@App:email")) {
      AsyncStorage.getItem("@App:email").then((data) => {
        Axios.get(`${BACKENDURL}/users/getInfo/${data.toString()}`).then(
          (user) => {
            this.setState({
              StudentName: user.data.StudentName,
              StudentEnrollment: user.data.StudentEnrollment,
              StudentPhone: user.data.StudentPhone,
              StudentEmail: user.data.StudentEmail,
              StudentImage: user.data.StudentImage,
            });
          },
        );
      });
      AsyncStorage.getItem("@App:notification").then((notificationStatus) => {
        if (notificationStatus === "granted")
          this.setState({
            notifications: true,
          });
        else
          this.setState({
            notifications: false,
          });
      });
    } else {
      this.props.navigation.navigate("Login");
    }

    this.setState({
      profile: this.props.profile,
    });
  }

  handleLogout = () => {
    AsyncStorage.removeItem("@App:email");
    this.props.navigation.navigate("Login");
  };
  render() {
    const { loading } = this.state;

    return (
      <Block>
        <Block flex={false} row center space='between' style={styles.header}>
          <Text h1 bold>
            Settings{" "}
          </Text>{" "}
          <Button>
            <Image
              source={{
                uri: this.state.StudentImage,
              }}
              style={styles.avatar}
            />{" "}
          </Button>{" "}
        </Block>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Block style={styles.inputs}>
            <Block row space='between' margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text
                  gray2
                  style={{
                    marginBottom: 10,
                  }}>
                  Name{" "}
                </Text>{" "}
                <Text bold> {this.state.StudentName} </Text>{" "}
              </Block>{" "}
            </Block>{" "}
            <Block row space='between' margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text
                  gray2
                  style={{
                    marginBottom: 10,
                  }}>
                  Enrollment{" "}
                </Text>{" "}
                <Text bold> {this.state.StudentEnrollment} </Text>{" "}
              </Block>{" "}
            </Block>{" "}
            <Block row space='between' margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text
                  gray2
                  style={{
                    marginBottom: 10,
                  }}>
                  Phone{" "}
                </Text>{" "}
                <Text bold> {this.state.StudentPhone} </Text>{" "}
              </Block>{" "}
            </Block>{" "}
            <Block row space='between' margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text
                  gray2
                  style={{
                    marginBottom: 10,
                  }}>
                  E - mail{" "}
                </Text>{" "}
                <Text bold> {this.state.StudentEmail} </Text>{" "}
              </Block>{" "}
            </Block>{" "}
          </Block>
          <Divider margin={[theme.sizes.base, theme.sizes.base * 1]} />
          <Block style={styles.toggles}>
            <Block row center space='between'>
              <Text gray2> Notifications </Text>{" "}
              <Switch
                value={this.state.notifications}
                onValueChange={(value) =>
                  this.setState({
                    notifications: value,
                  })
                }
              />{" "}
            </Block>{" "}
          </Block>{" "}
          <Divider margin={[theme.sizes.base, theme.sizes.base * 1]} />{" "}
          <Block padding={[0, theme.sizes.base * 2]}>
            <Block middle>
              <Button gradient onPress={() => this.handleLogout()}>
                <Text bold white center>
                  Logout{" "}
                </Text>{" "}
              </Button>{" "}
            </Block>{" "}
          </Block>{" "}
        </ScrollView>{" "}
      </Block>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 100,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
