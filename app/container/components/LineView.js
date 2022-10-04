import {
  ViroAnimations, ViroMaterials,
  ViroNode,
  ViroPolyline, ViroSphere, ViroSpotLight,
  ViroText
} from '@viro-community/react-viro';
import React from 'react';
import { StyleSheet } from 'react-native';
import Images from '../../themes/Images';
  
  ViroMaterials.createMaterials({
    red: {
      diffuseTexture: Images.material.red,
    },
    white: {
      diffuseTexture: Images.material.white,
    }
  });
  
  ViroAnimations.registerAnimations({
    rotate: {
      properties: {
        rotateY: '+=90',
      },
      duration: 250, //.25 seconds
    },
  });
  
  const LineView = (props) => {
    const {customRef1, customRef2,lineCustomRef, point1, point2, distance} = props
  
    return (
      <>
        {/* Line 1 */}
        <ViroPolyline
          ref={lineCustomRef}
          visible={false}
          position={[0,0,0]}
          points={[point1 || [0,0,0], point2 ||[0,0,0]]}
          scale={[1,1,1]}
          thickness={0.001}
          materials={'red'}
        />
        <ViroNode
          ref={customRef1}
          position={[0, 0, 0]}
          visible={false}
          onClick={() => {}}
          onDrag={() => {}}
          dragType="FixedToWorld">
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -0.2]}
            position={[0, 1, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={0.7}
          />
            <ViroSphere
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.025}
              scale={[0.1, 0.1, 0.1]}
              position={[0, 0, 0]}
              materials={["white"]}
            />
        </ViroNode>
        <ViroNode
          ref={customRef2}
          position={[0, 0, 0]}
          visible={false}
          onClick={() => {}}
          onDrag={() => {}}
          dragType="FixedToWorld">
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -0.2]}
            position={[0, 1, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={0.7}
          />
            <ViroSphere
              heightSegmentCount={20}
              widthSegmentCount={20}
              shadowCastingBitMask={0}
              radius={0.025}
              scale={[0.1, 0.1, 0.1]}
              position={[0, 0, 0]}
              materials={["white"]}
            />
          <ViroText
            text={distance ? distance.toFixed(0) + 'cm' : ''}
            scale={[0.1, 0.1, 0.1]}
            position={[0, 0, -0.01]}
            style={styles.helloWorldTextStyle}
          />
        </ViroNode>
      </>
    );
  };
  
  export default LineView;
  
  var styles = StyleSheet.create({
    f1: {flex: 1},
    helloWorldTextStyle: {
      fontFamily: 'Arial',
      fontSize: 26,
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
  