// src/components/Navigation.tsx
import { NavLink } from "./NavLink";
import { Building, Store, Home, Map, Info } from "lucide-react";

export const Navigation = () => {
  const navigationItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/hotels', label: 'Hotels', icon: Building },
    { href: '/dispensary', label: 'Dispensaries', icon: Store },
    { href: '/map', label: 'Map', icon: Map },
    { href: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl">BudQuest</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button would go here */}
        </div>
      </div>
    </nav>
  );
};
