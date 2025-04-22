
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface IntegrationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const IntegrationSearch = ({ searchQuery, setSearchQuery }: IntegrationSearchProps) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Search integrations..."
        className="pl-10 pr-4 py-2 w-full border-gray-200"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default IntegrationSearch;
