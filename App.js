import { ViroARSceneNavigator } from '@viro-community/react-viro';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import MeasureSceneAR from './app/container/HomeScreen';
import metrics from './app/themes/Metrics';

export default () => {

  const [isCreatePoint,setIsCreatePoint] = useState(false);
  const [isDelete,setIsDelete] =useState(false);

  const _onCreatePoint = () => {
    setIsCreatePoint(true)
    setTimeout(() => {
      setIsCreatePoint(false)
    }, 100);
  };

  const _onDeletePin = () => {
    setIsDelete(true)
    setTimeout(() => {
      setIsDelete(false)
    }, 100);
  };

  return (
    <View style={{flex: 1}}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: MeasureSceneAR,
        }}
        viroAppProps={{ isCreatePoint, isDelete }}
        style={styles.f1}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 60,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.buttons}></View>
        <TouchableHighlight
          style={styles.buttons}
          onPress={_onCreatePoint}
          underlayColor={'#00000000'}>
          <Image
            source={require('./res/btn_mode_objects_on.png')}
            style={{height: 60, width: 60}}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttons}
          onPress={_onDeletePin}
          underlayColor={'#00000000'}>
          <Image
            source={require('./res/btn_trash.png')}
            style={{height: 60, width: 60}}
          />
        </TouchableHighlight>
      </View>
      <View style={{ height:4, width:4, backgroundColor:'white', borderRadius: 2, position: 'absolute', top: metrics.screenHeight/2,right: metrics.screenWidth/2 }} />
    </View>
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
});
