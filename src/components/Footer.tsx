import { Link } from "react-router-dom";
import { MapPin, Scale, Info, Globe2, Plane, Building2, BookOpen, Mail, Users } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black mt-20 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Navigation */}
          <div>
            <h4 className="text-lg font-bold text-green-500 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2" /> Navigation
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/usa" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center">
                <Globe2 className="w-4 h-4 mr-2" /> USA Guide
              </Link>
              <Link to="/world" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center">
                <Plane className="w-4 h-4 mr-2" /> World Guide
              </Link>
              <Link to="/hotels" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center">
                <Building2 className="w-4 h-4 mr-2" /> 420 Rentals
              </Link>
              <Link to="/tours" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center">
                <BookOpen className="w-4 h-4 mr-2" /> Travel Guides
              </Link>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-lg font-bold text-green-500 mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2" /> Company
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center">
                <Mail className="w-4 h-4 mr-2" /> Contact Us
              </Link>
              <Link to="/blog" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-lg font-bold text-green-500 mb-6 flex items-center">
              <Scale className="w-5 h-5 mr-2" /> Legal
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/disclaimer" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                Disclaimer
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Column 4: About */}
          <div>
            <h4 className="text-lg font-bold text-green-500 mb-6 flex items-center">
              <Info className="w-5 h-5 mr-2" /> About BudQuest
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted source for up-to-date, verified cannabis travel laws and 420-friendly destinations worldwide.
            </p>
            <p className="text-xs text-gray-500">
              © 2025 BudQuest. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>For informational purposes only. Not legal advice. Always verify local laws before traveling.</p>
        </div>
      </div>
    </footer>
  );
};
