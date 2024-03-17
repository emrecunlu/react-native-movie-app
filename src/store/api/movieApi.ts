import { MovieListCategory } from "@/utils/enums";
import {
  Author,
  CastList,
  Movie,
  MovieDetail,
  MovieResult,
  MovieSearchDetail,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = process.env.EXPO_PUBLIC_API_KEY as string;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getMoviesByListCategory: builder.query<
      MovieResult<Movie[]>,
      MovieListCategory
    >({
      query: (category) => ({
        url: `/movie/${category}`,
        params: {
          api_key,
        },
      }),
    }),
    getMovieDetailById: builder.query<MovieDetail, string>({
      query: (movieId) => ({
        url: "/movie/" + movieId,
        params: {
          api_key,
        },
      }),
    }),
    getMovieReviewsById: builder.query<MovieResult<Author[]>, string>({
      query: (movieId) => ({
        url: "/movie/" + movieId + "/reviews",
        params: {
          api_key,
        },
      }),
    }),
    getMovieCastsById: builder.query<CastList, string>({
      query: (movieId) => ({
        url: "/movie/" + movieId + "/credits",
        params: {
          api_key,
        },
      }),
    }),
    getMoviesByTerm: builder.query<MovieResult<MovieSearchDetail[]>, string>({
      query: (query) => ({
        url: "/search/movie",
        params: {
          query,
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
  useGetMovieCastsByIdQuery,
  useGetMoviesByTermQuery,
  useLazyGetMoviesByTermQuery,
} = movieApi;
