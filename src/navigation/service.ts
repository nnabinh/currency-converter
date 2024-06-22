import {
  CommonActions,
  NavigationContainerRef,
} from "@react-navigation/native";
import { MutableRefObject } from "react";

type NavigationRef = MutableRefObject<null | NavigationContainerRef<{}>>;

let _navigatorRef: NavigationRef;

function setTopLevelNavigator(navigatorRef: NavigationRef) {
  _navigatorRef = navigatorRef;
}

function navigate(name: string, params?: object) {
  _navigatorRef.current?.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function goBack() {
  if (_navigatorRef.current?.canGoBack()) {
    _navigatorRef?.current?.dispatch(CommonActions.goBack());
  }
}

const NavigationService = {
  navigate,
  goBack,
  setTopLevelNavigator,
};

export default NavigationService;
