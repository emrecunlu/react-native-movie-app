import React, { useEffect, useRef } from "react";
import { Stack, router, usePathname } from "expo-router";
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
import {
  Montserrat_600SemiBold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import colors from "@/utils/constants/colors";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View } from "react-native";

const Layout = () => {
  const { dark } = useTheme();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Roboto_500Medium,
  });

  const pathame = usePathname();
  const ref = useRef(null);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          value={{
            colors: {
              ...DefaultTheme.colors,
              background: colors.background,
            },
            dark,
          }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <StatusBar style="inverted" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
