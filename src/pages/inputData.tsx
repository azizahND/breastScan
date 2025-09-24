import React, { useState } from "react";
import detectImage from "../assets/detect.png";
import InputField from "../components/InputFields";
import { Link } from "react-router-dom";

const InputData: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: "",
    usia: "",
    riwayat: "",
    tanggal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen">
      
      <div
        className="w-1/2 bg-cover bg-center relative flex items-center justify-center text-black"
        style={{ backgroundImage: `url(${detectImage})` }}
      >
        <div className="bg-white bg-opacity-50 p-8 rounded-md">
          <h1 className="text-3xl font-bold mb-4">
            Take Control of Your Health <br />
            Take a Breast Scan
          </h1>
          <p className="max-w-md">
            Your health is your greatest asset. We understand that taking charge
            of it can feel daunting, but the benefits can be life-changing.
            Regular scans help in early detection and treatment. It’s a step
            towards peace of mind and a proactive way to manage your health.
          </p>
        </div>
      </div>

      {/* Kanan: Form */}
      <div className="w-1/2 flex items-center justify-center bg-blueSky">
        <div className="w-3/4 max-w-md bg-blueSky p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            INPUT DATA PASIEN
          </h2>


          <InputField
            label="Nama"
            placeholder="Masukkan Nama Pasien"
            value={formData.nama}
            onChange={handleChange}
          />

          <InputField
            label="Usia"
            type="number"
            placeholder="Masukkan Usia Pasien"
            value={formData.usia}
            onChange={handleChange}
          />

          <InputField
            label="Riwayat Media"
            placeholder="Isi Riwayat Media"
            value={formData.riwayat}
            onChange={handleChange}
          />

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Waktu & Tanggal Pemeriksaan
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <Link
            to="/scan"
            className="block w-full mt-10 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold text-center"
            >
            Selanjutnya
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InputData;
