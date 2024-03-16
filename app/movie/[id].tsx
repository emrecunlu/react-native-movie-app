import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

type PageParams = {
  id: string;
};

const MovieDetailPage = () => {
  const { id } = useLocalSearchParams<PageParams>();

  return (
    <View className="flex-1 items-center justify-center">
      <Stack.Screen
        options={{
          title: `Movie ${id}`,
        }}
      />

      <Text>{id}</Text>
    </View>
  );
};

export default MovieDetailPage;
