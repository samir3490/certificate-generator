// src/pages/Generator.jsx
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import { FcGraduationCap } from "react-icons/fc";
import html2canvas from "html2canvas";
import certTemplate from "../assets/Certificate.png";
import { FaFileDownload } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Generator = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const certRef = useRef();
  const hiddenCertRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(hiddenCertRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${name}_certificate.pdf`);
  };

  const handleDescChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.trim().split(/\s+/);

    if (words.length <= 30) {
      setDesc(inputValue);
    } else {
      toast.error("Only 30 words allowed!");
    }
  };

  const qrValue = `${window.location.origin}/verify?name=${encodeURIComponent(
    name
  )}&desc=${encodeURIComponent(desc)}&date=${encodeURIComponent(date)}`;

  const trimmedDesc =
    desc.split(" ").slice(0, 30).join(" ") +
    (desc.split(" ").length > 30 ? "..." : "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-10">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
        <FcGraduationCap className="text-5xl" />
        Certificate Generator
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        {/* Left Panel */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            Fill Certificate Details
          </h3>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Recipient's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-sm"
            />
            <textarea
              placeholder="Certificate Description"
              value={desc}
              onChange={handleDescChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-sm"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-sm"
            />
          </div>

          <button
            onClick={handleDownload}
            className="mt-8 w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-cyan-700 hover:to-indigo-600 transition duration-300 flex items-center justify-center gap-x-2"
          >
            <FaFileDownload className="text-lg" />
            Download Certificate
          </button>
        </div>

        {/* Right Panel - Visible Certificate */}
        <div className="w-full lg:w-2/3 flex justify-center">
          <div
            ref={certRef}
            className="relative w-full aspect-[842/595] max-w-[842px] bg-cover bg-center border rounded-xl shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${certTemplate})` }}
          >
            <div className="absolute top-[41%] w-full text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-black px-4 mb-2 sm:mb-4">
              {name}
            </div>

            <div className="absolute top-[48%] w-full text-center text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17px] text-black px-4">
              {trimmedDesc}
            </div>

            <div className="absolute bottom-[25%] left-[24%] text-sm md:text-base text-black">
              {date}
            </div>

            <div className="absolute bottom-[5%] right-[5%] flex flex-col items-center">
              <QRCode value={qrValue} size={60} />
              <span className="text-[10px] mt-1 text-black">
                Verify your certificate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Certificate (Desktop Format Only for Download) */}
      <div className="absolute left-[-9999px]">
        <div
          ref={hiddenCertRef}
          className="relative w-[842px] h-[595px] bg-cover bg-center"
          style={{ backgroundImage: `url(${certTemplate})` }}
        >
          <div className="absolute top-[41%] w-full text-center text-3xl font-medium text-black px-4 mb-4">
            {name}
          </div>

          <div className="absolute top-[48%] w-full text-center text-[17px] text-black px-4">
            {trimmedDesc}
          </div>

          <div className="absolute bottom-[25%] left-[24%] text-base text-black">
            {date}
          </div>

          <div className="absolute bottom-[5%] right-[5%] flex flex-col items-center">
            <QRCode value={qrValue} size={60} />
            <span className="text-[10px] mt-1 text-black">
              Verify your certificate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
