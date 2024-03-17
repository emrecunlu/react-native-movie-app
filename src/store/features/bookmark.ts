import { MovieDetail } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

export type State = {
  movies: MovieDetail[];
};

const initialState: State = {
  movies: [],
};

const bookmark = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<MovieDetail>) => {
      console.log(payload);
      state.movies.push(payload);
    },
    remove: (state, { payload }: PayloadAction<number>) => {
      const movie = state.movies.findIndex((movie) => movie.id === payload);

      if (movie !== -1) {
        state.movies.splice(movie, 1);
      }
    },
  },
});

export const { add, remove } = bookmark.actions;
export default bookmark.reducer;
export const useBookmarks = () =>
  useSelector((state: RootState) => state.bookmark as State);
