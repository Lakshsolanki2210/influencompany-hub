
import { useState, useEffect, ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  delay?: number;
}

const SearchInput = ({
  onSearch,
  placeholder = "Search...",
  className = "",
  delay = 500
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, delay);
  
  useEffect(() => {
    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="w-full pl-10 pr-10 py-2 border border-input bg-background rounded-md
                 focus:ring-2 focus:ring-primary/20 focus:border-primary 
                 placeholder:text-muted-foreground text-sm transition-all"
        placeholder={placeholder}
      />
      {searchValue && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
