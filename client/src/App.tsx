import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import { LandingPage } from "./pages/Landing/LandingPage";
import { SignupPage } from "./pages/Landing/SignupPage";

import { SettingsMenuPage } from "./pages/App/SettingsMenuPage"
import { TimerPage } from "./pages/App/TimerPage"
import { DashBoard } from "./pages/App/DashBoard";

import { AppLayout } from "./components/Layout/AppLayout";
import { EndSessionPage } from "./pages/App/EndSession";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<DashBoard />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<EndSessionPage />} />
          <Route path="/dashboard" element={<DashBoard />}    />
          <Route path="/timer-menu" element={<SettingsMenuPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/endsession" element={<EndSessionPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
