import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { MovieListCategory } from "@/utils/enums";
import colors from "@/utils/constants/colors";
import { useGetMoviesByListCategoryQuery } from "@/store/api/movieApi";
import size from "@/utils/constants/size";
import { Link } from "expo-router";

const { width } = Dimensions.get("screen");

const categories = [
  {
    title: "Now Playing",
    value: MovieListCategory.NowPlaying,
  },
  {
    title: "Upcoming",
    value: MovieListCategory.UpComing,
  },
  {
    title: "Top rated",
    value: MovieListCategory.TopRated,
  },
  {
    title: "Popular",
    value: MovieListCategory.Popular,
  },
];

const MoviesCategoryList = () => {
  const [selected, setSelected] = useState<MovieListCategory>(
    MovieListCategory.NowPlaying
  );

  const { isFetching, data } = useGetMoviesByListCategoryQuery(selected);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const setSelectedCategory = (value: MovieListCategory, xLocation: number) => {
    scrollViewRef.current?.scrollTo({ x: xLocation, animated: true });

    setSelected(value);
  };

  return (
    <View className="mt-16">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => {
          const isSelected = selected === category.value;

          return (
            <TouchableOpacity
              key={category.value}
              onPress={(event) => {
                event.target.measure((x) =>
                  setSelectedCategory(category.value, x)
                );
              }}
              className="mr-6 rounded pb-4"
              style={{
                borderBottomWidth: isSelected ? 6 : 0,
                borderBottomColor: colors.input,
              }}
            >
              <Text
                className="font-poppins-medium text-lg"
                style={{
                  color: isSelected ? colors.light : colors.muted,
                }}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View className="mt-6 flex-row flex-wrap space-y-2 items-center space-x-2">
        {(isFetching && <ActivityIndicator className="mx-auto" />) || (
          <>
            {data?.results &&
              data.results.map((movie) => (
                <Link
                  key={movie.id}
                  asChild
                  href={{
                    params: { id: movie.id },
                    pathname: "movie/[id]",
                  }}
                >
                  <TouchableOpacity>
                    <Image
                      className="h-48 rounded-2xl"
                      style={{
                        width: (width - size.screenPaddingX * 2) / 3 - 8,
                      }}
                      source={{
                        uri:
                          "https://image.tmdb.org/t/p/w300" + movie.poster_path,
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </Link>
              ))}
          </>
        )}
      </View>
    </View>
  );
};

export default MoviesCategoryList;
