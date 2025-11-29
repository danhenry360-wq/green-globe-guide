import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("budquest-cookie-consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("budquest-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("budquest-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card/95 backdrop-blur-md border border-border/50 rounded-xl p-4 md:p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-foreground font-medium">
                  We use cookies to enhance your experience
                </p>
                <p className="text-xs text-muted-foreground">
                  By continuing to use BudQuest, you agree to our use of cookies for analytics and personalization.{" "}
                  <Link 
                    to="/privacy" 
                    className="text-accent hover:underline"
                  >
                    Read our Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDecline}
                className="flex-1 md:flex-none text-muted-foreground hover:text-foreground"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="flex-1 md:flex-none bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Accept Cookies
              </Button>
            </div>
            
            <button
              onClick={handleDecline}
              className="absolute top-2 right-2 md:hidden p-1 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
