import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, INFO_URL } from "../../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Info"],
  endpoints: (builder) => ({
    getResponse: builder.query({
      query: (question) => ({
        url: `${INFO_URL}?qst=${encodeURIComponent(question)}`,
        method: "GET",
      }),
    }),
    getFileResponse: builder.query({
      query: (question) => ({
        url: `${INFO_URL}?qst=${encodeURIComponent(question)}`,
        method: "GET",
        responseHandler: async (response) => {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        },
        cacheResponse: false,
      }),
    }),
  }),
});

export const { useGetResponseQuery, useGetFileResponseQuery } = apiSlice;
