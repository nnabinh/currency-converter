import Header from '@/components/Header';
import Layout from '@/components/Layout';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TopStackNavigatorParamList } from '@/navigation/top-stack-navigator';
import { FlashList } from '@shopify/flash-list';
import currencyFlags from '@/utils/currency-flags';
import { currencies } from 'country-data';
import currencySymbols from '@/utils/currency-symbols';
import fonts from '@/theme/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/theme/colors';
import { useMemo, useState } from 'react';
import NavigationService from '@/navigation/service';
import { EvilIcons } from '@expo/vector-icons';

type CurrencySelectionScreenProps = NativeStackScreenProps<
  TopStackNavigatorParamList,
  'CURRENCY_SELECTION_SCREEN'
>;

const ROW_HEIGHT = 60;

const Row = ({
  currencyCode,
  disabled,
  onPress,
}: {
  currencyCode: string;
  disabled?: boolean;
  onPress?: (value: string) => void;
}) => {
  if (!currencyFlags[currencyCode] || !currencies[currencyCode]?.name) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(currencyCode);
        NavigationService.goBack();
      }}
      disabled={disabled}
      style={styles.row}
    >
      <Text style={styles.flag}>{currencyFlags[currencyCode]}</Text>
      <Text style={styles.code}>{currencyCode}</Text>
      <Text style={styles.name}>{currencies[currencyCode]?.name}</Text>
      <Text style={styles.symbol}>{currencySymbols[currencyCode]}</Text>
    </TouchableOpacity>
  );
};

export default function CurrencySelectionScreen({
  route,
}: CurrencySelectionScreenProps) {
  const { availableCurrencies, selectedCurrency, onSelect } =
    route.params || {};
  const insets = useSafeAreaInsets();
  const [searchedText, setSearchedText] = useState('');

  const selectableCurrencies = useMemo(
    () =>
      availableCurrencies
        .filter((currency) => currency !== selectedCurrency)
        .filter((str) => str.includes(searchedText)),
    [availableCurrencies, selectedCurrency, searchedText]
  );

  return (
    <Layout style={styles.container}>
      <Header text="Select currency" shouldShowBackButton />
      <View style={styles.search}>
        <EvilIcons
          name="search"
          size={28}
          color={colors.foreground.secondary}
        />
        <TextInput
          placeholder="Search currency"
          onChangeText={(value) => setSearchedText(value)}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.selectedCurrency}>
        <Row disabled currencyCode={selectedCurrency} />
      </View>
      <FlashList
        data={selectableCurrencies}
        renderItem={({ item }) => (
          <Row currencyCode={item} onPress={onSelect} />
        )}
        estimatedItemSize={ROW_HEIGHT}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.foreground.secondary,
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 8,
    height: ROW_HEIGHT,
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    height: ROW_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  selectedCurrency: {
    borderWidth: 1,
    borderColor: colors.foreground.secondary,
    borderRadius: 4,
  },
  flag: {
    ...fonts.body1,
  },
  code: {
    ...fonts.body1,
    marginHorizontal: 16,
  },
  name: {
    ...fonts.body1,
    flex: 1,
    marginRight: 'auto',
  },
  symbol: {
    ...fonts.body1,
  },
});
