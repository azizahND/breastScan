import scanImg from "../assets/scan.png"; // contoh gambar hasil scan
import bannerImg from "../assets/detect.png"; // banner perawat & mesin
import logo from "../assets/logo.png"; // logo bulat biru

const ResultPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative w-full">
        <img
          src={bannerImg}
          alt="banner"
          className="w-full h-[250px] object-cover"
        />
        <div className="absolute top-4 left-6 flex items-center">
          <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
          <h1 className="text-blueSky font-bold text-xl">BREASTSCAN</h1>
        </div>
        <div className="absolute top-12 left-6 text-white max-w-lg">
          <h2 className="text-3xl font-bold">Take Control of Your Health</h2>
          <h3 className="text-2xl font-semibold">Take a Breast Scan</h3>
          <p className="mt-2 text-sm">
            Your health is your greatest asset. We understand that taking charge
            of it can be daunting, but it doesn’t have to be. Our simple and
            non-invasive breast scan is designed with your comfort in mind.
          </p>
        </div>
      </header>

      {/* Body */}
      <main className="px-10 py-8">
        <div className="grid grid-cols-2 items-start">
            
          <div className=" grid grid-cols-2 text-justify-between">
            
            <img
              src={scanImg}
              alt="scan result"
              className="rounded-lg shadow-md w-[250px]"
            />
            <div className="">
                <p className="text-sm text-gray-700 ">
              Your health is your greatest asset. We understand that taking
              charge of it can be daunting, but it doesn’t have to be. Our
              simple and non-invasive breast scan is designed with your comfort
              in mind. It’s a quick and simple step toward proactive health
              management, empowering you with the knowledge you need.
            </p>
            </div>
          </div>

          

          <div  className="text-center items-center justify-center">
            <h3 className="text-xl font-bold text-purple-600 mb-4">
              Indikasi AI
            </h3>
            <p className="font-bold text-2xl">50%</p>
            <div className="relative w-1/2 h-3 bg-gray-200 rounded-full mt-2 items-center justify-center mx-auto">
              <div className="absolute top-0 left-0 h-3 w-1/2 bg-red-400 rounded-full"></div>
              <div className="flex justify-between text-xs mt-1 ">
                <span className="text-green-500 mt-5">Normal</span>
                <span className="text-red-500 mt-5">Abnormal</span>
              </div>
            </div>
            
            
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-20">
          <div>
            <h3 className="text-xl font-bold text-purple-600 mb-2">
              Keterangan Klinis Singkat
            </h3>
            <p className="text-sm text-gray-700">
              Pola panas tidak simetris atau *tidak ditemukan indikasi abnormal*.
            </p>
            <button className="mt-4 px-4 py-2 bg-blueSky text-white rounded-md shadow hover:bg-blue-400">
              📄 Cetak
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-purple-600 mb-2">
              Tanggal Pemeriksaan
            </h3>
            <p className="text-sm text-gray-700">28 Agustus 2025</p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-purple-600 mb-4">Riwayat</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between border-b pb-1">
              <span>20 Agustus 2025</span> <button className="text-blueSky">+</button>
            </li>
            <li className="flex justify-between border-b pb-1">
              <span>13 Agustus 2025</span> <button className="text-blueSky">+</button>
            </li>
            <li className="flex justify-between border-b pb-1">
              <span>11 Agustus 2025</span> <button className="text-blueSky">+</button>
            </li>
            <li className="flex justify-between border-b pb-1">
              <span>5 Agustus 2025</span> <button className="text-blueSky">+</button>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-blueSky mt-8">
        © BREASTSCAN
      </footer>
    </div>
  );
};

export default ResultPage;
