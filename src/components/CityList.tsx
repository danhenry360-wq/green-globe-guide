import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CityData } from "@/lib/usa_state_data";
import { Landmark, MapPin, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface CityListProps {
  stateSlug: string;
  cities: CityData[];
}

const CityList = ({ stateSlug, cities }: CityListProps) => {
  const isMobile = useIsMobile();
  const majorCities = cities.filter(c => c.type === 'major');
  const mediumCities = cities.filter(c => c.type === 'medium');
  const notableAreas = cities.filter(c => c.type === 'notable');

  const CityCard = ({ city }: { city: CityData }) => {
    const url = `/usa/${stateSlug}/${city.slug}`;
    let icon = <MapPin className="w-4 h-4 mr-2" />;
    let badgeText = '';
    let badgeClass = '';

    switch (city.type) {
      case 'major':
        icon = <Landmark className="w-4 h-4 mr-2 text-accent" />;
        badgeText = 'Full Guide';
        badgeClass = 'bg-accent/20 text-accent border-accent/30';
        break;
      case 'medium':
        icon = <MapPin className="w-4 h-4 mr-2 text-gold" />;
        badgeText = 'Short Guide';
        badgeClass = 'bg-gold/20 text-gold border-gold/30';
        break;
      case 'notable':
        icon = <Info className="w-4 h-4 mr-2 text-secondary" />;
        badgeText = 'One-Line Note';
        badgeClass = 'bg-secondary/20 text-secondary border-secondary/30';
        break;
    }

    return (
      <Link to={url}>
        <Card className="p-4 hover:border-accent/50 hover:shadow-glow-subtle transition-all cursor-pointer h-full group bg-gradient-card flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            <h5 className="text-lg font-semibold group-hover:text-accent transition-colors">{city.name}</h5>
          </div>
          <Badge className={badgeClass}>{badgeText}</Badge>
        </Card>
      </Link>
    );
  };

  const NotableAreaCard = ({ city }: { city: CityData }) => {
    return (
      <Card className="p-4 bg-card/50 border-border/50">
        <div className="flex items-start">
          <Info className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-secondary" />
          <div>
            <h5 className="text-lg font-semibold mb-1">{city.name}</h5>
            <p className="text-sm text-muted-foreground">{city.content}</p>
          </div>
        </div>
      </Card>
    );
  };

  if (isMobile) {
    return (
      <Accordion type="multiple" className="w-full space-y-4">
        {/* Major Cities */}
        {majorCities.length > 0 && (
          <AccordionItem value="major-cities" className="border-b border-border/50 rounded-lg bg-card/50 px-4">
            <AccordionTrigger className="text-xl font-bold text-accent hover:no-underline">Major Cities (Full Guides)</AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-4 pt-2 pb-4">
              {majorCities.map(city => <CityCard key={city.slug} city={city} />)}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Medium Cities */}
        {mediumCities.length > 0 && (
          <AccordionItem value="medium-cities" className="border-b border-border/50 rounded-lg bg-card/50 px-4">
            <AccordionTrigger className="text-xl font-bold text-gold hover:no-underline">Medium Cities (Short Guides)</AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-4 pt-2 pb-4">
              {mediumCities.map(city => <CityCard key={city.slug} city={city} />)}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Notable Areas */}
        {notableAreas.length > 0 && (
          <AccordionItem value="notable-areas" className="border-b border-border/50 rounded-lg bg-card/50 px-4">
            <AccordionTrigger className="text-xl font-bold text-secondary hover:no-underline">Notable Areas (One-Line Notes)</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 pb-4">
              {notableAreas.map(city => <NotableAreaCard key={city.slug} city={city} />)}
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    );
  }

  // Desktop View
  return (
    <div className="space-y-8">
      {/* Major Cities */}
      {majorCities.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-accent">Major Cities (Full Guides)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {majorCities.map(city => <CityCard key={city.slug} city={city} />)}
          </div>
        </div>
      )}

      {/* Medium Cities */}
      {mediumCities.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gold">Medium Cities (Short Guides)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mediumCities.map(city => <CityCard key={city.slug} city={city} />)}
          </div>
        </div>
      )}

      {/* Notable Areas */}
      {notableAreas.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-secondary">Notable Areas (One-Line Notes)</h3>
          <div className="space-y-4">
            {notableAreas.map(city => <NotableAreaCard key={city.slug} city={city} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityList;
