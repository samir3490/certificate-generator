import React from "react";
import { useSearchParams } from "react-router-dom";
import certTemplate from "../assets/Certificate.png";

const Verify = () => {
  const [params] = useSearchParams();

  const name = params.get("name");
  const desc = params.get("desc");
  const date = params.get("date");

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Certificate Verified</h2>

      <div className="flex justify-center mt-6">
        <div
          className="relative w-[842px] h-[595px] bg-cover bg-center border"
          style={{
            backgroundImage: `url(${certTemplate})`,
          }}
        >
          <div className="absolute top-[250px] w-full text-center text-2xl font-bold text-black">
            {name}
          </div>
          <div className="absolute top-[300px] w-full text-center text-lg text-black">
            {desc}
          </div>
          <div className="absolute bottom-[148px] left-[204px] text-md text-black">
            {date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;