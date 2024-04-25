import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, Button, TouchableOpacity, Pressable } from "react-native";
import { styles } from "./StyleGlobal";
import { Camera, CameraType } from "expo-camera";

function CameraView({ typeToggle, type, active }) {
  if (!active) {
    return <View style={{flex: 1}}></View>;
  }
  return (
    <Camera style={styles.camera} type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={typeToggle}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
export default function App() {
 const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [onCamera, setOnCamera] = useState(false);
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <CameraView type={type} typeToggle={toggleCameraType} active={onCamera}/>
      <Pressable onPress={ () =>{setOnCamera(current => !current)}} style={{ padding: '50px', backgroundColor: '#000000'}}>
        <Text style={{color: "#ffffff", textAlign: "center"}}>
          { onCamera? "Turn off" : "Turn on"}
        </Text>
      </Pressable>
    </View>
  );
}
