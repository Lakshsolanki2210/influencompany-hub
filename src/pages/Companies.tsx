
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import SearchInput from "@/components/SearchInput";
import FilterBar from "@/components/FilterBar";
import CompanyCard from "@/components/CompanyCard";
import SortDropdown from "@/components/SortDropdown";
import { Company, mockCompanies, industryOptions, locationOptions, sizeOptions, companySortOptions } from "@/lib/data";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    industry: "all",
    location: "all",
    size: "all"
  });
  const [sortBy, setSortBy] = useState("name:asc");
  
  // Mock API call with React Query
  const fetchCompanies = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockCompanies;
  };
  
  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });
  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  
  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  // Filter and sort the companies
  const filteredCompanies = companies
    ? companies.filter(company => {
      const matchesSearch = searchQuery === "" || 
                          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = activeFilters.industry === "all" || 
                             company.industry === activeFilters.industry;
      
      const matchesLocation = activeFilters.location === "all" || 
                             company.location === activeFilters.location;
                             
      const matchesSize = activeFilters.size === "all" || 
                         company.size === activeFilters.size;
      
      return matchesSearch && matchesIndustry && matchesLocation && matchesSize;
    })
    : [];
    
  // Sort the filtered companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const [field, direction] = sortBy.split(":");
    const multiplier = direction === "asc" ? 1 : -1;
    
    if (field === "name") {
      return multiplier * a.name.localeCompare(b.name);
    } else {
      return multiplier * ((a[field as keyof Company] as number) - (b[field as keyof Company] as number));
    }
  });
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">
            Explore companies looking to collaborate with influencers.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-3/4">
            <SearchInput 
              onSearch={handleSearch} 
              placeholder="Search companies by name or description..." 
            />
          </div>
          <div className="w-full md:w-1/4">
            <SortDropdown 
              options={companySortOptions}
              activeOption={sortBy}
              onSortChange={handleSortChange}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <FilterBar 
              options={{ 
                industry: industryOptions,
                location: locationOptions,
                size: sizeOptions,
              }}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              className="sticky top-24"
            />
          </div>
          
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : sortedCompanies.length > 0 ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{sortedCompanies.length}</span> results
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedCompanies.map((company, index) => (
                    <CompanyCard 
                      key={company.id} 
                      company={company}
                      index={index}
                    />
                  ))}
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <p className="text-lg font-medium mb-2">No companies found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilters({ industry: "all", location: "all", size: "all" });
                  }}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium
                            hover:bg-secondary/80 transition-colors"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Companies;
