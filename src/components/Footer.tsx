import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">Cannabis Travel</h3>
            <p className="text-sm text-muted-foreground">
              Your guide to cannabis-friendly destinations worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Guides</h4>
            <div className="flex flex-col gap-2">
              <Link to="/usa" className="text-sm text-muted-foreground hover:text-accent">
                USA Guide
              </Link>
              <Link to="/world" className="text-sm text-muted-foreground hover:text-accent">
                World Guide
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Directory</h4>
            <div className="flex flex-col gap-2">
              <Link to="/hotels" className="text-sm text-muted-foreground hover:text-accent">
                Hotels
              </Link>
              <Link to="/tours" className="text-sm text-muted-foreground hover:text-accent">
                Tours
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-accent">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Cannabis Travel Guide. For informational purposes only.</p>
          <p className="mt-2">Not legal advice. Always verify local laws before traveling.</p>
        </div>
      </div>
    </footer>
  );
};
