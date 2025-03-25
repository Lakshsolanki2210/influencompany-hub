
import { motion } from "framer-motion";
import { Influencer } from "@/lib/data";
import { BadgeCheck, Star, MapPin, Users } from "lucide-react";

interface InfluencerCardProps {
  influencer: Influencer;
  index: number;
}

const InfluencerCard = ({ influencer, index }: InfluencerCardProps) => {
  const formatFollowers = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
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
      <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
        <img
          src={influencer.avatar}
          alt={influencer.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1 flex items-center gap-1">
              {influencer.name}
              {influencer.verified && (
                <BadgeCheck className="h-4 w-4 text-accent flex-shrink-0" aria-label="Verified" />
              )}
            </h3>
            <p className="text-sm text-muted-foreground">{influencer.handle}</p>
          </div>
          <div className="flex items-center gap-1 bg-secondary/80 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-medium">{influencer.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="capitalize">{influencer.location}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{formatFollowers(influencer.followers)}</span>
          </div>
        </div>
        
        <div className="pt-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {influencer.category}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{influencer.bio}</p>
        
        <div className="pt-2">
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium
                           hover:bg-primary/90 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InfluencerCard;
