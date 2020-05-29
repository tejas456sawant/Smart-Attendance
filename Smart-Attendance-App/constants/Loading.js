/** @format */

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = ({ loading = false }) => {
  if (loading === true) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color='#00ff00' />
      </View>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Loading;
