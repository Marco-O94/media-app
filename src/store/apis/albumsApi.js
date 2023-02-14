import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      // Remove for production
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        /* If we have the user id in album object 
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.userId }];
        },*/
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),

      // Mutation if we want to modify or add data
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "UserAlbums", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      // The key fetchAlbums is used as a template for what the hook name should be.
      // albumsApi.useFetchAlbumsQuery();
      //builder.query if get or builder.mutation if modify
      fetchAlbums: builder.query({
        // The third argument is the external argument that we're going to pass to the hook
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UserAlbums", id: user.id });
          return tags;
        }, // Tag for invalidation
        query: (user) => {
          return {
            //Path property
            url: "/albums",
            //If it is a get request we've to use params object, else body
            params: {
              userId: user.id,
            },
            // Specifying the method.
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
