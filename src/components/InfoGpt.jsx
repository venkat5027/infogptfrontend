import React from "react";
import TextComponent from "./TextComponent";
import FieldArea from "./FieldArea";
import SearchBox from "./SearchBox";

// bg-[#202123]
const InfoGpt = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#202123]">
      <div className="flex bg-[#202123] py-1.5 sticky top-0 z-50">
        <TextComponent />
      </div>
      <div className="flex flex-col space-y-28 md:px-64">
        <FieldArea />
        <SearchBox />
      </div>
    </div>
  );
};

export default InfoGpt;
