import { BrowserRouter, Route, Routes } from "react-router-dom";
import EffectsContainer from "./components/EffectsContainer/EffectsContainer";
import FactsContainer from "./components/FactsContainer/FactsContainer";
import HomeContainer from "./components/HomeContainer/HomeContainer";
import NavBar from "./components/NavBar/NavBar";
import RemoveBg from "./components/RemoveBgContainer/RemoveBg/RemoveBg";
import RemoveBgContainer from "./components/RemoveBgContainer/RemoveBgContainer";
import { CloudinaryProvider } from "./context/cloudinaryContext";

function App() {
  return (
    <div>
      <CloudinaryProvider>
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomeContainer/>}/>
            <Route path="/remove-background" element={<RemoveBgContainer />} />
            <Route path="/remove-background/results" element={<RemoveBg />} />
            <Route path="/effect/:effectname" element={<EffectsContainer/>} />
          </Routes>
          <FactsContainer/>
        </BrowserRouter>
      </CloudinaryProvider>
    </div>
  );
}

export default App;
