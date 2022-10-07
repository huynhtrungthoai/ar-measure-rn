import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images, Metrics } from "themes";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPress: (selectedUnit: string) => void;
}

const { width, height } = Dimensions.get("screen");
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const UNIT_LIST = ["cm", "m", "inch", "feet"];

const LineView = (props: ModalProps) => {
  const insets = useSafeAreaInsets();
  const { isVisible, onClose, onPress } = props;
  const [selectedUnit, setSelectedUnit] = useState<string>("cm");

  const onItemPress = (unit: string) => {
    onPress(unit), setSelectedUnit(unit);
  };

  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={screenWidth}
      deviceHeight={screenHeight}
      style={{ margin: 0 }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
    >
      <View style={{ flex: 1 }}>
        <View style={[styles.modalHeader, { marginTop: insets.top + 12 }]}>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={Images.icon.close_circle}
              style={{ height: 32, width: 32, margin: 8 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.unitView}>
          <Text style={{ color: "white" }}>Đơn vị đo:</Text>
          <View style={styles.unitContent}>
            {UNIT_LIST.map((unitItem: string, index: number) => {
              const isSelected = unitItem === selectedUnit;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.itemStyle,
                    { backgroundColor: isSelected ? "yellow" : "white" },
                  ]}
                  onPress={() => onItemPress(unitItem)}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {unitItem}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LineView;

var styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 64,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 16,
  },
  unitView: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 24,
    width: Metrics.screenWidth,
    paddingHorizontal: 24,
  },
  unitContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
