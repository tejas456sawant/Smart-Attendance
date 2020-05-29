/** @format */

require("@tensorflow/tfjs-node");
const router = require("express").Router();
const faceapi = require("face-api.js");
const fetch = require("node-fetch");
const canvas = require("canvas");

const { Canvas, Image, ImageData, loadImage } = canvas;

faceapi.env.monkeyPatch({
  Canvas,
  Image,
  ImageData,
  fetch: fetch,
});

const MODEL_URL = "./models";

router.post("/", (req, res) => {
  Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
  ]).then(async (callbackFun) => {
    var count = await loadImg(req.body.img);
    console.log(count);
    if (count === 0) {
      res.json("Invalid image ! No face detected ):");
    }
    if (count === 1) {
      res.json("Valid Image . One face detected :)");
    }
    if (count > 1) {
      res.json(`Invalid image ! ${count} faces detected :(`);
    }
  });
});

async function loadImg(url) {
  try {
    const img = await canvas.loadImage(url);
    const detections = await faceapi
      .detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceDescriptors();
    return detections.length;
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
