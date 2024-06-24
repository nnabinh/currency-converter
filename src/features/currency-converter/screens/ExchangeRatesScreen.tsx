import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useExchangeRatesQuery } from '../service';
import { TopStackNavigatorParamList } from '@/navigation/top-stack-navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import fonts from '@/theme/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ExchangeRatesScreenProps = NativeStackScreenProps<
  TopStackNavigatorParamList,
  'EXCHANGE_RATES_SCREEN'
>;

const ROW_HEIGHT = 40;

const Row = ({
  currencyCode,
  baseCurrency,
  rate,
}: {
  baseCurrency: string;
  currencyCode: string;
  rate: number;
}) => {
  if (baseCurrency === currencyCode) {
    return null;
  }

  return (
    <View style={styles.row}>
      <Text style={styles.code}>
        {baseCurrency} - {currencyCode}
      </Text>
      <Text style={styles.rate}>{rate}</Text>
    </View>
  );
};

export default function ExchangeRatesScreen({
  route,
}: ExchangeRatesScreenProps) {
  const { baseCurrency } = route.params || {};
  const insets = useSafeAreaInsets();
  const { data, isLoading } = useExchangeRatesQuery(baseCurrency);

  return (
    <Layout style={styles.container}>
      <Header text="Exchange rates" shouldShowBackButton />
      <View style={styles.body}>
        {isLoading && <ActivityIndicator />}
        {data && (
          <FlashList
            data={Object.keys(data.conversion_rates)}
            renderItem={({ item }) => (
              <Row
                baseCurrency={baseCurrency}
                currencyCode={item}
                rate={data.conversion_rates[item]}
              />
            )}
            estimatedItemSize={ROW_HEIGHT}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
          />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    height: ROW_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  body: {
    flex: 1,
    paddingTop: 16,
  },
  code: {
    ...fonts.body1,
    marginRight: 'auto',
  },
  rate: {
    ...fonts.body1,
  },
});
