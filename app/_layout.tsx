import React from "react";
import { Stack } from "expo-router";
import {
  ThemeProvider,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import colors from "@/utils/constants/colors";

const Layout = () => {
  const { dark } = useTheme();

  return (
    <ThemeProvider
      value={{
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
        },
        dark,
      }}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default Layout;
