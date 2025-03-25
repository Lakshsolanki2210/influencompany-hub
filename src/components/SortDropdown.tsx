
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { SortOption } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface SortDropdownProps {
  options: SortOption[];
  activeOption: string;
  onSortChange: (value: string) => void;
  className?: string;
}

const SortDropdown = ({
  options,
  activeOption,
  onSortChange,
  className = "",
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const activeOptionObj = options.find((option) => option.value === activeOption);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleOptionClick = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium 
                 bg-white border border-input rounded-md shadow-sm hover:bg-secondary/20 
                 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <span>{activeOptionObj?.label || "Sort by"}</span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-10 mt-1 w-full bg-white border border-input rounded-md shadow-lg
                      divide-y divide-border max-h-60 overflow-auto glass"
          >
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.id}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm 
                             ${activeOption === option.value ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}
                             transition-colors`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                  {activeOption === option.value && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
