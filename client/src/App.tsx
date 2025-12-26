import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SettingsMenuPage } from "./pages/SettingsMenuPage"
import { TimerPage } from "./pages/TimerPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SettingsMenuPage />} />
        <Route path="/timer" element={<TimerPage />} />
      </Routes>
    </Router>
  );
}
