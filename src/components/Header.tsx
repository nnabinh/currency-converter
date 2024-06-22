import colors from "@/theme/colors";
import fonts from "@/theme/fonts";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import NavigationService from "@/navigation/service";

export default function Header({
  text,
  variant = "primary",
  shouldShowBackButton,
}: {
  text: string;
  variant?: "primary" | "secondary";
  shouldShowBackButton?: boolean;
}) {
  const textColor =
    variant === "primary"
      ? colors.foreground.primary
      : colors.foreground.tertiary;

  return (
    <View style={styles.container}>
      {shouldShowBackButton && (
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backButton}
        >
          <Entypo name="chevron-left" size={24} color={textColor} />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    ...fonts.h2,
  },
  backButton: {
    marginRight: 8,
  },
});
