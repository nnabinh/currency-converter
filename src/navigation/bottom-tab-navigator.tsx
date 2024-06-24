import CardsScreen from '@/features/cards/screens/CardsScreen';
import CurrencyConverterScreen from '@/features/currency-converter/screens/CurrencyConverterScreen';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import RewardsScreen from '@/features/rewards/screens/RewardsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/CustomTabBar';
import { ROUTES } from './routes';
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ScanScreen from '@/features/scan/screens/ScanScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={ROUTES.BOTTOM_TABS.CONVERTER}
        component={CurrencyConverterScreen}
        options={{
          tabBarLabel: 'Converter',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.BOTTOM_TABS.CARDS}
        component={CardsScreen}
        options={{
          tabBarLabel: 'Cards',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="credit-card" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.BOTTOM_TABS.SCAN}
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="line-scan"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.BOTTOM_TABS.REWARDS}
        component={RewardsScreen}
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="gift" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.BOTTOM_TABS.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
