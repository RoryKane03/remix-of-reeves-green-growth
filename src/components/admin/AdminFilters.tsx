
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface AdminFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  serviceFilter: string;
  onServiceFilterChange: (value: string) => void;
}

const AdminFilters = ({ 
  searchTerm, 
  onSearchChange, 
  serviceFilter, 
  onServiceFilterChange 
}: AdminFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search quotes by name, email, phone, or message..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="flex items-center gap-2 min-w-[200px]">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={serviceFilter} onValueChange={onServiceFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Services</SelectItem>
            <SelectItem value="Residential Cleaning">Residential Cleaning</SelectItem>
            <SelectItem value="Commercial Cleaning">Commercial Cleaning</SelectItem>
            <SelectItem value="Window Cleaning">Window Cleaning</SelectItem>
            <SelectItem value="Carpet Cleaning">Carpet Cleaning</SelectItem>
            <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
            <SelectItem value="Move-in/Move-out">Move-in/Move-out</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdminFilters;
