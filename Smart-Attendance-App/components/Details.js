/** @format */

import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Modal,
} from "react-native";
import { View, TextInput, Platform, Picker } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Block, Text } from "../components";
import { theme, mocks, BACKENDURL } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Axios from "axios";

const Details = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [dateToSend, setDateToSend] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("@App:email").then((data) => {
      Axios.get(`${BACKENDURL}/users/getInfo/${data.toString()}`).then(
        (user) => {
          Axios.get(
            `${BACKENDURL}/get/subjects/report-${user.data.StudentDivision}`,
          ).then(({ data }) => {
            setSubjects(data);
          });
        },
      );
    });
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "ios");
    setDateToSend(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`,
    );
  };

  const showMode = (currentMode) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <ScrollView style={{ padding: "5%" }}>
      <Text style={{ color: "#b8b8b8" }}>Search for date and lecture</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "40%", margin: "3%" }}>
          <Button gradient onPress={showDatepicker}>
            <Text bold white center>
              Pick a date
            </Text>
          </Button>
        </View>
        <Picker
          selectedValue={selectedSubject}
          style={{ width: "50%", marginLeft: "2%", marginTop: "5%" }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSubject(itemValue)
          }>
          <Picker.Item label='Select Subject' value='Select Subject' />
          {subjects.map((subject) => {
            return (
              <Picker.Item label={subject} value={subject} key={subject} />
            );
          })}
        </Picker>
      </View>

      <TouchableOpacity
        style={{ alignItems: "center", padding: 10 }}
        onPress={() => {
          console.log(selectedSubject, dateToSend);
          AsyncStorage.getItem("@App:email").then((data) => {
            Axios.get(`${BACKENDURL}/users/getInfo/${data.toString()}`).then(
              (user) => {
                Axios.post(`${BACKENDURL}/get/checkattendance`, {
                  enrollment: user.data.StudentEnrollment,
                  date: dateToSend,
                  lecture: selectedSubject,
                }).then((res) => {
                  if (res.data === "P") {
                    return setPresent(true);
                  }
                  if (res.data === "A") {
                    return setAbsent(true);
                  }
                  if (res.data === "Na") {
                    return setModalVisible(true);
                  }
                  return alert(res.data);
                });
              },
            );
          });
        }}>
        <View
          style={{
            borderColor: "#00DA8E",
            alignItems: "center",
            borderStyle: "solid",
            borderWidth: 2,
            width: "35%",
            padding: 8,
            borderRadius: 15,
          }}>
          <Text style={{ color: "#00DA8E", fontSize: 20 }}>Search</Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          margin: 20,
          marginTop: 50,
          borderBottomColor: "rgba(0,0,0,0.1)",
          borderBottomWidth: 1,
        }}
      />

      <Text style={{ color: "#b8b8b8" }}>Any queries or complaints ?</Text>

      <TextInput
        multiline
        numberOfLines={4}
        style={{
          marginTop: 20,
          margin: "2%",
          borderColor: "#00DA8E",
          borderStyle: "solid",
          borderRadius: 10,
          borderWidth: 1,
          textAlignVertical: "top",
          padding: 10,
          color: "grey",
        }}
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder='Type here !'
      />

      <Button
        gradient
        style={{ width: "70%", marginTop: 20, marginLeft: "15%" }}
        onPress={() => {
          console.log("click");
          if (AsyncStorage.getItem("@App:email")) {
            AsyncStorage.getItem("@App:email").then((data) => {
              Axios.get(`${BACKENDURL}/users/getInfo/${data.toString()}`).then(
                (student) => {
                  Axios.post(`${BACKENDURL}/set/complaint`, {
                    enrollment: student.data.StudentEnrollment,
                    message: message,
                  }).then(({ data }) => {
                    setMessage("");
                    alert(data);
                  });
                },
              );
            });
          }
        }}>
        <Text bold white center>
          Submit
        </Text>
      </Button>

      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={"date"}
          is24Hour={true}
          display='spinner'
          onChange={onChange}
        />
      )}

      <Modal animationType='slide' transparent={true} visible={present}>
        <LinearGradient
          colors={[
            "transparent",
            "transparent",
            "transparent",
            "rgba(0, 120, 250, 0.4)",
          ]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              colors={["#00d2ff", "#3a7bd5"]}
              start={[1, 1]}
              end={[0, 0]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "300%",
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setPresent(!present);
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 20,
                    marginRight: "5%",
                  }}>
                  You were present
                </Text>
                <Ionicons
                  name='md-checkmark-circle-outline'
                  size={25}
                  color='rgba(255,255,255,0.8)'
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType='slide' transparent={true} visible={absent}>
        <LinearGradient
          colors={[
            "transparent",
            "transparent",
            "transparent",
            "rgba(255, 0, 0, 0.5)",
          ]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              colors={["#ffb199", "#ff0844"]}
              start={[1, 1]}
              end={[0, 0]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "300%",
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setAbsent(!absent);
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 20,
                    marginRight: "5%",
                  }}>
                  You were absent
                </Text>
                <Ionicons
                  name='md-close'
                  size={25}
                  color='rgba(255,255,255,0.8)'
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <LinearGradient
          colors={[
            "transparent",
            "transparent",
            "transparent",
            "rgba(220, 120, 000, 0.4)",
          ]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              colors={["#edb658", "#ed7e39"]}
              start={[1, 1]}
              end={[0, 0]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "300%",
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 20,
                    marginRight: "5%",
                  }}>
                  No Results
                </Text>
                <Ionicons
                  name='md-alert'
                  size={25}
                  color='rgba(255,255,255,0.8)'
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "18%",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    overflow: "hidden",
    elevation: 14,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Details;
