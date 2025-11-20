import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterStatesProps {
  onFilterChange: (filters: { status: string; region: string }) => void;
  currentFilters: { status: string; region: string };
}

const FilterStates = ({ onFilterChange, currentFilters }: FilterStatesProps) => {
  const handleStatusChange = (value: string) => {
    onFilterChange({ ...currentFilters, status: value });
  };

  const handleRegionChange = (value: string) => {
    onFilterChange({ ...currentFilters, region: value });
  };

  const handleReset = () => {
    onFilterChange({ status: '', region: '' });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="status-filter" className="text-sm font-medium text-foreground">Legal Status</Label>
        <Select value={currentFilters.status} onValueChange={handleStatusChange}>
          <SelectTrigger id="status-filter" className="bg-card border-border">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All statuses</SelectItem>
            <SelectItem value="recreational">Recreational</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
            <SelectItem value="decriminalized">Decriminalized</SelectItem>
            <SelectItem value="illegal">Illegal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="region-filter" className="text-sm font-medium text-foreground">Region</Label>
        <Select value={currentFilters.region} onValueChange={handleRegionChange}>
          <SelectTrigger id="region-filter" className="bg-card border-border">
            <SelectValue placeholder="All regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All regions</SelectItem>
            <SelectItem value="West">West</SelectItem>
            <SelectItem value="Midwest">Midwest</SelectItem>
            <SelectItem value="South">South</SelectItem>
            <SelectItem value="Northeast">Northeast</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleReset}
        variant="outline"
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterStates;
