
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import SearchInput from "@/components/SearchInput";
import FilterBar from "@/components/FilterBar";
import InfluencerCard from "@/components/InfluencerCard";
import SortDropdown from "@/components/SortDropdown";
import { Influencer, mockInfluencers, categoryOptions, locationOptions, sortOptions } from "@/lib/data";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Influencers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    category: "all",
    location: "all"
  });
  const [sortBy, setSortBy] = useState("followers:desc");
  
  // Mock API call with React Query
  const fetchInfluencers = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockInfluencers;
  };
  
  const { data: influencers, isLoading } = useQuery({
    queryKey: ["influencers"],
    queryFn: fetchInfluencers,
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
  
  // Filter and sort the influencers
  const filteredInfluencers = influencers
    ? influencers.filter(influencer => {
      const matchesSearch = searchQuery === "" || 
                          influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          influencer.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          influencer.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeFilters.category === "all" || 
                             influencer.category === activeFilters.category;
      
      const matchesLocation = activeFilters.location === "all" || 
                             influencer.location === activeFilters.location;
      
      return matchesSearch && matchesCategory && matchesLocation;
    })
    : [];
    
  // Sort the filtered influencers
  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    const [field, direction] = sortBy.split(":");
    const multiplier = direction === "asc" ? 1 : -1;
    
    if (field === "name") {
      return multiplier * a.name.localeCompare(b.name);
    } else {
      return multiplier * ((a[field as keyof Influencer] as number) - (b[field as keyof Influencer] as number));
    }
  });
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Influencers</h1>
          <p className="text-muted-foreground">
            Discover and connect with top influencers across various categories.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-3/4">
            <SearchInput 
              onSearch={handleSearch} 
              placeholder="Search influencers by name, handle or bio..." 
            />
          </div>
          <div className="w-full md:w-1/4">
            <SortDropdown 
              options={sortOptions}
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
                category: categoryOptions,
                location: locationOptions,
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
            ) : sortedInfluencers.length > 0 ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{sortedInfluencers.length}</span> results
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedInfluencers.map((influencer, index) => (
                    <InfluencerCard 
                      key={influencer.id} 
                      influencer={influencer}
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
                <p className="text-lg font-medium mb-2">No influencers found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilters({ category: "all", location: "all" });
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

export default Influencers;
