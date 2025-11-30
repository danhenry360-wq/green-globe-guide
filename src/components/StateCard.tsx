import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { StateData } from "@/lib/usa_state_data";
import { getStatusBadgeClasses } from "@/lib/legal-status-colors";

interface StateCardProps {
  state: StateData;
}

const StateCard = ({ state }: StateCardProps) => {
  return (
    <Link to={`/usa/${state.slug}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="p-6 bg-gradient-card border-border/50 hover:border-accent/50 hover:shadow-glow-subtle transition-all cursor-pointer h-full group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors truncate">
                  {state.name}
                </h3>
              </div>
              {state.subtitle && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {state.subtitle}
                </p>
              )}
            </div>
            <Badge className={`${getStatusBadgeClasses(state.status)} flex-shrink-0 capitalize`}>
              {state.status}
            </Badge>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default StateCard;