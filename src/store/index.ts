import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./api/movieApi";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(movieApi.middleware);
  },
});
