import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import logo from "@/assets/global-canna-pass-logo.png";

const AGE_VERIFIED_KEY = "budquest-age-verified";

// Bot user agents to allow through without age gate
const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'sogou', 'exabot', 'facebot', 'facebookexternalhit',
  'ia_archiver', 'twitterbot', 'linkedinbot', 'pinterest', 'semrushbot',
  'ahrefsbot', 'mj12bot', 'dotbot', 'petalbot'
];

const isBot = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
};

export function AgeGateModal() {
  const [showModal, setShowModal] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    // Allow bots through without age gate for SEO crawling
    if (isBot()) return;
    
    const verified = localStorage.getItem(AGE_VERIFIED_KEY);
    if (verified !== "true") {
      setShowModal(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(AGE_VERIFIED_KEY, "true");
    setShowModal(false);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (!showModal) return null;

  return (
    <Dialog open={showModal} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md border-accent/30 bg-card/95 backdrop-blur-md shadow-[0_0_60px_rgba(34,197,94,0.2)]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        hideCloseButton
      >
        {/* 21+ Badge */}
        <div className="absolute -top-3 -right-3 bg-accent/20 text-accent border border-accent/30 rounded-full px-3 py-1 text-sm font-bold shadow-[0_0_15px_rgba(34,197,94,0.5)]">
          21+
        </div>

        <div className="flex flex-col items-center text-center space-y-6 py-4">
          {/* Logo with glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full scale-150" />
            <img
              src={logo}
              alt="BudQuest"
              className="relative h-20 w-auto drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]"
            />
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
              Welcome to BudQuest
            </h2>
            <p className="text-muted-foreground text-sm">
              Cannabis Travel Guide
            </p>
          </div>

          {/* Age verification checkbox */}
          <div
            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
              ageVerified
                ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                : "border-border bg-muted/30"
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                id="age-gate"
                checked={ageVerified}
                onCheckedChange={(checked) => setAgeVerified(checked === true)}
                className={`mt-0.5 h-5 w-5 border-2 ${
                  ageVerified
                    ? "border-accent data-[state=checked]:bg-accent"
                    : "border-muted-foreground"
                }`}
              />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck
                    className={`h-4 w-4 ${ageVerified ? "text-accent" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`font-semibold text-sm ${ageVerified ? "text-accent" : "text-foreground"}`}
                  >
                    21+ Age Verification
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  I confirm that I am 21 years of age or older and agree to the
                  terms of use. I understand that cannabis laws vary by
                  location.
                </p>
              </div>
            </label>
          </div>

          {/* Enter button */}
          <Button
            onClick={handleConfirm}
            disabled={!ageVerified}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] disabled:opacity-50 disabled:shadow-none transition-all duration-300"
          >
            Enter BudQuest
          </Button>

          {/* Exit link */}
          <button
            onClick={handleExit}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            I am under 21 — Exit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
