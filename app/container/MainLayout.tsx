import { ViroARSceneNavigator } from "@viro-community/react-viro";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import { Images, Metrics } from "./../themes";
import SettingModal from "./components/SettingModal";
import HomeScreen from "./HomeScreen";

const MainLayout = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isCreatePoint, setIsCreatePoint] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);

  const _onAddPoint = () => {
    setIsAdd(true);
    setTimeout(() => {
      setIsAdd(false);
    }, 100);
  };

  const _onCreatePoint = () => {
    setIsCreatePoint(true);
    setTimeout(() => {
      setIsCreatePoint(false);
    }, 100);
  };

  const _onDeletePin = () => {
    setIsDelete(true);
    setTimeout(() => {
      setIsDelete(false);
    }, 100);
  };

  const _onOpenSetting = () => {
    setIsShowSetting(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HomeScreen,
        }}
        viroAppProps={{ isAdd, isCreatePoint, isDelete }}
        style={styles.f1}
      />
      <View
        style={{
          left: 0,
          right: 0,
          bottom: 60,
          position: "absolute",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableHighlight
          style={styles.buttons}
          onPress={_onAddPoint}
          underlayColor={"#00000000"}
        >
          <Image source={Images.icon.add} style={{ height: 60, width: 60 }} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttons}
          onPress={_onCreatePoint}
          underlayColor={"#00000000"}
        >
          <Image
            source={Images.icon.create_point}
            style={{ height: 60, width: 60 }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttons}
          onPress={_onDeletePin}
          underlayColor={"#00000000"}
        >
          <Image
            source={Images.icon.delete}
            style={{ height: 60, width: 60 }}
          />
        </TouchableHighlight>
      </View>
      <View
        style={{
          height: 6,
          width: 6,
          backgroundColor: "white",
          borderRadius: 3,
          position: "absolute",
          top: Metrics.screenHeight / 2,
          right: Metrics.screenWidth / 2,
        }}
      />
      <TouchableHighlight
        style={[styles.buttons, { position: "absolute", top: 24, right: 24 }]}
        onPress={_onOpenSetting}
        underlayColor={"#00000000"}
      >
        <Image source={Images.icon.setting} style={{ height: 60, width: 60 }} />
      </TouchableHighlight>
      <SettingModal
        isVisible={isShowSetting}
        onClose={() => setIsShowSetting(false)}
      />
    </View>
  );
};

export default MainLayout;

var styles = StyleSheet.create({
  f1: { flex: 1 },

  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#00000000",
    borderColor: "#ffffff00",
    justifyContent: "center",
    alignItems: "center",
  },
});
