import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import colors from "@/utils/constants/colors";
import { Feather } from "@expo/vector-icons";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

const SearchInput = ({ value, onChange }: Props) => {
  return (
    <View
      className="w-full rounded-3xl h-12 flex-row items-center"
      style={{ backgroundColor: colors.input }}
    >
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search"
        placeholderTextColor={colors.muted}
        className="font-poppins flex-grow px-6 text-white"
      />

      <TouchableOpacity className="mr-6">
        <Feather name="search" color={colors.muted} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
