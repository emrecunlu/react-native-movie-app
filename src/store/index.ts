import {
  Action,
  Reducer,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { movieApi } from "./api/movieApi";
import bookmark from "./features/bookmark";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  bookmark,
  [movieApi.reducerPath]: movieApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["bookmark"],
    blacklist: [movieApi.reducerPath],
  },
  reducers
);

export const store = configureStore({
  reducer: persistedReducer as any,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(movieApi.middleware);
  },
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
