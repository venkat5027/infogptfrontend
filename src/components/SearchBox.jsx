import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFieldData } from "../store/datastore/questionAndResponseSlice";
import { useGetResponseQuery } from "../store/api/apiSlice";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [triggerQuery, setTriggerQuery] = useState("");
  const dispatch = useDispatch();
  const [responseData, setResponseData] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query.trim()) {
      const question = query.trim();
      dispatch(setFieldData({ question }));
      setTriggerQuery(question);
      setQuery("");
    }
  };

  const {
    data,
    error: errorData,
    isLoading,
  } = useGetResponseQuery(triggerQuery, {
    skip: !triggerQuery,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setResponseData(data.response);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isLoading && errorData?.data?.response) {
      setResponseData(errorData.data.response);
    }
  }, [errorData, isLoading]);

  useEffect(() => {
    if (responseData) {
      setTimeout(() => {
        dispatch(setFieldData({ response: responseData }));
      }, 500);
    }
  }, [responseData, dispatch]);

  return (
    <div className="w-full fixed bottom-0 box-border bg-[#202123]">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything"
        className="w-8/12 rounded-3xl bg-[#3d3f43] text-[#ECECF1] pt-2 pb-6 pl-4 pr-8 focus:outline-none box-border"
      />
      <p className="text-[#ECECF1] ml-64">
        InfoGpt collab with newzen & magniqe. Check related info.
      </p>
    </div>
  );
};

export default SearchBox;
