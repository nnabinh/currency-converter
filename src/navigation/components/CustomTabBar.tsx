import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import colors from "@/theme/colors";
import fonts from "@/theme/fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabContainer, { marginBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const textColor = isFocused
          ? colors.foreground.highlight
          : colors.foreground.secondary;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            key={index}
          >
            {typeof label === "string" ? (
              <>
                {options.tabBarIcon({
                  focused: isFocused,
                  color: textColor,
                  size: 20,
                })}
                <Text
                  style={[
                    styles.label,
                    {
                      color: textColor,
                    },
                  ]}
                >
                  {label}
                </Text>
              </>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 64,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.background.secondary,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    ...fonts.body2,
    marginTop: 4,
  },
});

export default CustomTabBar;
