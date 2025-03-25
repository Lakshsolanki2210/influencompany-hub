
export interface Influencer {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  category: string;
  location: string;
  followers: number;
  rating: number;
  engagement: number;
  bio: string;
  verified: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  founded: number;
  description: string;
  website: string;
  campaigns: number;
  verified: boolean;
}

export type SortOption = {
  id: string;
  label: string;
  value: string;
};

export const sortOptions: SortOption[] = [
  { id: "name-asc", label: "Name (A-Z)", value: "name:asc" },
  { id: "name-desc", label: "Name (Z-A)", value: "name:desc" },
  { id: "followers-desc", label: "Most Followers", value: "followers:desc" },
  { id: "followers-asc", label: "Least Followers", value: "followers:asc" },
  { id: "rating-desc", label: "Highest Rating", value: "rating:desc" },
  { id: "rating-asc", label: "Lowest Rating", value: "rating:asc" },
];

export const companySortOptions: SortOption[] = [
  { id: "name-asc", label: "Name (A-Z)", value: "name:asc" },
  { id: "name-desc", label: "Name (Z-A)", value: "name:desc" },
  { id: "campaigns-desc", label: "Most Campaigns", value: "campaigns:desc" },
  { id: "campaigns-asc", label: "Least Campaigns", value: "campaigns:asc" },
  { id: "founded-desc", label: "Newest", value: "founded:desc" },
  { id: "founded-asc", label: "Oldest", value: "founded:asc" },
];

export const categoryOptions = [
  { id: "all", label: "All Categories" },
  { id: "fashion", label: "Fashion" },
  { id: "beauty", label: "Beauty" },
  { id: "fitness", label: "Fitness" },
  { id: "travel", label: "Travel" },
  { id: "food", label: "Food" },
  { id: "tech", label: "Technology" },
  { id: "gaming", label: "Gaming" },
  { id: "lifestyle", label: "Lifestyle" },
];

export const industryOptions = [
  { id: "all", label: "All Industries" },
  { id: "retail", label: "Retail" },
  { id: "technology", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "entertainment", label: "Entertainment" },
  { id: "food", label: "Food & Beverage" },
  { id: "travel", label: "Travel & Tourism" },
];

export const locationOptions = [
  { id: "all", label: "All Locations" },
  { id: "us", label: "United States" },
  { id: "uk", label: "United Kingdom" },
  { id: "ca", label: "Canada" },
  { id: "au", label: "Australia" },
  { id: "fr", label: "France" },
  { id: "de", label: "Germany" },
  { id: "jp", label: "Japan" },
  { id: "kr", label: "South Korea" },
];

export const sizeOptions = [
  { id: "all", label: "All Sizes" },
  { id: "small", label: "Small (1-50)" },
  { id: "medium", label: "Medium (51-200)" },
  { id: "large", label: "Large (201-1000)" },
  { id: "enterprise", label: "Enterprise (1000+)" },
];

// Generate mock influencers
export const generateInfluencers = (count: number = 20): Influencer[] => {
  const mockInfluencers: Influencer[] = [];
  
  for (let i = 1; i <= count; i++) {
    const categoryIndex = Math.floor(Math.random() * (categoryOptions.length - 1)) + 1;
    const locationIndex = Math.floor(Math.random() * (locationOptions.length - 1)) + 1;
    
    mockInfluencers.push({
      id: `inf-${i}`,
      name: `Influencer ${i}`,
      avatar: `https://i.pravatar.cc/300?img=${i % 70}`,
      handle: `@influencer${i}`,
      category: categoryOptions[categoryIndex].id,
      location: locationOptions[locationIndex].id,
      followers: Math.floor(Math.random() * 5000000),
      rating: 3 + Math.random() * 2,
      engagement: Math.random() * 10,
      bio: `Professional content creator specializing in ${categoryOptions[categoryIndex].label.toLowerCase()} with a passion for creating authentic experiences.`,
      verified: Math.random() > 0.7,
    });
  }
  
  return mockInfluencers;
};

// Generate mock companies
export const generateCompanies = (count: number = 20): Company[] => {
  const mockCompanies: Company[] = [];
  
  for (let i = 1; i <= count; i++) {
    const industryIndex = Math.floor(Math.random() * (industryOptions.length - 1)) + 1;
    const locationIndex = Math.floor(Math.random() * (locationOptions.length - 1)) + 1;
    const sizeIndex = Math.floor(Math.random() * (sizeOptions.length - 1)) + 1;
    
    mockCompanies.push({
      id: `comp-${i}`,
      name: `Company ${i}`,
      logo: `https://logo.clearbit.com/${i}.com`,
      industry: industryOptions[industryIndex].id,
      location: locationOptions[locationIndex].id,
      size: sizeOptions[sizeIndex].id,
      founded: 1990 + Math.floor(Math.random() * 32),
      description: `Leading ${industryOptions[industryIndex].label.toLowerCase()} company focused on innovation and customer satisfaction.`,
      website: `https://company${i}.com`,
      campaigns: Math.floor(Math.random() * 50),
      verified: Math.random() > 0.7,
    });
  }
  
  return mockCompanies;
};

// Mock data for initial render
export const mockInfluencers = generateInfluencers(24);
export const mockCompanies = generateCompanies(24);
