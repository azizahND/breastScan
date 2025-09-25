import { Routes, Route } from "react-router-dom";
import InputData from "./pages/inputData";
import "./index.css";
import ScanPage from "./pages/scanPage";
import ResultPage from "./pages/ResultPage";
function App() {
  return (
    <Routes>
    
      <Route path="/" element={<InputData />} />
      <Route path="/scan" element={<ScanPage/>} />
      <Route path="/result" element={<ResultPage/>} />


    </Routes>
  );
}

export default App;
