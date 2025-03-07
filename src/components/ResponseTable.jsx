import React from "react";
import { Typography } from "@material-tailwind/react";

const ResponseTable = (props) => {
  const classes = "p-4 border-b border-blue-gray-50 mx-20";

  const responses = props.response;
  const responseStructure = props.responseKeys;

  return (
    <div className="self-start border hover:shadow-md rounded-md m-auto mt-5">
      <tr className="text-xl">
        {responseStructure.map((item, index) => (
          <td className={classes} key={index}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-[#ECECF1] flex justify-center"
            >
              {item}
            </Typography>
          </td>
        ))}
      </tr>
      {responses.map((item, index) => (
        <tr className="font-semibold text-[#ECECF1]" key={index}>
          {Object.values(item).map((value, index) => (
            <td className="p-4 border-b border-blue-gray-50 mx-20" key={index}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium flex justify-center"
              >
                {value}
              </Typography>
            </td>
          ))}
        </tr>
      ))}
    </div>
  );
};

export default ResponseTable;
