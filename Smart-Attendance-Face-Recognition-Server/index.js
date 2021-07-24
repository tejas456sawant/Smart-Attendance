require("@tensorflow/tfjs-node");
const canvas = require("canvas");
const faceapi = require("face-api.js");
const fetch = require("node-fetch");
const fs = require("fs");
const axios = require("axios");
const Firebase = require("./Firebase");
const dotenv = require("dotenv");
dotenv.config();

const { Canvas, Image, ImageData, loadImage } = canvas;

faceapi.env.monkeyPatch({
  Canvas,
  Image,
  ImageData,
  fetch: fetch,
});

const MODEL_URL = "./models";

var starCountRef = Firebase.database().ref("/StudentImages/");

var labels = [];

starCountRef.on("value", (snapshot) => {
  snapshot.forEach((student) => {
    labels.push({
      img: student.val(),
      key: student.key,
    });
  });
  Firebase.database()
    .ref("/AttendanceImage/")
    .on("child_changed", (newStdImgUrl) => {
      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
      ]).then(start);
      console.log(newStdImgUrl.val());
      async function start() {
        console.log("MODELS DONE");
        const labeledFaceDescriptors = await loadLabeledImages();

        try {
          const faceMatcher = new faceapi.FaceMatcher(
            labeledFaceDescriptors,
            0.6,
          );
          let image = await canvas.loadImage(newStdImgUrl.val());
          const displaySize = { width: image.width, height: image.height };
          const detections = await faceapi
            .detectAllFaces(image)
            .withFaceLandmarks()
            .withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize,
          );
          const results = resizedDetections.map((d) =>
            faceMatcher.findBestMatch(d.descriptor),
          );
          results.map((faces) => {
            console.log(faces.label);
            axios
              .get(
                `https://smartattendance-backend.herokuapp.com/attendance/mark/${faces.label}`,
              )
              .then((res) => {
                console.log(res.data);
              });
          });
        } catch (err) {
          console.error(err);
        }
      }
      async function loadLabeledImages() {
        return Promise.all(
          labels.map(async (label) => {
            const descriptions = [];
            const img = await canvas.loadImage(label.img);
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();
            descriptions.push(detections.descriptor);
            return new faceapi.LabeledFaceDescriptors(label.key, descriptions);
          }),
        );
      }
    });
});
