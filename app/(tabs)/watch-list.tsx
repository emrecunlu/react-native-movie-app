import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useBookmarks } from "@/store/features/bookmark";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieInformation from "@/components/movies/MovieInformation";
import AppBar from "@/components/AppBar";

const MoviesEmptyListView = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-4">
      <Image
        width={76}
        height={76}
        resizeMode="cover"
        source={require("@/../assets/icons/magic-box.png")}
      />

      <Text className="font-montserrat-semibold text-[#EBEBEF] text-base">
        There is no movie yet!
      </Text>
      <View className="items-center">
        <Text className="font-montserrat-medium text-[#92929D] text-[13px]">
          Find your movie by Type title,
        </Text>
        <Text className="font-montserrat-medium text-[#92929D] text-[13px]">
          categories, years, etc
        </Text>
      </View>
    </View>
  );
};

const WatchListTab = () => {
  const { movies } = useBookmarks();

  return (
    <SafeAreaView className="flex-1">
      <AppBar title="Watch List" />
      {movies.length <= 0 ? (
        <MoviesEmptyListView />
      ) : (
        <ScrollView bounces={false} className="px-8">
          {movies.map((movie, index) => {
            const isLastItem = index === movies.length - 1;

            console.log(isLastItem);

            return (
              <View className={`${!isLastItem && "mb-6"}`} key={movie.id}>
                <MovieInformation
                  id={movie.id}
                  title={movie.title}
                  genre={movie.genres[0].name}
                  posterUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  relaseYear={new Date(movie.release_date).getFullYear()}
                  runtime={movie.runtime}
                  voteRatio={movie.vote_average.toFixed(1)}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default WatchListTab;
