import {
  ViroAnimations,
  ViroARScene,
  ViroMaterials,
  ViroTrackingStateConstants,
} from "@viro-community/react-viro";
import React, { useEffect, useState } from "react";
import { Dimensions, PixelRatio } from "react-native";
import Images from "../themes/Images";
import LineView from "./components/LineView";

interface MAIN_PROPS {
  isAdd: boolean;
  isCreatePoint: boolean;
  isDelete: boolean;
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
  const { isAdd, isCreatePoint, isDelete } = props.sceneNavigator?.viroAppProps;
  const [initialized, setInitialized] = useState(false);
  const [text, setText] = useState("Đang nhận diện ...");
  const [firstNodePlaced, setFirstNodePlaced] = useState(false);
  const [pointStep, setPointStep] = useState(1);
  const [distance, setDistance] = useState({
    line1: 0,
    line2: 0,
    line3: 0,
  });

  const [point, setPoint] = useState({
    point1: [0, 0, 0],
    point2: [0, 0, 0],
    point3: [0, 0, 0],
    point4: [0, 0, 0],
    point5: [0, 0, 0],
    point6: [0, 0, 0],
  });

  const arSceneRef = React.useRef<any>(null);
  const nodeRef1 = React.useRef<any>(null);
  const nodeRef2 = React.useRef<any>(null);
  const nodeRef3 = React.useRef<any>(null);
  const nodeRef4 = React.useRef<any>(null);
  const nodeRef5 = React.useRef<any>(null);
  const nodeRef6 = React.useRef<any>(null);

  const lineRef1 = React.useRef<any>(null);
  const lineRef2 = React.useRef<any>(null);
  const lineRef3 = React.useRef<any>(null);

  useEffect(() => {
    isAdd && onAddPoint();
  }, [isAdd]);

  useEffect(() => {
    isCreatePoint && onCreatePoint();
  }, [isCreatePoint]);

  useEffect(() => {
    isDelete && onClearPoint();
  }, [isDelete]);

  const _onTrackingUpdated = (state: any, reason: any) => {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (!initialized && state == ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialized(true);
      setText("Hello World!");
    }
  };

  const onAddPoint = () => {
    setPointStep((prevNum) => prevNum + 1);
  };

  const onCreatePoint = () => {
    arSceneRef.current
      .performARHitTestWithPoint(
        (Dimensions.get("window").width * PixelRatio.get()) / 2,
        (Dimensions.get("window").height * PixelRatio.get()) / 2
      )
      .then((results: any) => {
        for (var i = 0; i < results.length; i++) {
          let result = results[i];

          if (result.type == "ExistingPlaneUsingExtent") {
            // We hit a plane, do something!
            if (firstNodePlaced) {
              if (pointStep === 2) {
                nodeRef2.current.setNativeProps({
                  position: result.transform.position,
                  visible: true,
                });
                nodeRef1.current.getTransformAsync().then((transform: any) => {
                  getDistance(transform.position, result.transform.position, 1);
                });
              } else if (pointStep === 3) {
                nodeRef3.current.setNativeProps({
                  position: result.transform.position,
                  visible: true,
                });
                setPointStep((prevNum) => prevNum + 1);
              } else if (pointStep === 4) {
                nodeRef4.current.setNativeProps({
                  position: result.transform.position,
                  visible: true,
                });
                nodeRef3.current.getTransformAsync().then((transform: any) => {
                  getDistance(transform.position, result.transform.position, 2);
                });
              } else if (pointStep === 5) {
                nodeRef5.current.setNativeProps({
                  position: result.transform.position,
                  visible: true,
                });
                setPointStep((prevNum) => prevNum + 1);
              } else if (pointStep === 6) {
                nodeRef6.current.setNativeProps({
                  position: result.transform.position,
                  visible: true,
                });
                nodeRef5.current.getTransformAsync().then((transform: any) => {
                  getDistance(transform.position, result.transform.position, 3);
                });
              }
            } else {
              nodeRef1.current.setNativeProps({
                position: result.transform.position,
                visible: true,
              });
              setPointStep(2);
              setFirstNodePlaced(true);
            }
          }
        }
      });
  };

  const onClearPoint = () => {
    setFirstNodePlaced(false);
    setPointStep(1);
    nodeRef1?.current?.setNativeProps({
      position: [0, 0, 0],
      visible: false,
    });
    nodeRef2?.current?.setNativeProps({
      position: [0, 0, 0],
      visible: false,
    });
    nodeRef3?.current?.setNativeProps({
      position: [0, 0, 0],
      visible: false,
    });
    nodeRef4?.current?.setNativeProps({
      position: [0, 0, 0],
      visible: false,
    });
    nodeRef5?.current?.setNativeProps({
      position: [0, 0, 0],
      visible: false,
    });
    nodeRef6?.current?.setNativeProps({
      position: [0, 0, 0],
      visible: false,
    });
    lineRef1?.current?.setNativeProps({
      visible: false,
    });
    lineRef2?.current?.setNativeProps({
      visible: false,
    });
    lineRef3?.current?.setNativeProps({
      visible: false,
    });
  };

  const getDistance = (
    positionOne: any,
    positionTwo: any,
    lineNumber: number
  ) => {
    // Compute the difference vector between the two hit locations.
    const dx = positionOne[0] - positionTwo[0];
    const dy = positionOne[1] - positionTwo[1];
    const dz = positionOne[2] - positionTwo[2];

    // // Compute the straight-line distance.
    const distanceMeters = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (lineNumber === 1) {
      setPoint({
        ...point,
        point1: positionOne,
        point2: positionTwo,
      });
      lineRef1.current.setNativeProps({
        visible: true,
      });
      // unit: cm
      setDistance({ ...distance, line1: distanceMeters * 100 });
    } else if (lineNumber === 2) {
      setPoint({
        ...point,
        point3: positionOne,
        point4: positionTwo,
      });
      lineRef2.current.setNativeProps({
        visible: true,
      });
      // unit: cm
      setDistance({ ...distance, line2: distanceMeters * 100 });
    } else if (lineNumber === 3) {
      setPoint({
        ...point,
        point5: positionOne,
        point6: positionTwo,
      });
      lineRef3.current.setNativeProps({
        visible: true,
      });
      // unit: cm
      setDistance({ ...distance, line3: distanceMeters * 100 });
    }
  };

  // const _onTransformUpdate = (updateObj: any) => {
  //   console.log(
  //     "🚀🚀🚀 ~ file: HomeScreen.tsx ~ line 249 ~ HomeScreen ~ updateObj",
  //     updateObj
  //   );
  // };

  return (
    <ViroARScene
      ref={arSceneRef}
      onTrackingUpdated={_onTrackingUpdated}
      // onCameraTransformUpdate={_onTransformUpdate}
      onClick={() => {}}
    >
      <LineView
        key={"1"}
        customRef1={nodeRef1}
        customRef2={nodeRef2}
        lineCustomRef={lineRef1}
        point1={point.point1}
        point2={point.point2}
        distance={distance.line1 || 0}
      />
      <LineView
        key={"2"}
        customRef1={nodeRef3}
        customRef2={nodeRef4}
        lineCustomRef={lineRef2}
        point1={point.point3}
        point2={point.point4}
        distance={distance.line2 || 0}
      />
      <LineView
        key={"3"}
        customRef1={nodeRef5}
        customRef2={nodeRef6}
        lineCustomRef={lineRef3}
        point1={point.point5}
        point2={point.point6}
        distance={distance.line3 || 0}
      />
    </ViroARScene>
  );
};

export default MeasureAR;
