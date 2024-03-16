import colors from "@/utils/constants/colors";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
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
