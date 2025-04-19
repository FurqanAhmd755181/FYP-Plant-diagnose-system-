import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Modal,
  Image,
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

  const [showModal, setShowModal] = useState(false);
  const [predictionData, setPredictionData] = useState({ result: "", treatment: "" });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      setHasPermission(true);
    } else {
      (async () => {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(cameraStatus === "granted" && galleryStatus === "granted");
      })();
    }
  }, []);

  const uploadImage = async (uri) => {
    const formData = new FormData();
    try {
      if (uri.startsWith("data:")) {
        const blob = await fetch(uri).then((r) => r.blob());
        formData.append("image", blob, "photo.jpg");
      } else {
        const file = {
          uri,
          name: "photo.jpg",
          type: "image/jpeg",
        };
        formData.append("image", file);
      }

      const response = await fetch("http://127.0.0.1:5000/api/image", {
        method: "POST",
        body: formData,
        headers: Platform.OS === "web" ? {} : {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setPredictionData({
        result: data["plant name"] || "Unknown",
        treatment: data["predicted_results"] || "Not provided",
      });
      setPreviewImage(uri);
      setShowModal(true);
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload failed", error.message || "Could not send image to server.");
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;
        setPhotoUri(uri);
        await uploadImage(uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick an image from the gallery.");
      console.error(error);
    }
  };

  const handleCapture = async () => {
    if (Platform.OS === "web") {
      const video = videoRef.current;
      if (!video) return;

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg");
      setPhotoUri(dataUrl);
      await uploadImage(dataUrl);
    } else {
      if (!cameraRef) return;

      const photo = await cameraRef.takePictureAsync();
      const fileName = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;

      await FileSystem.moveAsync({ from: photo.uri, to: fileName });
      setPhotoUri(fileName);
      await uploadImage(fileName);
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

  const startWebCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    setIsWebCameraOn(true);
  };

  const stopWebCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsWebCameraOn(false);
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false)
    return (
      <View style={styles.center}>
        <Text>No access to camera or gallery</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Modal for Prediction Result */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🧬 Prediction Result</Text>
            {previewImage && (
              <Image
                source={{ uri: previewImage }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: "#0B5D51",
                  marginBottom: 16,
                }}
              />
            )}
            <Text style={styles.modalText}>🌿 Disease: {predictionData.result}</Text>
            <Text style={styles.modalText}>💊 Treatment: {predictionData.treatment}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={{ color: "#fff" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Camera / Web View */}
      {Platform.OS === "web" ? (
        <View style={styles.webContainer}>
          <video ref={videoRef} style={styles.webVideo} autoPlay playsInline />
          <View style={styles.webControls}>
            {!isWebCameraOn ? (
              <TouchableOpacity onPress={startWebCamera} style={styles.webButton}>
                <Text style={styles.buttonText}>Start Camera</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={stopWebCamera} style={styles.webButton}>
                  <Text style={styles.buttonText}>Stop Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCapture} style={styles.captureButton} />
              </>
            )}
            <TouchableOpacity
              onPress={pickImageFromGallery}
              style={styles.webButton}
            >
              <Text style={styles.buttonText}>Choose from Gallery</Text>
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
  webContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  webVideo: {
    width: "100%",
    maxWidth: 500,
    height: "80%",
    maxHeight: 500,
    backgroundColor: "#333",
  },
  webControls: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  webButton: {
    backgroundColor: "#0B5D51",
    padding: 12,
    borderRadius: 5,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#1f2937",
    padding: 24,
    borderRadius: 16,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: "#d1d5db",
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 22,
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: "#0B5D51",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default CameraComponent;
