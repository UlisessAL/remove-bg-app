import { BrowserRouter, Route, Routes } from "react-router-dom";
import EffectsContainer from "./components/EffectsContainer/EffectsContainer";
import Footer from "./components/FooterContainer/FooterContainer";
import HomeContainer from "./components/HomeContainer/HomeContainer";
import NavBar from "./components/NavBar/NavBar";
import { CloudinaryProvider } from "./context/cloudinaryContext";

function App() {
  return (
    <div>
      <CloudinaryProvider>
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomeContainer/>}/>
            <Route path="/effect/:effectname" element={<EffectsContainer/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CloudinaryProvider>
    </div>
  );
}

export default App;
