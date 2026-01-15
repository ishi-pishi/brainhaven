import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

// Displays the entire application layout
// Includes the navbar and then the main content area.
export function AppLayout() {
  return (
    <div className="pt-20 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}