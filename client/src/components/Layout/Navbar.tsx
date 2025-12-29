// components/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ClockIcon, SettingsIcon, HomeIcon } from "lucide-react";

/**
 * Polished shadcn-style navbar for React Router.
 * - Top-level "Home" link
 * - "Customize" trigger with dropdown content (Timer, Settings)
 * - active link styling via NavLink
 * - nice spacing, shadows, transitions
 *
 * If you don't have lucide-react: `npm i lucide-react` or swap icons for SVG/text.
 */

function DropdownItem({
  to,
  title,
  description,
  Icon,
}: {
  to: string;
  title: string;
  description?: string;
  Icon?: React.ComponentType<any>;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          to={to}
          className={({ isActive }) =>
            [
              "block rounded-md px-3 py-2 transition-all duration-200",
              "hover:translate-y-[-2px] focus:shadow-lg focus:outline-none",
              isActive ? "bg-muted/60 font-semibold" : "bg-transparent",
            ].join(" ")
          }
        >
          <div className="flex items-start gap-3">
            {Icon ? (
              <div className="mt-0.5">
                <Icon className="h-5 w-5" />
              </div>
            ) : null}
            <div>
              <div className="text-sm font-medium">{title}</div>
              {description ? (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
}

export function Navbar() {
  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur-md px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-md px-2 py-1 ring-1 ring-muted/10">
            <HomeIcon className="h-5 w-5" />
          </div>
          <div className="text-lg font-semibold">brainhaven</div>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            {/* Home (simple link) */}
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
                >
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md">
                    <HomeIcon className="h-4 w-4" />
                    Home
                  </span>
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Customize (trigger + dropdown content) */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="inline-flex items-center gap-2 px-3 py-2 rounded-md">
                Customize
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[420px] lg:w-[520px] lg:grid-cols-[.9fr_1fr] p-4">
                  {/* Big intro card */}
                  <li className="row-span-2 rounded-md bg-gradient-to-b from-muted/40 to-muted/10 p-4">
                    <NavigationMenuLink asChild>
                      <NavLink to="/timer" className="no-underline">
                        <div className="mb-2 text-lg font-medium">Timer</div>
                        <p className="text-sm text-muted-foreground">
                          Configure and run your pomodoro timer — durations,
                          cycles, and focus mode.
                        </p>
                      </NavLink>
                    </NavigationMenuLink>
                  </li>

                  {/* List items */}
                  <DropdownItem
                    to="/timer"
                    Icon={ClockIcon}
                    title="Timer"
                    description="Set work/break lengths and start a session."
                  />

                  <DropdownItem
                    to="/menu"
                    Icon={SettingsIcon}
                    title="Session Settings"
                    description="Customize presets, long break rules, and sounds."
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
