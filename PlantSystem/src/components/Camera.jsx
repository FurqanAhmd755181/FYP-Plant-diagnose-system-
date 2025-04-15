import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { PhotoContext } from "../components/PhotoContext";

const CameraComponent = () => {
  const { setPhotoUri } = useContext(PhotoContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants?.Type.back);
  const videoRef = useRef(null);
  const [isWebCameraOn, setIsWebCameraOn] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      setHasPermission(true);
    } else {
      (async () => {
        const { status: cameraStatus } =
          await Camera.requestCameraPermissionsAsync();
        const { status: galleryStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        setHasPermission(
          cameraStatus === "granted" && galleryStatus === "granted"
        );
      })();
    }
  }, []);

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        console.log("Selected image URI:", uri);
        setPhotoUri(uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick an image from the gallery.");
      console.error(error);
    }
  };

  const startWebCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsWebCameraOn(true);
    } catch (err) {
      console.error("Error accessing the camera on web:", err);
      setHasPermission(false);
    }
  };

  const stopWebCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsWebCameraOn(false);
  };

  const handleCapture = async () => {
    if (Platform.OS === "web") {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;

      if (video) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/jpeg");
        localStorage.setItem("photoUri", dataUrl);
        setPhotoUri(dataUrl);
      }
    } else {
      if (cameraRef) {
        try {
          const photo = await cameraRef.takePictureAsync();
          const fileName = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;

          await FileSystem.moveAsync({
            from: photo.uri,
            to: fileName,
          });

          setPhotoUri(fileName);
        } catch (error) {
          Alert.alert("Error", "Failed to capture photo.");
          console.error(error);
        }
      }
    }
  };

  const toggleCameraType = () => {
    if (Platform.OS !== "web") {
      setCameraType(
        cameraType === Camera.Constants?.Type.back
          ? Camera.Constants?.Type.front
          : Camera.Constants?.Type.back
      );
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera or gallery</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {Platform.OS === "web" ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <video
            ref={videoRef}
            style={{ width: "100%", height: "80%", backgroundColor: "black" }}
          />
          <View style={styles.webControls}>
            {isWebCameraOn ? (
              <TouchableOpacity onPress={stopWebCamera} style={styles.webButton}>
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startWebCamera} style={styles.webButton}>
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            )}
            {isWebCameraOn && (
              <TouchableOpacity onPress={handleCapture} style={styles.captureButton} />
            )}
            <TouchableOpacity onPress={pickImageFromGallery} style={styles.webButton}>
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera style={{ flex: 1 }} type={cameraType} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={pickImageFromGallery} style={styles.sideButton}>
              <Text style={styles.buttonText}>📁</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCapture} style={styles.captureButton} />

            <TouchableOpacity onPress={toggleCameraType} style={styles.sideButton}>
              <Text style={styles.buttonText}>🔄</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sideButton: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
    borderRadius: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#0B5D51",
  },
  webControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 20,
  },
  webButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#0B5D51",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraComponent;
