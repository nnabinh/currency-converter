import Header from '@/components/Header';
import Layout from '@/components/Layout';
import colors from '@/theme/colors';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ConverterCard from '../components/ConverterCard';
import { useMemo, useState } from 'react';
import { useExchangeRatesQuery } from '../service';
import fonts from '@/theme/fonts';
import { AntDesign } from '@expo/vector-icons';

const DEFAULT_AMOUNT = 1000;
const DEFAULT_BASE_CURRENCY = 'USD';
const DEFAULT_SELECTED_CURRENCY = 'SGD';

export default function CurrencyConverterScreen() {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [baseCurrency, setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
  const [convertedCurrency, setConvertedCurrency] = useState(
    DEFAULT_SELECTED_CURRENCY
  );

  const { data, isLoading, isError, refetch } =
    useExchangeRatesQuery(baseCurrency);

  const availableCurrencies = useMemo(
    () => Object.keys(data?.conversion_rates || {}),
    [data]
  );

  return (
    <Layout pressable style={styles.container}>
      <View style={styles.headerContainer}>
        <Header text="Currency Converter" variant="secondary" />
      </View>
      <View style={styles.body}>
        {isLoading && <ActivityIndicator style={styles.loader} />}
        {data && (
          <>
            <ConverterCard
              amount={amount}
              onChange={(value) => setAmount(value)}
              baseCurrency={baseCurrency}
              convertedCurrency={convertedCurrency}
              exchangeRate={data.conversion_rates[convertedCurrency]}
              availableCurrencies={availableCurrencies}
              onChangeBaseCurrency={(value) => setBaseCurrency(value)}
              onChangeConvertedCurrency={(value) => setConvertedCurrency(value)}
            />
            <Button
              onPress={refetch}
              title="Refetch"
              color={colors.foreground.highlight}
              accessibilityLabel="Learn more about this purple button"
            />
          </>
        )}
        {isError && (
          <View style={styles.errorContainer}>
            <AntDesign
              name="exclamationcircleo"
              size={16}
              color={colors.foreground.error}
            />
            <Text style={styles.errorMessage}>
              Failed to fetch exchange rates, please try again later!
            </Text>
          </View>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  headerContainer: {
    backgroundColor: colors.background.tertiary,
    paddingTop: 16,
    paddingBottom: 40,
  },
  body: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 16,
    backgroundColor: colors.background.secondary,
  },
  loader: {
    marginVertical: 100,
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.error,
  },
  errorMessage: {
    ...fonts.body2,
    color: colors.foreground.error,
  },
});
