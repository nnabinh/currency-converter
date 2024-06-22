import colors from "@/theme/colors";
import { ReactNode } from "react";
import { Keyboard, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout({
  style,
  children,
  pressable,
}: {
  style?: ViewStyle;
  children: ReactNode;
  pressable?: boolean; // Only enable pressalbe for screens having text inputs
}) {
  const insets = useSafeAreaInsets();
  const Wrapper = pressable ? Pressable : View;

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      <Wrapper onPress={() => Keyboard.dismiss()} style={styles.pressable}>
        {children}
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  pressable: {
    flex: 1,
  },
});
