import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "@/components/AppBar";
import { Feather } from "@expo/vector-icons";
import colors from "@/utils/constants/colors";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useGetMovieDetailByIdQuery } from "@/store/api/movieApi";
import MovieDetails from "@/components/movies/MovieDetails";
import ReviewsTab from "@/components/movies/tabs/ReviewsTab";
import CastTab from "@/components/movies/tabs/CastTab";
import Tab from "@/components/Tab";

type Params = {
  id: string;
};

const MovieDetailPage = () => {
  const [tab, setTab] = useState<number>(0);

  const { id } = useLocalSearchParams<Params>();

  if (!id) return <Redirect href="/" />;

  console.log(id);

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
        <ScrollView bounces={false} className="flex-1">
          <View className="relative">
            <Image
              className="w-full h-64 object-cover rounded-bl-3xl rounded-br-3xl"
              source={{
                uri: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
              }}
            />

            <View className="absolute right-5 bottom-5 bg-[#252836] opacity-90 rounded-lg px-3 py-2 flex-row items-center space-x-2">
              <Feather name="star" color="#FF8700" size={18} />
              <Text className="font-montserrat-semibold text-[#FF8700]">
                {data.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>

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

          <View className="px-8 mt-8">
            <MovieDetails
              runtime={data.runtime}
              relaseYear={new Date(data.release_date).getFullYear()}
              genre={data.genres[0].name}
            />

            <View className="mt-12">
              <Tab onChange={(value) => setTab(value as number)} tab={tab}>
                <Tab.Item value={0} title="About Movie">
                  <Text className="font-poppins text-white leading-6">
                    {data.overview}
                  </Text>
                </Tab.Item>
                <Tab.Item value={1} title="Reviews">
                  <ReviewsTab movieId={id} />
                </Tab.Item>
                <Tab.Item value={2} title="Cast">
                  <CastTab movieId={id} />
                </Tab.Item>
              </Tab>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MovieDetailPage;
