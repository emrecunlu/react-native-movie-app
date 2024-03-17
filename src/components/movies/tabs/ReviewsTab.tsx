import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useGetMovieReviewsByIdQuery } from "@/store/api/movieApi";
import colors from "@/utils/constants/colors";
import { Feather } from "@expo/vector-icons";

type Props = {
  movieId: string;
};

const ReviewsTab = ({ movieId }: Props) => {
  const { isLoading, data } = useGetMovieReviewsByIdQuery(movieId);

  return (
    (isLoading && <ActivityIndicator />) || (
      <>
        {data && (
          <View className="space-y-6 items-center">
            {(data.results.length > 0 &&
              data.results.map((author) => (
                <View className="flex-row space-x-4" key={author.id}>
                  <View className="space-y-4 items-center">
                    <Image
                      className="w-12 h-12 rounded-full"
                      source={require("@/../assets/icons/author.png")}
                    />

                    <Text
                      className="font-poppins-medium"
                      style={{ color: colors.border }}
                    >
                      {author.author_details.rating?.toFixed(1) ?? "-"}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-poppins-medium text-white mb-2">
                      {author.author}
                    </Text>
                    <Text className="font-poppins text-white text-[13px]">
                      {author.content}
                    </Text>
                  </View>
                </View>
              ))) || (
              <Text className="text-white font-poppins-medium">
                No reviews yet!
              </Text>
            )}
          </View>
        )}
      </>
    )
  );
};

export default ReviewsTab;
