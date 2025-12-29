import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SettingsMenuPage } from "./pages/SettingsMenuPage"
import { TimerPage } from "./pages/TimerPage"
import { AppLayout } from "./components/Layout/AppLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<SettingsMenuPage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
