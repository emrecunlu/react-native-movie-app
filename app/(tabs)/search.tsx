import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import AppBar from "@/components/AppBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import colors from "@/utils/constants/colors";
import SearchInput from "@/components/SearchInput";
import _ from "lodash";
import { useLazyGetMoviesByTermQuery } from "@/store/api/movieApi";
import MovieInformation from "@/components/movies/MovieInformation";
import { getGenreById } from "@/utils/helpers";

type SearchParams = {
  isRedirect?: boolean;
};

const MoviesEmptyListView = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-4">
      <Image
        width={76}
        height={76}
        resizeMode="cover"
        source={require("@/../assets/icons/no-results.png")}
      />

      <View>
        <Text className="font-montserrat-semibold text-[#EBEBEF] text-base">
          We are sorry, We can
        </Text>
        <Text className="font-montserrat-semibold text-[#EBEBEF] text-base">
          Not find the movie :(
        </Text>
      </View>
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

const SearchTab = () => {
  const [trigger, result] = useLazyGetMoviesByTermQuery();

  // lodash, debounce input, 1000ms search result.
  const searchMovies = _.debounce((term: string) => {
    trigger(term);
  }, 1000);

  return (
    <SafeAreaView className="flex-1">
      <AppBar
        title="Search"
        actions={() => (
          <TouchableOpacity>
            <Feather name="info" color={colors.light} size={24} />
          </TouchableOpacity>
        )}
      />

      <View className="px-8 mt-6 flex-1">
        <SearchInput onChange={searchMovies} />

        {(result.isFetching && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
          </View>
        )) ||
          (result.data?.results && (
            <>
              {(result.data.results.length > 0 && (
                <ScrollView bounces={false} className="mt-8">
                  {result.data.results.map((movie) => (
                    <View className="mb-6" key={movie.id}>
                      <MovieInformation
                        id={movie.id}
                        title={movie.title}
                        genre={getGenreById(movie.genre_ids[0])}
                        posterUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        relaseYear={new Date(movie.release_date).getFullYear()}
                        runtime={movie.runtime}
                        voteRatio={movie.vote_average.toFixed(1)}
                      />
                    </View>
                  ))}
                </ScrollView>
              )) || <MoviesEmptyListView />}
            </>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default SearchTab;
