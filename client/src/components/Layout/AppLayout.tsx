import { Navbar } from "./navbar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="pt-20 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}