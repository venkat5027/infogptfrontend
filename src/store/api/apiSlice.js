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
  }),
});

export const { useGetResponseQuery } = apiSlice;
