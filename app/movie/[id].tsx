import { View, Text, ActivityIndicator, Image, Dimensions } from "react-native";
import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useGetMovieDetailByIdQuery } from "@/store/api/movieApi";
import colors from "@/utils/constants/colors";
import { Feather } from "@expo/vector-icons";

type PageParams = {
  id: string;
};

const { width, height } = Dimensions.get("screen");

const MovieDetailPage = () => {
  const { id } = useLocalSearchParams<PageParams>();

  const { isError, data, isLoading } = useGetMovieDetailByIdQuery(id ?? "");

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (data) {
    return (
      <View className="flex-1">
        <View className="relative">
          <Image
            className="w-full h-64 rounded-bl-3xl rounded-br-3xl"
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
            }}
            resizeMode="cover"
          />

          <View className="absolute bottom-5 right-5 flex-row items-center space-x-2 rounded-2xl bg-[#252836] p-2">
            <Feather name="star" size={18} />
            <Text className="text-green-600 font-montserrat-semibold">
              {data.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default MovieDetailPage;
