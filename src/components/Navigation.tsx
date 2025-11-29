import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/global-canna-pass-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg overflow-hidden group-hover:scale-110 transition-all duration-300">
              <img 
                src={logo} 
                alt="BudQuest Logo" 
                className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
              />
              {/* Glow effect for dark mode */}
              <div className="absolute inset-0 rounded-lg bg-accent/20 blur-md opacity-0 dark:opacity-50 group-hover:opacity-70 transition-opacity -z-10" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent 
              dark:from-white dark:via-accent dark:to-gold
              group-hover:from-accent group-hover:via-gold group-hover:to-accent
              transition-all duration-300">
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
            
            {/* Auth Section */}
            {!loading && (
              isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-accent/30 hover:border-accent">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-accent/30">
                    <DropdownMenuItem className="text-muted-foreground">
                      {user?.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="border-accent/30 hover:border-accent text-foreground">
                    Sign In
                  </Button>
                </Link>
              )
            )}
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
            <Link to="/usa" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              USA Guide
            </Link>
            <Link to="/world" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              World Guide
            </Link>
            <Link to="/hotels" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              Hotels
            </Link>
            <Link to="/tours" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              Tours
            </Link>
            <Link to="/dispensary" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              Dispensary
            </Link>
            <Link to="/blog" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/about" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
            
            {/* Mobile Auth */}
            {!loading && (
              isAuthenticated ? (
                <button 
                  onClick={handleSignOut}
                  className="text-sm text-destructive hover:text-destructive/80 text-left"
                >
                  Sign Out ({user?.email})
                </button>
              ) : (
                <Link to="/auth" className="text-sm text-accent hover:text-accent/80" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
