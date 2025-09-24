import React, { useRef } from "react";
import Webcam from "react-webcam";
import detectImg from "../assets/detect.png"; 
//import logo from "../assets/logo.png"; 

const ScanPage: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center p-4">
        {/* <img src={logo} alt="logo" className="w-12 h-12 mr-2" /> */}
        <h1 className="text-blueSky font-bold text-xl">BREASTSCAN</h1>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        <div className="w-1/4 flex items-center justify-center">
          <img
            src={detectImg}
            alt="Nurse and patient"
            className="rounded-xl shadow-lg max-h-[1000px] object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-start">
          <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-4">
            Scan Now
          </h2>
          <div className="border-8 border-gray-300 bg-black">
            <Webcam
              ref={webcamRef}
              audio={false}
              className="w-[640px] h-[360px] object-cover"
              screenshotFormat="image/jpeg"
            />
          </div>

          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-blueSky text-white rounded-full shadow hover:opacity-90">
            🔼 Scan
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default ScanPage;
