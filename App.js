import { StyleSheet, View, Text, StatusBar, Dimensions } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import tabConfig from "./configs/tabConfig";
import { TodosProvider } from "./components/TodosProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");

const fetchFonts = () => {
  return Font.loadAsync({
    "gmarketsans-font": require("./assets/fonts/GmarketSansTTFMedium.ttf"),
  });
};

const CustomHeader = ({ title }) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts(); // 폰트 로드
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e); // 폰트 로드 중 오류 발생시 경고
      } finally {
        setFontLoaded(true);
        await SplashScreen.hideAsync(); // 폰트 로드가 완료되면 스플래시 스크린을 숨겨줌
      }
    };

    // 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
    SplashScreen.preventAutoHideAsync();

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = tabConfig.find(
        (config) => config.name === route.name
      );

      const iconName = focused
        ? routeConfig.focusedIcon
        : routeConfig.unfocuedIcon;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconName} size={size} color={color} />;
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 23,
      fontWeight: "bold",
    },
    headerStyle: {
      // Android
      elevation: 8,

      // IOS
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      paddingBottom: 10,
      fontWeight: "bold",
      fontFamily: "gmarketsans-font",
    },
    tabBarStyle: {
      height: "8%",
    },
    tabBarInactiveTintColor: "#0163d2",
    tabBarActiveTintColor: "black",
  });

  return (
    <TodosProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          {tabConfig.map((routeConfig) => (
            <Tab.Screen
              key={routeConfig.name}
              name={routeConfig.name}
              component={routeConfig.component}
              options={{
                title: routeConfig.title,
                header: () => <CustomHeader title={routeConfig.title} />,
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </TodosProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBox: {
    height: height * 0.05,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 15,
  },
});
