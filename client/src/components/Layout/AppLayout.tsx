import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

// Displays the entire application layout
// Includes the navbar and then the main content area.
export function AppLayout() {
  return (
    <div className="pt-28 min-h-screen pb-12">
      <Navbar />
      <Outlet />
    </div>
  );
}
