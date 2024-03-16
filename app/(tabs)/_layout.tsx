import colors from "@/utils/constants/colors";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";

const Layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1.5,
          height: 100,
        },
        tabBarLabel({ children, focused }) {
          return (
            <Text
              className="font-roboto-medium text-[12px]"
              style={{
                color: focused ? colors.border : colors.muted,
              }}
            >
              {children}
            </Text>
          );
        },
        tabBarIcon({ focused, size }) {
          const routeName = route.name;

          if (routeName === "index") {
            return (
              <Feather
                name="home"
                color={focused ? colors.border : colors.muted}
                size={size}
              />
            );
          } else if (routeName === "search") {
            return (
              <Feather
                name="search"
                color={focused ? colors.border : colors.muted}
                size={size}
              />
            );
          } else if (routeName === "watch-list") {
            return (
              <Feather
                name="bookmark"
                color={focused ? colors.border : colors.muted}
                size={size}
              />
            );
          }
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />

      <Tabs.Screen
        name="watch-list"
        options={{
          title: "Watch List",
        }}
      />
    </Tabs>
  );
};

export default Layout;
