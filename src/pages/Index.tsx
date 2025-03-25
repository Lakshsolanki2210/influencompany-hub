
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase"
            >
              Connecting Talents with Brands
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            >
              The Ultimate <span className="text-primary">Influencer-Company</span> Marketplace
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              A premium platform connecting influencers and companies for meaningful partnerships, collaborative campaigns, and impactful brand stories.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link
              to="/influencers"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
            >
              Browse Influencers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/companies"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary bg-white border border-primary rounded-xl hover:bg-primary/5 transition-colors"
            >
              Explore Companies
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-20"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-border"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <circle cx="12" cy="10" r="2"></circle>
                <line x1="8" x2="8" y1="2" y2="4"></line>
                <line x1="16" x2="16" y1="2" y2="4"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover Talent</h3>
            <p className="text-muted-foreground">
              Find the perfect influencers that align with your brand values and audience demographics.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-border"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect Directly</h3>
            <p className="text-muted-foreground">
              Reach out to influencers and companies without intermediaries, fostering authentic relationships.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-border"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
            <p className="text-muted-foreground">
              Create impactful campaigns and track performance through our collaborative tools.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
