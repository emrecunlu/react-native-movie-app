import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Tab from "../Tab";
import { MovieListCategory } from "@/utils/enums";
import { useGetMoviesByListCategoryQuery } from "@/store/api/movieApi";
import size from "@/utils/constants/size";
import { router } from "expo-router";

const { width, height } = Dimensions.get("screen");

const MoviesCategoryList = () => {
  const [tab, setTab] = useState<MovieListCategory>(
    MovieListCategory.NowPlaying
  );

  const { isFetching, data, error } = useGetMoviesByListCategoryQuery(
    tab as MovieListCategory
  );

  return (
    <View className="mt-12">
      <Tab onChange={(tab) => setTab(tab as MovieListCategory)} tab={tab}>
        <Tab.Item value={MovieListCategory.NowPlaying} title="Now playing" />
        <Tab.Item value={MovieListCategory.UpComing} title="Upcoming" />
        <Tab.Item value={MovieListCategory.TopRated} title="Top rate" />
        <Tab.Item value={MovieListCategory.Popular} title="Popular" />
      </Tab>

      {isFetching ? (
        <ActivityIndicator className="mx-auto" />
      ) : (
        <View className="flex-wrap flex-row  gap-x-4 mb-6">
          {data?.results.map((movie) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  params: { id: movie.id },
                  pathname: "movie/[id]",
                })
              }
              className="mb-4"
              key={movie.id}
              style={{
                width: (width - size.screenPaddingX * 2) / 3 - 16 + 16 / 3,
                height: height * 0.23,
              }}
            >
              <Image
                className="rounded-2xl w-full h-full"
                resizeMode="cover"
                source={{
                  uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default MoviesCategoryList;
