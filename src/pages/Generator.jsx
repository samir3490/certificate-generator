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

 const qrValue = `https://certificate-generator-pink.vercel.app/verify?name=${encodeURIComponent(name)}&desc=${encodeURIComponent(desc)}&date=${encodeURIComponent(date)}`;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Certificate Generator</h2>

      <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Enter recipient's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          placeholder="Enter description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex justify-center mb-4">
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Certificate
          </button>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="flex justify-center mt-6">
        <div
          ref={certRef}
          className="relative w-[842px] h-[595px] bg-cover bg-center border"
          style={{
            backgroundImage: `url(${certTemplate})`,
          }}
        >
          {/* Name */}
          <div className="absolute top-[250px] w-full text-center text-2xl font-bold text-black">
            {name}
          </div>

          {/* Description */}
          <div className="absolute top-[300px] w-full text-center text-lg text-black">
            {desc}
          </div>

          {/* Date */}
          <div className="absolute bottom-[148px] left-[204px] text-md text-black">
            {date}
          </div>

          {/* QR Code */}
          <div className="absolute bottom-[30px] right-[40px] flex flex-col items-center">
          <QRCode value={qrValue} size={60} />
           <span className="text-[12px] mt-1 text-black">Verify your certificate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;