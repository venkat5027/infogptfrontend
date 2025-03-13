import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFieldData } from "../store/datastore/questionAndResponseSlice";
import {
  useGetResponseQuery,
  useGetFileResponseQuery,
} from "../store/api/apiSlice";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [triggerQuery, setTriggerQuery] = useState("");
  const [triggerFileQuery, setTriggerFileQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query.trim()) {
      const question = query.trim();
      dispatch(setFieldData({ question }));
      if (question.includes("file")) setTriggerFileQuery(question);
      else setTriggerQuery(question);
      setQuery("");
    }
  };

  const {
    data,
    error: errorData,
    isLoading,
  } = useGetResponseQuery(triggerQuery, {
    skip: !triggerQuery,
    headers: {
      Accept: "application/json",
    },
  });

  const {
    data: fileData,
    error: errorFileData,
    isLoading: isFileLoading,
  } = useGetFileResponseQuery(triggerFileQuery, {
    skip: !triggerFileQuery,
    headers: {
      Accept: "application/pdf",
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      setTimeout(() => {
        dispatch(setFieldData({ response: data.response }));
      }, 500);
    }
  }, [data, isLoading, dispatch]);

  useEffect(() => {
    if (!isLoading && errorData?.data?.response) {
      setTimeout(() => {
        dispatch(setFieldData({ response: errorData.data.response }));
      }, 500);
    }
  }, [errorData, isLoading, dispatch]);

  useEffect(() => {
    if (!isFileLoading && fileData) {
      setTimeout(() => {
        dispatch(setFieldData({ response: { fileUrl: fileData } }));
      }, 500);
    }
  }, [isFileLoading, fileData, dispatch]);

  useEffect(() => {
    if (!isFileLoading && errorFileData) {
      setTimeout(() => {
        dispatch(
          setFieldData({ response: { errorUrl: "error while loading file" } })
        );
      }, 500);
    }
  }, [isFileLoading, errorFileData, dispatch]);

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
