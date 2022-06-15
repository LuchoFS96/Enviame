import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingController } from "./Components/LandingController";

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
