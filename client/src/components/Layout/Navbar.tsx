import React from "react";
import { NavLink } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ClockIcon, HomeIcon, DoorOpenIcon } from "lucide-react";

import { getAuth, signOut } from "firebase/auth";

/**
 *  Navbar component at the top of the screen.
 */
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b bg-background/80 backdrop-blur-md px-6 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
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
            <div className="rounded-md px-1.5 py-0.5 ring-1 ring-muted/10"></div>
            <div className="text-lg font-semibold">🧠brainhaven</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
