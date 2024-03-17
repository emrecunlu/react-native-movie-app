import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "@/utils/constants/colors";
import size from "@/utils/constants/size";
import { router } from "expo-router";

type Props = {
  title: string;
  actions?: () => ReactNode;
};

const AppBar = ({ title, actions }: Props) => {
  return (
    <View
      className="flex-row w-full justify-between items-center h-16"
      style={{
        paddingHorizontal: size.screenPaddingX,
      }}
    >
      {router.canGoBack() && (
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" color={colors.light} size={28} />
        </TouchableOpacity>
      )}
      <Text className="mx-auto text-[#ECECEC] font-montserrat-semibold text-base">
        {title}
      </Text>
      {actions && <View className="flex-row items-center">{actions()}</View>}
    </View>
  );
};

export default AppBar;
