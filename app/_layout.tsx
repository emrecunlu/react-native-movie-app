import React from "react";
import { Stack } from "expo-router";
import {
  ThemeProvider,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import colors from "@/utils/constants/colors";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "@/store";

const Layout = () => {
  const { dark } = useTheme();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Montserrat_600SemiBold,
    Roboto_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
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

        <StatusBar style="inverted" />
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;
