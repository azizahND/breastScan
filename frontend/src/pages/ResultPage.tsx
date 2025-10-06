import { useEffect, useState } from "react";
import scanPlaceholder from "../assets/scan.png";
import bannerImg from "../assets/scan.png";
import logo from "../assets/logo.png";

const API_BASE = "http://localhost:5000/api/pemeriksaan";
const pasienId = 1;

interface HasilPemeriksaan {
  id_pemeriksaan: number;
  hasil_scan_url: string;
  hasil_deteksi: string;
  suhu: number;
  tanggal: string;
}

interface RiwayatPemeriksaan {
  id_pemeriksaan: number;
  tanggal: string;
  hasil_deteksi: string;
  hasil_scan: string;
  suhu: number;
  kulit: string;
  pendarahan: boolean;
  nyeri: boolean;
  bengkak: boolean;
  sesak_nafas: boolean;
}

const ResultPage = () => {
  const [hasil, setHasil] = useState<HasilPemeriksaan | null>(null);
  const [riwayat, setRiwayat] = useState<RiwayatPemeriksaan[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/hasil/${pasienId}`)
      .then((res) => res.json())
      .then((data) => setHasil(data))
      .catch((err) => console.error(err));

    fetch(`${API_BASE}/pasien/${pasienId}`)
      .then((res) => res.json())
      .then((data) => setRiwayat(data))
      .catch((err) => console.error(err));
  }, []);

  const groupedRiwayat = riwayat.reduce((acc: Record<string, RiwayatPemeriksaan[]>, item) => {
    if (!acc[item.tanggal]) acc[item.tanggal] = [];
    acc[item.tanggal].push(item);
    return acc;
  }, {});

  const analisis =
    hasil?.hasil_deteksi === "abnormal"
      ? "Terdeteksi adanya kelainan pada hasil pemindaian. Segera konsultasikan ke dokter untuk pemeriksaan lebih lanjut."
      : hasil?.hasil_deteksi === "normal"
      ? "Payudara dalam keadaan normal dan tidak terdeteksi adanya tanda-tanda kanker."
      : "Menunggu hasil analisis.";

  return (
    <div className="min-h-screen">
      <header className="relative w-full">
        <img src={bannerImg} alt="banner" className="w-full h-[250px] object-cover" />
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="absolute top-4 left-6 flex items-center content-center">
          <img src={logo} alt="logo" className="w-20 h-20 mr-2" />
          <h1 className="text-blueSky font-bold text-xl">BREASTSCAN</h1>
        </div>
      </header>

      <main className="px-10 py-8">
        <div className="grid grid-cols-2 items-start">
          <div className="grid grid-cols-2 items-start gap-4">
            <img
              src={
                hasil?.hasil_scan_url
                  ? `http://localhost:5000${hasil.hasil_scan_url}`
                  : scanPlaceholder
              }
              alt="scan result"
              className="rounded-lg shadow-md w-[250px]"
            />
            <div>
              <p className="text-sm text-gray-700">
                Hasil pemindaian menunjukkan status{" "}
                <strong>{hasil?.hasil_deteksi || "menunggu hasil"}</strong>. 
                Pemeriksaan ini dilakukan pada suhu tubuh {hasil?.suhu || "-"}°C.
              </p>

              <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <h4 className="font-semibold text-blue-700 mb-1">Analisis:</h4>
                <p className="text-gray-700 text-sm">{analisis}</p>
              </div>
            </div>
          </div>

          <div className="text-center items-center justify-center">
            <h3 className="text-xl font-bold text-purple-600 mb-4">Hasil Pemeriksaan</h3>
            <p className="font-bold text-2xl">
              {hasil?.hasil_deteksi === "abnormal" ? "80%" : "20%"}
            </p>
            <div className="relative w-1/2 h-3 bg-gray-200 rounded-full mt-2 mx-auto">
              <div
                className={`absolute top-0 left-0 h-3 rounded-full ${
                  hasil?.hasil_deteksi === "abnormal" ? "bg-red-400 w-4/5" : "bg-green-400 w-1/5"
                }`}
              ></div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-green-500 mt-5">Normal</span>
                <span className="text-red-500 mt-5">Abnormal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold text-purple-600 mb-4">Riwayat Pemeriksaan</h3>
          {Object.keys(groupedRiwayat).length > 0 ? (
            Object.entries(groupedRiwayat)
              .sort((a, b) => (a[0] < b[0] ? 1 : -1))
              .map(([tanggal, items]) => (
                <div key={tanggal} className="mb-6 border-b pb-4">
                  <h4 className="font-semibold text-blueSky mb-2">📅 {tanggal}</h4>
                  <ul className="space-y-2 ml-4 text-sm">
                    {items.map((item) => (
                      <li
                        key={item.id_pemeriksaan}
                        className="border p-3 rounded-lg shadow-sm bg-white"
                      >
                        <p>
                          <strong>Hasil:</strong>{" "}
                          <span
                            className={`${
                              item.hasil_deteksi === "abnormal"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {item.hasil_deteksi}
                          </span>
                        </p>
                        <p><strong>Suhu:</strong> {item.suhu ?? "-"}°C</p>
                        <p><strong>Nyeri:</strong> {item.nyeri ? "Ya" : "Tidak"}</p>
                        <p><strong>Bengkak:</strong> {item.bengkak ? "Ya" : "Tidak"}</p>
                        <p><strong>Sesak Nafas:</strong> {item.sesak_nafas ? "Ya" : "Tidak"}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
          ) : (
            <p className="text-sm text-gray-600">Belum ada riwayat pemeriksaan</p>
          )}
        </div>
      </main>

      <footer className="text-center text-sm text-blueSky mt-8">© BREASTSCAN</footer>
    </div>
  );
};

export default ResultPage;
