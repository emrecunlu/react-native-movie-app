import {
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useGetMovieCastsByIdQuery } from "@/store/api/movieApi";

type Props = {
  movieId: string;
};

const CastTab = ({ movieId }: Props) => {
  const { isLoading, data, error } = useGetMovieCastsByIdQuery(movieId);

  console.log(error);

  return (
    (isLoading && <ActivityIndicator />) ||
    (data && (
      <View className="flex-row flex-wrap space-y-8 items-center">
        {data.cast
          .filter((cast) => !!cast.profile_path)
          .map((cast, index) => (
            <View
              className="w-1/2 px-4"
              style={{
                alignItems: index % 2 === 0 ? "flex-start" : "flex-end",
              }}
              key={cast.id}
            >
              <TouchableOpacity className="space-y-3">
                <Image
                  className="w-28 h-28 rounded-full object-cover"
                  key={cast.id}
                  source={{
                    uri: "https://image.tmdb.org/t/p/w500" + cast.profile_path,
                  }}
                />

                <Text className="font-poppins-medium text-white text-base text-center">
                  {cast.original_name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    ))
  );
};

export default CastTab;
