
import { motion } from "framer-motion";
import { Company } from "@/lib/data";
import { BadgeCheck, Briefcase, MapPin, Globe } from "lucide-react";

interface CompanyCardProps {
  company: Company;
  index: number;
}

const CompanyCard = ({ company, index }: CompanyCardProps) => {
  // Staggered animation delay based on index
  const animationDelay = (index % 12) * 0.05;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-border 
                hover:shadow-md hover:border-primary/20 transition-all duration-300"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-16 w-16 bg-white rounded-md border border-border flex items-center justify-center overflow-hidden">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-full h-full object-contain"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/150?text=Logo";
              }}
            />
          </div>
          <div className="flex items-center gap-1 bg-secondary/80 px-2 py-1 rounded-full text-xs font-medium">
            Founded {company.founded}
            {company.verified && (
              <BadgeCheck className="h-4 w-4 text-accent ml-1" aria-label="Verified" />
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground text-lg">{company.name}</h3>
          <div className="flex items-center gap-3 mt-1 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="capitalize">{company.location}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{company.campaigns} campaigns</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {company.industry}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            {company.size}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
        
        <div className="flex items-center gap-2 pt-2">
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Website</span>
          </a>
          <button className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium
                           hover:bg-primary/90 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
