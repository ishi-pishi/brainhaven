
import { NavLink } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ClockIcon, HomeIcon, DoorOpenIcon, Sparkles, ShoppingBag, Cloud } from "lucide-react";

import { getAuth, signOut } from "firebase/auth";

/**
 *  Navbar component at the top of the screen.
 */
export function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border bg-background/60 backdrop-blur-xl shadow-lg shadow-primary/10 px-6 py-2 w-[90%] max-w-5xl transition-all">
      <div className="flex items-center justify-between w-full">
        {/* LEFT: menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-3">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    navigationMenuTriggerStyle() +
                    " " +
                    (isActive
                      ? " bg-muted/50 text-primary font-semibold"
                      : " hover:bg-muted/10")
                  }
                >
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md">
                    <HomeIcon className="h-4 w-4" />
                    Home
                  </span>
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/timer-menu"
                  className={({ isActive }) =>
                    navigationMenuTriggerStyle() +
                    " " +
                    (isActive
                      ? " bg-muted/50 text-primary font-semibold"
                      : " hover:bg-muted/10")
                  }
                >
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md">
                    <ClockIcon className="h-4 w-4" />
                    Timer
                  </span>
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/reflections"
                  className={({ isActive }) =>
                    navigationMenuTriggerStyle() +
                    " " +
                    (isActive
                      ? " bg-muted/50 text-primary font-semibold"
                      : " hover:bg-muted/10")
                  }
                >
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md">
                    <Sparkles className="h-4 w-4" />
                    Reflections
                  </span>
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/store"
                  className={({ isActive }) =>
                    navigationMenuTriggerStyle() +
                    " " +
                    (isActive
                      ? " bg-muted/50 text-primary font-semibold"
                      : " hover:bg-muted/10")
                  }
                >
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md">
                    <ShoppingBag className="h-4 w-4" />
                    Store
                  </span>
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    navigationMenuTriggerStyle() +
                    " " +
                    (isActive
                      ? " bg-muted/50 text-primary font-semibold"
                      : " hover:bg-muted/10")
                  }
                  onClick={() => {
                    signOut(getAuth());
                  }}
                >
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md">
                    <DoorOpenIcon className="h-4 w-4" />
                    Sign out
                  </span>
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* RIGHT: logo + login */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-primary" />
            <div className="text-xl font-serif font-bold text-primary">brainhaven</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
