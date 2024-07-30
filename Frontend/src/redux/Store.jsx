import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MySlice } from "./Slice";
import { AdminSlice } from "./admin/AdminSlice";
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
import storage from "redux-persist/lib/storage";
import { ProductSlice } from "./products/ProductSlice";
import BlogSlice from "./BlogSlice";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  combineReducers({
    MySliceProvider: MySlice,
    AdminSliceProvider: AdminSlice,
    ProductSliceProvider: ProductSlice,
    BlogSliceProvider: BlogSlice,
  })
);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persisterStore = persistStore(Store);
