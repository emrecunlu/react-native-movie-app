import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "@/utils/constants/colors";

type Props = {
  relaseYear: number;
  runtime: number;
  genre: string;
};

const MovieDetails = ({ genre, relaseYear, runtime }: Props) => {
  const items = [
    {
      icon: <Feather name="calendar" color={colors.muted} size={18} />,
      title: relaseYear,
    },
    {
      icon: <Feather name="clock" color={colors.muted} size={18} />,
      title: `${runtime} Minutes`,
    },
    {
      icon: <Feather name="tv" color={colors.muted} size={18} />,
      title: genre,
    },
  ];

  return (
    <View className="flex-row space-x-6 flex-wrap justify-center items-center">
      {items.map((item, index) => (
        <TouchableOpacity
          className="flex-row items-center space-x-2"
          key={index}
        >
          {item.icon}
          <Text
            style={{ color: colors.muted }}
            className="font-montserrat-medium"
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MovieDetails;
