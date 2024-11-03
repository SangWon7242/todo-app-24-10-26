import React, { useState, useEffect, createContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const AppLoadingContext = createContext();

const fetchFonts = () => {
  return Font.loadAsync({
    "gmarketsans-font": require("../assets/fonts/GmarketSansTTFMedium.ttf"),
  });
};

export const AppLoadingProvider = ({ children }) => {
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

  return (
    <AppLoadingContext.Provider value={{ fontsLoaded }}>
      {children}
    </AppLoadingContext.Provider>
  );
};

export default AppLoadingContext;
