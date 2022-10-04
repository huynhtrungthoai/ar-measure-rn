import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

// Used via Metrics.baseMargin
const Metrics = {
  getStatusBarHeight: () => {
    return StatusBar.currentHeight || 25;
  },
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === "ios" ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
};

export default Metrics;
