/** @format */

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import Axios from "axios";
import { BACKENDURL } from "./index";

export default async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== "granted") {
    alert("No notification permissions!");
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  AsyncStorage.getItem("@App:email").then((email) => {
    if (email !== "") {
      Axios.post(`${BACKENDURL}/updateInfo/addToken`, {
        email: email,
        token: token,
      });
    }
  });
  console.log(token);
  AsyncStorage.setItem("@App:notification", status);
  return token;
}
