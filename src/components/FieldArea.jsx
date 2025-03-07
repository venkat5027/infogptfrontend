import React, { useEffect, useRef } from "react";
import ResponseTable from "./ResponseTable";
import { useSelector } from "react-redux";

const FieldArea = () => {
  const messagesEndRef = useRef(null);

  const responseArr = useSelector((state) => state.fieldData);


  useEffect(() => {
    if (responseArr.length > 4) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [responseArr]);

  return (
    <div className="flex flex-col text-white min-h-screen">
      {responseArr.map((item, index) => {
        if (item.question) {
          return (
            <p
              className={`self-end text-right bg-[#3d3f43] px-6 py-3 rounded-4xl ${
                index !== 0 && "mt-20"
              }`}
              key={index}
            >
              {item.question}
            </p>
          );
        }
        if (item.response && typeof item.response === "string") {
          return (
            <p className="mt-5 text-[#ECECF1]" key={index}>
              {item.response}
            </p>
          );
        }
        if (
          item.response &&
          Array.isArray(item.response) &&
          item.response[0] !== null
        ) {
          return (
            <div className="self-start" key={index}>
              <ResponseTable
                response={item.response}
                responseKeys={Object.keys(item.response[0])}
              />
            </div>
          );
        }
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default FieldArea;
