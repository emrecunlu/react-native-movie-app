import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const HomeTab = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        className="border border-zinc-400 px-8 py-2 rounded-full"
        onPress={() =>
          router.push({
            params: { id: 1 },
            pathname: "movie/[id]",
          })
        }
      >
        <Text className="text-white">Go to Movie</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeTab;
