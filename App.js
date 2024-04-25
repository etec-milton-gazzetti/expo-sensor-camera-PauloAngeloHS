import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, Button, TouchableOpacity, Pressable } from "react-native";
import { styles } from "./StyleGlobal";
import { Camera, CameraType } from "expo-camera";

function CameraView({ type, active }) {
  if (!active) {
    return <View style={{flex: 1, backgroundColor: "#ffffff"}}></View>;
  }
  return (
    <Camera style={styles.camera} type={type}>
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
  const paddingView = "20";
  return (
    <View style={styles.container}>
      <CameraView type={type} active={onCamera}/>
      <View style={{ paddingTop:  paddingView,paddingBottom: paddingView, backgroundColor: '#000000', display: 'flex', flexDirection: 'row' }} >
        <Pressable onPress={ () =>{setOnCamera(current => !current)}} style={{ backgroundColor: '#000000', flex:1}}>
          <Text style={{color: "#ffffff", textAlign: "center"}}>
            { onCamera? "Turn off" : "Turn on"}
          </Text>
        </Pressable>
        { onCamera? (
        <Pressable onPress={() => {toggleCameraType()}} style={{flex:1}}>
          <Text style={{color: "#ffffff", textAlign: "center"}}>{ type === CameraType.back? "Back camera" : "Front camera"}</Text>
        </Pressable>
        ) : (<View></View>)}
      </View>
    </View>
  );
}
