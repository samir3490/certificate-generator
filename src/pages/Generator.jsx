// src/pages/Generator.jsx
import React, { useRef, useState } from "react";
import QRCode from 'react-qr-code';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import certTemplate from "../assets/Certificate.png";

const Generator = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const certRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(certRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${name}_certificate.pdf`);
  };

  const qrValue = `${window.location.origin}/verify?name=${encodeURIComponent(name)}&desc=${encodeURIComponent(desc)}&date=${encodeURIComponent(date)}`;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Certificate Generator</h2>

      <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Enter recipient's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-sm"
        />
        <input
          type="text"
          placeholder="Enter description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-sm"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-sm"
        />

        <div className="flex justify-center mb-4">
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            Download Certificate
          </button>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="flex justify-center mt-6 px-2">
        <div
          ref={certRef}
          className="relative w-full aspect-[842/595] max-w-[842px] bg-cover bg-center border"
          style={{ backgroundImage: `url(${certTemplate})` }}
        >
          {/* Name */}
          <div className="absolute top-[42%] w-full text-center text-xl md:text-2xl font-bold text-black">
            {name}
          </div>

          {/* Description */}
          <div className="absolute top-[52%] w-full text-center text-base md:text-lg text-black">
            {desc}
          </div>

          {/* Date */}
          <div className="absolute bottom-[25%] left-[22%] text-sm md:text-md text-black">
            {date}
          </div>

          {/* QR Code */}
          <div className="absolute bottom-[5%] right-[5%] flex flex-col items-center">
            <QRCode value={qrValue} size={60} />
            <span className="text-[10px]  mt-1 text-black">Verify your certificate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;