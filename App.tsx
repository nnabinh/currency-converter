import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "@/navigation/app-navigator";
import { Provider } from "react-redux";
import { persistor, store } from "src/store";
import { useEffect, useRef } from "react";
import NavigationService from "@/navigation/service";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    NavigationService.setTopLevelNavigator(containerRef);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={containerRef}>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

LogBox.ignoreLogs(["Non-serial"]);
