import { View, Text } from "react-native";
import React from "react";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

type SearchParams = {
  isRedirect?: boolean;
};

const SearchTab = () => {
  const { isRedirect }: SearchParams = useLocalSearchParams();

  console.log(isRedirect);

  return (
    <View>
      <Text>SearchTab</Text>
    </View>
  );
};

export default SearchTab;
