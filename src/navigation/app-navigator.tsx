import BottomTabNavigator from "./bottom-tab-navigator";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "./routes";
import TopStackNavigator from "./top-stack-navigator";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.BOTTOM_TABS.ROOT}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
        <Stack.Screen
          name={ROUTES.TOP_STACK.ROOT}
          component={TopStackNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
