import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import logo from "@/assets/global-canna-pass-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut, loading } = useAuth();

  // Fetch user profile for avatar
  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (error) return null;
      return data;
    },
    enabled: !!user,
  });

  // Check admin role
  const { data: isAdmin } = useQuery({
    queryKey: ["user-role", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (error) return false;
      return data;
    },
    enabled: !!user,
  });

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.display_name) {
      const names = profile.display_name.trim().split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return profile.display_name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 sm:gap-3 group">
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
            <Link to="/home" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
              Home
            </Link>
            <Link to="/usa" className="text-sm text-foreground hover:text-accent transition-colors">
              USA Guide
            </Link>
            <Link to="/world" className="text-sm text-foreground hover:text-accent transition-colors">
              World Guide
            </Link>
            <Link to="/hotels" className="text-sm text-foreground hover:text-accent transition-colors">
              420 Rentals
            </Link>
            <Link to="/tours" className="text-sm text-foreground hover:text-accent transition-colors">
              Tours
            </Link>
            <Link to="/dispensary" className="text-sm text-foreground hover:text-accent transition-colors">
              Dispensaries
            </Link>
            <Link to="/blog" className="text-sm text-foreground hover:text-accent transition-colors">
              Blog
            </Link>

            {/* Auth Section */}
            {!loading && (
              isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:ring-2 hover:ring-accent/50">
                      <Avatar className="h-9 w-9 border-2 border-accent/30 hover:border-accent transition-colors">
                        <AvatarImage
                          src={profile?.avatar_url || undefined}
                          alt={profile?.display_name || user?.email || "User"}
                        />
                        <AvatarFallback className="bg-accent/20 text-accent font-semibold text-sm">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-accent/30 w-56">
                    <div className="flex items-center gap-3 p-3 border-b border-border/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {profile?.display_name || "BudQuest User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-accent" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link to="/admin" className="flex items-center">
                            <Shield className="mr-2 h-4 w-4 text-accent" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
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
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-4">
            <ThemeToggle />
            <Link to="/home" className="text-sm font-medium text-accent hover:text-accent/80" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/usa" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              USA Guide
            </Link>
            <Link to="/world" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              World Guide
            </Link>
            <Link to="/hotels" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              420 Rentals
            </Link>
            <Link to="/tours" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              Tours
            </Link>
            <Link to="/dispensary" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              Dispensaries
            </Link>
            <Link to="/blog" className="text-sm text-foreground hover:text-accent" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>

            {/* Mobile Auth */}
            {!loading && (
              isAuthenticated ? (
                <div className="flex flex-col gap-3 pt-3 border-t border-border/50">
                  {/* User Info with Avatar */}
                  <div className="flex items-center gap-3 pb-2">
                    <Avatar className="h-10 w-10 border-2 border-accent/30">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {profile?.display_name || "BudQuest User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="text-sm text-accent hover:text-accent/80 flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-sm text-accent hover:text-accent/80 flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-destructive hover:text-destructive/80 text-left flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
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
