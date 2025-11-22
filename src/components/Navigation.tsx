import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/global-canna-pass-logo.png";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Global Canna Pass" className="h-10 w-10 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              BudQuest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link to="/usa" className="text-sm text-foreground hover:text-accent transition-colors">
              USA Guide
            </Link>
            <Link to="/world" className="text-sm text-foreground hover:text-accent transition-colors">
              World Guide
            </Link>
            <Link to="/hotels" className="text-sm text-foreground hover:text-accent transition-colors">
              Hotels
            </Link>
            <Link to="/tours" className="text-sm text-foreground hover:text-accent transition-colors">
              Tours
            </Link>
            <Link to="/dispensary" className="text-sm text-foreground hover:text-accent transition-colors">
              Dispensary
            </Link>
            <Link to="/blog" className="text-sm text-foreground hover:text-accent transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-sm text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link to="/contact">
              <Button variant="default" className="bg-accent hover:bg-accent/90">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-4">
            <ThemeToggle />
            <Link to="/usa" className="text-sm text-foreground hover:text-accent">
              USA Guide
            </Link>
            <Link to="/world" className="text-sm text-foreground hover:text-accent">
              World Guide
            </Link>
            <Link to="/hotels" className="text-sm text-foreground hover:text-accent">
              Hotels
            </Link>
            <Link to="/tours" className="text-sm text-foreground hover:text-accent">
              Tours
            </Link>
            <Link to="/dispensary" className="text-sm text-foreground hover:text-accent">
              Dispensary
            </Link>
            <Link to="/blog" className="text-sm text-foreground hover:text-accent">
              Blog
            </Link>
            <Link to="/about" className="text-sm text-foreground hover:text-accent">
              About
            </Link>
            <Link to="/contact" className="text-sm text-foreground hover:text-accent">
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
