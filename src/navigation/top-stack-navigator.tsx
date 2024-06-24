import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import CurrencySelectionScreen from '@/features/currency-converter/screens/CurrencySelectionScreen';
import ExchangeRatesScreen from '@/features/currency-converter/screens/ExchangeRatesScreen';

export type TopStackNavigatorParamList = {
  [ROUTES.TOP_STACK.CURRENCY_SELECTION_SCREEN]: {
    selectedCurrency: string;
    availableCurrencies: string[];
    onSelect: (value: string) => void;
  };
  [ROUTES.TOP_STACK.EXCHANGE_RATES_SCREEN]: {
    baseCurrency: string;
  };
};

const Stack = createNativeStackNavigator<TopStackNavigatorParamList>();

export default function TopStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.TOP_STACK.CURRENCY_SELECTION_SCREEN}
        component={CurrencySelectionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.TOP_STACK.EXCHANGE_RATES_SCREEN}
        component={ExchangeRatesScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
