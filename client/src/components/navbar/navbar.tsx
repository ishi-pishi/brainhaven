import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo / Title */}
        <div className="text-lg font-semibold">
          Pomodoro
        </div>

        {/* Links */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/customize" className="hover:underline">
                  Customize Session
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
