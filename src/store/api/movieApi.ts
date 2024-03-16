import { MovieListCategory } from "@/utils/enums";
import { MovieResult } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = process.env.EXPO_PUBLIC_API_KEY as string;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  endpoints: (builder) => ({
    getMoviesByListCategory: builder.query<MovieResult, MovieListCategory>({
      query: (category) => ({
        url: `movie/${category}`,
        params: {
          api_key,
        },
      }),
    }),
  }),
});

export const { useGetMoviesByListCategoryQuery } = movieApi;
