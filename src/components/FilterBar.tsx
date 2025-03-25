
import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  options: {
    category: FilterOption[];
    location: FilterOption[];
    [key: string]: FilterOption[];
  };
  activeFilters: Record<string, string>;
  onFilterChange: (filterType: string, value: string) => void;
  className?: string;
}

const FilterBar = ({
  options,
  activeFilters,
  onFilterChange,
  className = "",
}: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderFilterGroup = (
    title: string,
    filterType: string,
    options: FilterOption[]
  ) => (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onFilterChange(filterType, option.id)}
            className={`filter-chip ${
              activeFilters[filterType] === option.id
                ? "filter-chip-active"
                : "filter-chip-inactive"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
        </div>
        <button
          onClick={toggleExpand}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Less filters</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>More filters</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Always visible filters */}
        {renderFilterGroup("Category", "category", options.category)}
        
        {/* Expandable filters */}
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 pt-2"
          >
            {renderFilterGroup("Location", "location", options.location)}
            {options.size && renderFilterGroup("Company Size", "size", options.size)}
            {options.industry && renderFilterGroup("Industry", "industry", options.industry)}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
