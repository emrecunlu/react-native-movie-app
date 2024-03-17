import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import PopularMoviesCarousel from "@/components/movies/PopularMoviesCarousel";
import { useGetMoviesByListCategoryQuery } from "@/store/api/movieApi";
import { MovieListCategory } from "@/utils/enums";
import size from "@/utils/constants/size";
import MoviesCategoryList from "@/components/movies/MoviesCategoryList";

const HomeTab = () => {
  const { isLoading, data, error } = useGetMoviesByListCategoryQuery(
    MovieListCategory.Popular
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ paddingHorizontal: size.screenPaddingX }}
      className="flex-1"
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Text className="font-poppins-semibold text-lg text-white pt-4">
          What do you want to watch?
        </Text>

        <View className="mt-6 mb-8">
          <SearchInput />
        </View>

        <PopularMoviesCarousel movies={data?.results.slice(0, 10) ?? []} />

        <MoviesCategoryList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;
