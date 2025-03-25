
import { Company } from "@/lib/data";
import { BadgeCheck, Briefcase, MapPin } from "lucide-react";

interface CompanyCardProps {
  company: Company;
  index: number;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-border p-6 space-y-4">
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
    </div>
  );
};

export default CompanyCard;
