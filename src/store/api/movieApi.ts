import { MovieListCategory } from "@/utils/enums";
import { Author, Movie, MovieDetail, MovieResult } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = process.env.EXPO_PUBLIC_API_KEY as string;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  endpoints: (builder) => ({
    getMoviesByListCategory: builder.query<
      MovieResult<Movie[]>,
      MovieListCategory
    >({
      query: (category) => ({
        url: `movie/${category}`,
        params: {
          api_key,
        },
      }),
    }),
    getMovieDetailById: builder.query<MovieDetail, string>({
      query: (movieId) => ({
        url: "movie/" + movieId,
        params: {
          api_key,
        },
      }),
    }),
    getMovieReviewsById: builder.query<MovieResult<Author[]>, string>({
      query: (movieId) => ({
        url: "movie/" + movieId + "/reviews",
        params: {
          api_key,
        },
      }),
    }),
  }),
});

export const {
  useGetMoviesByListCategoryQuery,
  useGetMovieDetailByIdQuery,
  useGetMovieReviewsByIdQuery,
} = movieApi;
