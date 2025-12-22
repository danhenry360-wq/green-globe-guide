// src/components/blog/BlogIconComponent.tsx
// Icon mapping for blog article sections

import {
  Shield, Users, Scale, MapPin, Building2, Plane,
  AlertCircle, Info, TrendingUp, Sparkles
} from "lucide-react";

interface BlogIconComponentProps {
  name: string;
}

export const BlogIconComponent = ({ name }: BlogIconComponentProps) => {
  const icons: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5 text-accent" />,
    Users: <Users className="w-5 h-5 text-accent" />,
    Scale: <Scale className="w-5 h-5 text-accent" />,
    MapPin: <MapPin className="w-5 h-5 text-accent" />,
    Building2: <Building2 className="w-5 h-5 text-accent" />,
    Plane: <Plane className="w-5 h-5 text-accent" />,
    AlertCircle: <AlertCircle className="w-5 h-5 text-red-400" />,
    Info: <Info className="w-5 h-5 text-accent" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-accent" />,
    Sparkles: <Sparkles className="w-5 h-5 text-accent" />,
  };
  return <>{icons[name] || <Info className="w-5 h-5 text-accent" />}</>;
};
