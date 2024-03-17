import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
  posterUrl: string;
  title: string;
  voteRatio: string;
  genre: string;
  relaseYear: number;
  runtime: number;
  id: number;
};

const MovieInformation = ({
  genre,
  posterUrl,
  relaseYear,
  runtime,
  title,
  voteRatio,
  id,
}: Props) => {
  return (
    <TouchableOpacity
      className="flex-row space-x-4"
      onPress={() =>
        router.push({
          params: { id },
          pathname: "movie/[id]",
        })
      }
    >
      <Image
        source={{ uri: posterUrl }}
        className="rounded-2xl"
        width={100}
        height={150}
        resizeMode="cover"
      />

      <View className="flex-1 justify-between">
        <Text numberOfLines={1} className="font-poppins text-base text-white">
          {title}
        </Text>

        <View className="space-y-2">
          <View className="flex-row items-center space-x-2">
            <Feather name="star" color="#FF8700" size={16} />
            <Text className="text-[#FF8700] font-poppins">{voteRatio}</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <Feather name="tv" color="#EEEEEE" size={16} />
            <Text className="text-[#EEEEEE] font-poppins">{genre}</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <Feather name="calendar" color="#EEEEEE" size={16} />
            <Text className="text-[#EEEEEE] font-poppins">{relaseYear}</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <Feather name="clock" color="#EEEEEE" size={16} />
            <Text className="text-[#EEEEEE] font-poppins">
              {runtime} minutes
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieInformation;
