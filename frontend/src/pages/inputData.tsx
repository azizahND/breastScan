import React, { useState } from "react";
import detectImage from "../assets/detect.png";
import InputField from "../components/InputFields";
import { useNavigate } from "react-router-dom";


const InputData: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: "",
    umur: "",       // sesuaikan nama field backend
    tinggi: "",
    riwayat: "",
    tanggal: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/pasien", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama,
          umur: parseInt(formData.umur),
          tinggi: parseFloat(formData.tinggi),
          riwayat: formData.riwayat,
          tanggal: formData.tanggal // tambahkan ini
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Pasien berhasil ditambahkan:", data);
        navigate("/scan", { state: { pasienId: data.id } });
      } else {
        setError(data.error || "Gagal menambahkan pasien");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
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
            Your health is your greatest asset. Regular scans help in early detection.
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-blueSky">
        <form
          className="w-3/4 max-w-md bg-blueSky p-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            INPUT DATA PASIEN
          </h2>

          <InputField
            label="Nama"
            placeholder="Masukkan Nama Pasien"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
          />

          <InputField
            label="Usia"
            type="number"
            placeholder="Masukkan Usia Pasien"
            name="umur"
            value={formData.umur}
            onChange={handleChange}
          />

          <InputField
            label="Tinggi"
            type="number"
            placeholder="Masukkan Tinggi Pasien"
            name="tinggi"
            value={formData.tinggi}
            onChange={handleChange}
          />

          <InputField
            label="Riwayat Media"
            placeholder="Isi Riwayat Media"
            name="riwayat"
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

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button
            type="submit"
            className="block w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold text-center"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Selanjutnya"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputData;
