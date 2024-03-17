import { View, Text } from "react-native";
import React from "react";
import { useBookmarks } from "@/store/features/bookmark";
import { SafeAreaView } from "react-native-safe-area-context";

const WatchListTab = () => {
  const { movies } = useBookmarks();

  return (
    <SafeAreaView>
      <Text>{JSON.stringify(movies)}</Text>
    </SafeAreaView>
  );
};

export default WatchListTab;
