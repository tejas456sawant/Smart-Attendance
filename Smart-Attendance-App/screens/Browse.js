/** @format */

import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
} from "react-native";
import { Button, Block, Text } from "../components";
import { BACKENDURL } from "../constants";
import { Notifications } from "expo";
const { width } = Dimensions.get("window");
import registerForPushNotificationsAsync from "../constants/registerForPushNotificationsAsync";
import { BarChart } from "react-native-chart-kit";
import Axios from "axios";
import Details from "../components/Details";
import { theme } from "../constants";

class Browse extends Component {
  state = {
    active: "Attendance",
    categories: [],
    img: "https://cdn1.iconfinder.com/data/icons/education-1-15/151/26-512.png",
    notification: {},
    AttendanceData: {
      lecture: [],
      percent: [],
    },
  };

  componentDidMount() {
    registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification,
    );

    if (AsyncStorage.getItem("@App:email")) {
      AsyncStorage.getItem("@App:email").then((data) => {
        Axios.get(`${BACKENDURL}/users/getInfo/${data.toString()}`).then(
          (student) => {
            this.setState({
              img: student.data.StudentImage,
            });
            Axios.get(
              `${BACKENDURL}/get/subjects/report-${student.data.StudentDivision}`,
            ).then((subjects) => {
              Axios.post(`${BACKENDURL}/showattendance/student`, {
                enrollment: student.data.StudentEnrollment,
                subjects: subjects.data,
              }).then(({ data }) => {
                this.setState({
                  AttendanceData: data,
                });
              });
            });
          },
        );
      });
    }
  }

  _handleNotification = (notification) => {
    this.setState({
      notification: notification,
    });
  };

  handleTab = (tab) => {
    const { categories } = this.props;

    this.setState({
      active: tab,
    });
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}>
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;
    const tabs = ["Attendance", "More"];

    return (
      <Block>
        <Block flex={false} row center space='between' style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image
              source={{
                uri: this.state.img,
              }}
              style={styles.avatar}
            />
          </Button>
        </Block>
        <Block flex={false} row style={styles.tabs}>
          {tabs.map((tab) => this.renderTab(tab))}
        </Block>
        <ScrollView>
          {this.state.active === "Attendance" && (
            <BarChart
              data={{
                labels: this.state.AttendanceData.lecture,
                datasets: [
                  {
                    data: this.state.AttendanceData.percent,
                  },
                ],
              }}
              width={width - 25}
              height={450}
              fromZero={true}
              verticalLabelRotation='90'
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                color: (opacity = 0) => `rgba(0 ,0 ,0, ${opacity})`,
                style: {
                  borderRadius: 16,
                  height: "100%",
                },
              }}
              style={{
                alignContent: "center",
                alignSelf: "center",
                marginVertical: 50,
                borderRadius: 16,
                height: "100%",
              }}
            />
          )}
          {this.state.active === "More" && <Details />}
        </ScrollView>
      </Block>
    );
  }
}

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 50,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  text: {
    color: "red",
    fontSize: 25,
    alignContent: "center",
    alignSelf: "center",
  },
});
