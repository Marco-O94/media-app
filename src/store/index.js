import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumsApi } from "./apis/albumsApi";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    /* Here we're not creating an array, it says
    Go an look up the reducer path property. It is a string */
  },
  middleware: (getDefaultMiddleware) => {
    // Necessary part to work fine with the store.
    return getDefaultMiddleware().concat(albumsApi.middleware);
  },
});
// To not repeat the same thing for every api we'll create, we're going to use the function below
setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";
