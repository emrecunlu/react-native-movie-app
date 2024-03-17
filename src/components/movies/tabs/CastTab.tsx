import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useGetMovieCastsByIdQuery } from "@/store/api/movieApi";

type Props = {
  movieId: string;
};

const CastTab = ({ movieId }: Props) => {
  const { data, isLoading } = useGetMovieCastsByIdQuery(movieId);

  return (
    <View className="justify-center items-center">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View className="flex-wrap flex-row space-y-6 items-center">
          {data?.cast
            .filter((cast) => cast.profile_path)
            .map((cast, index) => (
              <View key={cast.id} className="w-1/2">
                <TouchableOpacity
                  className="items-center space-y-6 px-4"
                  style={{
                    marginLeft: (index + 1) % 2 === 0 ? "auto" : 0,
                    marginRight: (index + 1) % 2 !== 0 ? "auto" : 0,
                  }}
                >
                  <Image
                    className="w-32 h-32 object-cover rounded-full"
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w300" + cast.profile_path,
                    }}
                  />

                  <Text className="text-white font-poppins-medium">
                    {cast.original_name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

export default CastTab;
