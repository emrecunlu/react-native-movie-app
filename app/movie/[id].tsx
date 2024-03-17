import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "@/components/AppBar";
import { Feather } from "@expo/vector-icons";
import colors from "@/utils/constants/colors";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useGetMovieDetailByIdQuery } from "@/store/api/movieApi";
import MovieDetails from "@/components/movies/MovieDetails";

type Params = {
  id: string;
};

const MovieDetailPage = () => {
  const { id } = useLocalSearchParams<Params>();

  if (!id) return <Redirect href="/" />;

  const { data, isLoading } = useGetMovieDetailByIdQuery(id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <AppBar
        title="Detail"
        actions={() => (
          <TouchableOpacity>
            <Feather name="bookmark" size={26} color={colors.light} />
          </TouchableOpacity>
        )}
      />

      {data && (
        <ScrollView className="flex-1">
          <View>
            <Image
              className="w-full h-64 object-cover rounded-bl-3xl rounded-br-3xl"
              source={{
                uri: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
              }}
            />

            <View className="flex-row px-8 -mt-24 items-start">
              <Image
                className="w-32 h-48 rounded-2xl"
                source={{
                  uri: "https://image.tmdb.org/t/p/w500" + data.poster_path,
                }}
              />

              <Text className="font-montserrat-semibold text-white text-lg flex-1 px-4 mt-28">
                {data.title}
              </Text>
            </View>
          </View>

          <View className="px-8 mt-8">
            <MovieDetails
              runtime={data.runtime}
              relaseYear={new Date(data.release_date).getFullYear()}
              genre={data.genres[0].name}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MovieDetailPage;
