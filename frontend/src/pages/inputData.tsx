import React, { useState } from "react";
import detectImage from "../assets/detect.png";
import InputField from "../components/InputFields";
import { useNavigate } from "react-router-dom";

const InputData: React.FC = () => {
  const [formData, setFormData] = useState({
    id_pasien: "",
    jenis_kelamin: "",
    tanggal: "",
    hasil_deteksi: "",
    hasil_scan: "",
    suhu: "",
    kulit: "",
    pendarahan: "Tidak",
    nyeri: "Tidak",
    bengkak: "Tidak",
    sesak_nafas: "Tidak",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/pasien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        id_pasien: parseInt(formData.id_pasien),
        jenis_kelamin: formData.jenis_kelamin,
        tanggal: formData.tanggal,
        hasil_deteksi: formData.hasil_deteksi,
        hasil_scan: formData.hasil_scan,
        suhu: formData.suhu ? parseFloat(formData.suhu) : null,
        kulit: formData.kulit,
        pendarahan: formData.pendarahan === "Ya",
        nyeri: formData.nyeri === "Ya",
        bengkak: formData.bengkak === "Ya",
        sesak_nafas: formData.sesak_nafas === "Ya",
      }),

      });

      const data = await response.json();
      if (response.ok) {
        console.log("Pasien & pemeriksaan berhasil ditambahkan:", data);
        navigate("/scan", { state: { pasienId: data.id_pasien } });
      } else {
        setError(data.error || "Gagal menambahkan data");
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
        <div className="bg-white bg-opacity-60 w-full h-screen justifiy-center items-center p-8 text-center align-center content-center outline-10 outline-offset-10 outline-double outline-blue-800">
          <div className="p-10 text-start border-l-4 border-indigo-500">
            <h1 className="text-3xl font-bold mb-4 jusitfy-center items-center">
            Take Control of Your Health <br />
            Take a Breast Scan
          </h1>
          <p className=" text-start">
            Your health is your greatest asset. Regular scans help in early detection.
          </p>
          <h2 className="text-blue-700 font-bold text-3xl mt-10">BREAST SCAN</h2>
          <h3>PKM KC 2025 - Universitas Andalas</h3>
          </div>
          
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-blueSky">
        <form
          className="w-3/4 max-w-md bg-blueSky p-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            INPUT DATA PEMERIKSAAN
          </h2>

          <InputField
          label="ID Pasien"
          type="number"
          placeholder="Masukkan ID Pasien"
          name="id_pasien"
          value={formData.id_pasien}
          onChange={handleChange}
        />


          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Jenis Kelamin
            </label>
            <select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Perempuan">Perempuan</option>
              <option value="Laki-laki">Laki-laki</option>
            </select>
          </div>

          <InputField
            label="Kondisi Kulit"
            placeholder="Misal: kemerahan, normal"
            name="kulit"
            value={formData.kulit}
            onChange={handleChange}
          />

          

          <div className="mb-4 text-white">
            {["pendarahan", "nyeri", "bengkak", "sesak_nafas"].map((item) => (
              <div key={item} className="mb-3">
                <label className="block mb-1 capitalize">
                  {item.replace("_", " ")}
                </label>
                <select
                  name={item}
                  value={formData[item as keyof typeof formData] as string}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                >
                  <option value="Tidak">Tidak</option>
                  <option value="Ya">Ya</option>
                </select>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Tanggal Pemeriksaan
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button
            type="submit"
            className="block w-full mt-5 py-2 bg-blue-800 hover:bg-purple-700 text-white rounded-md font-semibold text-center"
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
