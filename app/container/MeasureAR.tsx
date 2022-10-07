import {
  ViroAnimations,
  ViroARScene,
  ViroMaterials,
  ViroNode,
  ViroPolyline,
  ViroSphere,
  ViroSpotLight,
  ViroText,
} from "@viro-community/react-viro";
import React, { useEffect, useState } from "react";
import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import Images from "../themes/Images";

interface MAIN_PROPS {
  isAdd: boolean;
  isCreatePoint: boolean;
  isDelete: boolean;
  unit: string;
  sceneNavigator?: any;
}

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("../../res/grid_bg.jpg"),
  },
  red: {
    diffuseTexture: Images.material.red,
  },
  white: {
    diffuseTexture: Images.material.white,
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90",
    },
    duration: 250, //.25 seconds
  },
});

const MeasureAR = (props: MAIN_PROPS) => {
  const { isAdd, isCreatePoint, isDelete, unit } =
    props.sceneNavigator?.viroAppProps;
  const [initialized, setInitialized] = useState(false);
  const [text, setText] = useState("Initializing AR...");
  const [distance, setDistance] = useState(0);
  const [distanceConvert, setDistanceConvert] = useState(0);

  const [rotate, setRotate] = useState<any>([0, 0, 0]);

  const arSceneRef = React.useRef<any>(null);
  const cursorRef = React.useRef<any>(null);
  const nodeRef1 = React.useRef<any>(null);
  const nodeRef2 = React.useRef<any>(null);

  const [isFirstPoint, setIsFirstPoint] = useState<boolean>(false);

  const [point1, setPoint1] = useState<any>([0, 0, 0]);

  const lineRef = React.useRef<any>(null);

  useEffect(() => {
    isAdd && onAddPoint();
  }, [isAdd]);

  useEffect(() => {
    isCreatePoint && handleSceneClick();
  }, [isCreatePoint]);

  useEffect(() => {
    isDelete && onClearPoint();
  }, [isDelete]);

  useEffect(() => {
    checkDistanceByUnit(unit, distance);
  }, [unit]);

  const _onTrackingUpdated = (state: any, reason: any) => {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    // if (!initialized && state == ViroConstants.TRACKING_NORMAL) {
    //   setInitialized(true);
    //   setText("Hello World!");
    // }
  };

  const checkUnit = (unit: string) => {
    // ["cm", "m", "inch", "feet"];
    switch (unit) {
      case "m":
        return "m";
      case "inch":
        return "in";
      case "feet":
        return "ft";
      default:
        return "cm";
    }
  };

  const checkDistanceByUnit = (unit: string, distance: number) => {
    // ["cm", "m", "inch", "feet"];
    switch (unit) {
      case "m":
        setDistanceConvert(distance / 100);
        break;
      case "inch":
        setDistanceConvert(distance / 2.54);
        break;
      case "feet":
        setDistanceConvert(distance / 2.54 / 12);
        break;
      default:
        setDistanceConvert(distance);
        break;
    }
  };

  const handleSceneClick = () => {
    arSceneRef?.current
      ?.performARHitTestWithPoint(
        (Dimensions.get("window").width * PixelRatio.get()) / 2,
        (Dimensions.get("window").height * PixelRatio.get()) / 2
      )
      .then((results: any) => {
        for (var i = 0; i < results.length; i++) {
          let result = results[i];
          if (result.type == "ExistingPlaneUsingExtent") {
            // We hit a plane, do something!
            if (isFirstPoint) {
              nodeRef2.current.setNativeProps({
                position: result.transform.position,
                visible: true,
              });

              nodeRef1.current.getTransformAsync().then((transform: any) => {
                console.log(transform.position);
                getDistance(transform.position, result.transform.position);
              });
              setIsFirstPoint(false);
            } else {
              nodeRef2.current.setNativeProps({ visible: false });
              nodeRef1.current.setNativeProps({
                position: result.transform.position,
                visible: true,
              });
              setPoint1(result.transform.position);
              setIsFirstPoint(true);
            }
          }
        }
      });
  };

  const getDistance = (positionOne: any, positionTwo: any) => {
    // Compute the difference vector between the two hit locations.
    const dx = positionOne[0] - positionTwo[0];
    const dy = positionOne[1] - positionTwo[1];
    const dz = positionOne[2] - positionTwo[2];

    // // Compute the straight-line distance.
    const distanceMeters = Math.sqrt(dx * dx + dy * dy + dz * dz);
    console.log(distanceMeters * 100);
    let standardDistance = distanceMeters * 100; //cm
    setDistance(distanceMeters * 100);
    switch (unit) {
      case "m":
        standardDistance = standardDistance / 100;
        break;
      case "inch":
        standardDistance = standardDistance / 2.54;
        break;
      case "feet":
        standardDistance = standardDistance / 2.54 / 12;
        break;
      default:
        standardDistance;
        break;
    }
    setDistanceConvert(standardDistance);
  };

  const onAddPoint = () => {};

  const onClearPoint = () => {
    setIsFirstPoint(false);
    lineRef.current.setNativeProps({
      visible: false,
    });
    nodeRef1.current.setNativeProps({
      visible: false,
    });
    nodeRef2.current.setNativeProps({
      visible: false,
    });
  };

  const _onCameraMove = (updateObj: any) => {
    setRotate(updateObj?.rotation);
    arSceneRef?.current
      ?.performARHitTestWithPoint(
        (Dimensions.get("window").width * PixelRatio.get()) / 2,
        (Dimensions.get("window").height * PixelRatio.get()) / 2
      )
      .then((results: any) => {
        for (var i = 0; i < results.length; i++) {
          let result = results[i];
          cursorRef.current.setNativeProps({
            position: result.transform.position,
            visible: true,
          });
          isFirstPoint &&
            lineRef.current.setNativeProps({
              points: [point1, result.transform.position],
              visible: true,
            });
          isFirstPoint && getDistance(point1, result.transform.position);
        }
      });
  };

  return (
    <ViroARScene
      ref={arSceneRef}
      onTrackingUpdated={_onTrackingUpdated}
      onCameraTransformUpdate={_onCameraMove}
      onClick={() => {}}
    >
      <ViroPolyline
        ref={lineRef}
        visible={false}
        position={[0, 0, 0]}
        points={[
          [0, 0, 0],
          [0, 0, 0],
        ]}
        scale={[1, 1, 1]}
        thickness={0.003}
        materials={"red"}
      />
      <ViroNode
        ref={cursorRef}
        position={[0, 0, 0]}
        visible={false}
        onClick={() => {}}
        onDrag={() => {}}
        dragType="FixedToWorld"
      >
        <ViroSphere
          heightSegmentCount={20}
          widthSegmentCount={20}
          radius={0.02}
          scale={[0.1, 0.1, 0.1]}
          position={[0, 0, 0]}
          materials={["red"]}
        />
        {isFirstPoint && (
          <ViroText
            text={
              distanceConvert
                ? distanceConvert.toFixed(unit === "feet" ? 2 : 1) +
                  `${checkUnit(unit)}`
                : ""
            }
            scale={[0.1, 0.1, 0.1]}
            position={[0, 0, -0.01]}
            style={styles.helloWorldTextStyle}
            outerStroke={{ type: "Outline", width: 1.5, color: "black" }}
            rotation={rotate}
          />
        )}
      </ViroNode>
      <ViroNode
        ref={nodeRef1}
        position={[0, 0, 0]}
        visible={false}
        onClick={() => {}}
        onDrag={() => {}}
        dragType="FixedToWorld"
      >
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
        {/* <ViroSphere
          heightSegmentCount={20}
          widthSegmentCount={20}
          radius={0.015}
          scale={[0.1, 0.1, 0.1]}
          position={[0, 0, 0]}
          materials={["red"]}
        /> */}
      </ViroNode>

      <ViroNode
        ref={nodeRef2}
        position={[0, 0, 0]}
        visible={false}
        onClick={() => {}}
        onDrag={() => {}}
        dragType="FixedToWorld"
      >
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
        {/* <ViroSphere
          heightSegmentCount={20}
          widthSegmentCount={20}
          shadowCastingBitMask={0}
          radius={0.015}
          scale={[0.1, 0.1, 0.1]}
          position={[0, 0, 0]}
          materials={["red"]}
        /> */}
        <ViroText
          text={
            distanceConvert
              ? distanceConvert.toFixed(unit === "feet" ? 2 : 1) +
                `${checkUnit(unit)}`
              : ""
          }
          scale={[0.1, 0.1, 0.1]}
          position={[0, 0, -0.01]}
          style={styles.helloWorldTextStyle}
          outerStroke={{ type: "Outline", width: 1.5, color: "black" }}
          rotation={rotate}
        />
      </ViroNode>
    </ViroARScene>
  );
};

export default MeasureAR;

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 26,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#00000000",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff00",
  },
});
