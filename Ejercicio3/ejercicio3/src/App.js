import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingController } from "./Components/LandingController";

// Redirijo al Componente controlador.
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingController />} />
      </Routes>
    </div>
  );
}

export default App;
