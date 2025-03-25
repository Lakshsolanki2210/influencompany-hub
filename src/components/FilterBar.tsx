
import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  options: {
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
  ) => {
    // Add a safety check to ensure options is defined
    if (!options || !Array.isArray(options)) {
      return null;
    }
    
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onFilterChange(filterType, option.id)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors
                ${activeFilters[filterType] === option.id
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-background text-muted-foreground border-muted hover:bg-secondary"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full border rounded-lg p-4 ${className}`}>
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
        {/* Dynamically render filter groups based on available options */}
        {Object.entries(options).map(([filterType, filterOptions]) => {
          // Skip rendering if options array is empty
          if (!filterOptions || filterOptions.length === 0) {
            return null;
          }
          
          // Format the title (convert camelCase to Title Case)
          const title = filterType
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
          
          // For the first item or when not expanded, render immediately
          if (filterType === Object.keys(options)[0] || isExpanded) {
            return (
              <div key={filterType} className={filterType !== Object.keys(options)[0] && isExpanded ? "pt-2" : ""}>
                {renderFilterGroup(title, filterType, filterOptions)}
              </div>
            );
          }
          
          return null;
        })}
      </div>
    </div>
  );
};

export default FilterBar;
