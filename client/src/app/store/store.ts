import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../entities/user/model/user.slice";
import productReducer from "../../entities/product/model/product.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
