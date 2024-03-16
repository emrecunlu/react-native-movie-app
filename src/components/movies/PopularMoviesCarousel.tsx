import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import React from "react";
import { Movie } from "@/utils/types";
import size from "@/utils/constants/size";
import colors from "@/utils/constants/colors";
import { Link } from "expo-router";

type Props = {
  movies: Movie[];
};

const { width, height } = Dimensions.get("screen");

const MovieItem = (movie: Movie, index: number) => {
  const itemWidth = (width - size.screenPaddingX * 2) * 0.5;

  return (
    <Link
      asChild
      href={{
        params: { id: movie.id },
        pathname: "movie/[id]",
      }}
    >
      <TouchableOpacity>
        <Image
          className="rounded-2xl m-2"
          style={{
            height: height * 0.3,
            width: itemWidth - 16,
          }}
          resizeMode="cover"
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
          }}
        />
      </TouchableOpacity>
    </Link>
  );
};

const PopularMoviesCarousel = ({ movies }: Props) => {
  return (
    <View>
      <FlatList
        data={movies}
        renderItem={({ item, index }) => MovieItem(item, index + 1)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};

export default PopularMoviesCarousel;
