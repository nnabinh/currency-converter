import colors from '@/theme/colors';
import fonts from '@/theme/fonts';
import shadow from '@/theme/shadow';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import currencyFlags from '@/utils/currency-flags';
import formatCurrency from '@/utils/format-currency';
import NavigationService from '@/navigation/service';
import { ROUTES } from '@/navigation/routes';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import formatNumber from '@/utils/format-number';

export default function ConverterCard({
  amount,
  onChange,
  baseCurrency,
  convertedCurrency,
  exchangeRate,
  availableCurrencies,
  onChangeBaseCurrency,
  onChangeConvertedCurrency,
}: {
  amount: number;
  onChange: (value: number) => void;
  baseCurrency: string;
  convertedCurrency: string;
  exchangeRate: number;
  availableCurrencies: string[];
  onChangeBaseCurrency: (value: string) => void;
  onChangeConvertedCurrency: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = useState(`${amount}`);

  const onChangeText = (value: string) => {
    const sanitizedValue =
      (value.match(/\./g) || []).length > 1 ? value.replace(/\.$/, '') : value;
    setInternalValue(sanitizedValue);
  };

  useEffect(() => {
    const removedDecimalValue = internalValue.endsWith('.')
      ? internalValue.replaceAll('.', '')
      : internalValue;
    const removedCommasValue = removedDecimalValue.replaceAll(',', '');

    if (isNaN(+removedCommasValue)) {
      onChange(0);
    } else {
      onChange(+removedCommasValue);
    }
  }, [internalValue, onChange]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Amount</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate(ROUTES.TOP_STACK.ROOT, {
                screen: ROUTES.TOP_STACK.CURRENCY_SELECTION_SCREEN,
                params: {
                  selectedCurrency: baseCurrency,
                  availableCurrencies,
                  onSelect: onChangeBaseCurrency,
                },
              })
            }
            style={styles.dropdown}
          >
            <Text style={styles.flag}>{currencyFlags[baseCurrency]}</Text>
            <Text style={styles.currency}>{baseCurrency}</Text>
            <Entypo
              name="chevron-down"
              size={20}
              color={colors.foreground.secondary}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.amount}
            value={formatNumber(internalValue)}
            onChangeText={onChangeText}
            keyboardType="numeric"
            placeholder="0.00"
            maxLength={10}
          />
        </View>
      </View>
      <View style={styles.divider}>
        <View style={styles.icon}>
          <FontAwesome6
            name="arrows-rotate"
            size={16}
            color={colors.foreground.primary}
          />
        </View>
        <View style={styles.line} />
      </View>
      <View>
        <Text style={styles.title}>Converted Amount</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate(ROUTES.TOP_STACK.ROOT, {
                screen: ROUTES.TOP_STACK.CURRENCY_SELECTION_SCREEN,
                params: {
                  selectedCurrency: convertedCurrency,
                  availableCurrencies,
                  onSelect: onChangeConvertedCurrency,
                },
              })
            }
            style={styles.dropdown}
          >
            <Text style={styles.flag}>{currencyFlags[convertedCurrency]}</Text>
            <Text style={styles.currency}>{convertedCurrency}</Text>
            <Entypo
              name="chevron-down"
              size={20}
              color={colors.foreground.secondary}
            />
          </TouchableOpacity>
          <Text style={styles.convertedAmount}>
            {formatCurrency(exchangeRate * amount, convertedCurrency)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          NavigationService.navigate(ROUTES.TOP_STACK.ROOT, {
            screen: ROUTES.TOP_STACK.EXCHANGE_RATES_SCREEN,
            params: { baseCurrency },
          })
        }
        style={styles.exchangeRatesContainer}
      >
        <Feather name="info" size={16} color={colors.foreground.highlight} />
        <Text style={styles.exchangeRates}>Exchange rates</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...shadow.primary,
    backgroundColor: colors.background.primary,
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    ...fonts.h6,
  },
  row: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  divider: {
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: colors.background.primary,
    zIndex: 1,
    padding: 8,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.foreground.secondary,
    position: 'absolute',
    top: 14,
  },
  dropdown: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    ...fonts.body1,
  },
  currency: {
    ...fonts.body1,
  },
  amount: {
    ...fonts.body1,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
  },
  convertedAmount: {
    ...fonts.body1,
  },
  exchangeRatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'flex-end',
  },
  exchangeRates: {
    ...fonts.body2,
    color: colors.foreground.highlight,
  },
});
