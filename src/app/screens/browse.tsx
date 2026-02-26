import React, { useState } from "react";
import { Link } from "react-router";
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Star,
  X,
  Check,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AppHeader } from "../components/app-header";

const categories = ["All", "Gaming", "Beauty", "Fitness", "Business", "Music", "Comedy"];
const platforms = ["Twitch", "TikTok", "Instagram", "YouTube"];
const priceRanges = ["Any", "Under ₦50k", "₦50k - ₦150k", "₦150k+"];
const audienceSizes = ["Any", "< 500", "500 - 2k", "2k+"];
const countries = ["Any", "United Kingdom", "United States", "Canada", "France", "Germany"];

const creators = [
  {
    id: 1,
    name: "Alex Rivers",
    platforms: ["Twitch", "TikTok"],
    avgViewers: "850",
    tags: ["Gaming", "PC"],
    price: "70k",
    avatar: "https://images.unsplash.com/photo-1758179759979-c0c2235ae172?w=200&h=200&fit=crop",
    rating: 4.9
  },
  {
    id: 2,
    name: "Sarah Chen",
    platforms: ["TikTok", "Instagram"],
    avgViewers: "1.2k",
    tags: ["Beauty", "Tech"],
    price: "120k",
    avatar: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=200&h=200&fit=crop",
    rating: 5.0
  },
  {
    id: 3,
    name: "Marco Rossi",
    platforms: ["Instagram"],
    avgViewers: "640",
    tags: ["Fitness", "Vlog"],
    price: "45k",
    avatar: "https://images.unsplash.com/photo-1667970573560-6ecf6a143514?w=200&h=200&fit=crop",
    rating: 4.7
  },
  {
    id: 4,
    name: "Elena G",
    platforms: ["YouTube", "Twitch"],
    avgViewers: "2.5k",
    tags: ["Music", "Live"],
    price: "250k",
    avatar: "https://images.unsplash.com/photo-1725273442551-168da8024986?w=200&h=200&fit=crop",
    rating: 4.8
  },
  {
    id: 5,
    name: "Maya Frost",
    platforms: ["TikTok", "Twitch"],
    avgViewers: "3.1k",
    tags: ["FPS", "Humor"],
    price: "180k",
    avatar: "https://images.unsplash.com/photo-1571169186019-18acfb7036bb?w=200&h=200&fit=crop",
    rating: 4.9
  },
  {
    id: 6,
    name: "Daniel J",
    platforms: ["YouTube"],
    avgViewers: "920",
    tags: ["Hardware", "Tech"],
    price: "110k",
    avatar: "https://images.unsplash.com/photo-1768471125958-78556538fadc?w=200&h=200&fit=crop",
    rating: 4.6
  },
  {
    id: 7,
    name: "Lila Rose",
    platforms: ["Instagram", "TikTok"],
    avgViewers: "1.8k",
    tags: ["Lifestyle", "Travel"],
    price: "155k",
    avatar: "https://images.unsplash.com/photo-1720950902310-cec5eacbb56e?w=200&h=200&fit=crop",
    rating: 5.0
  }
];

export function Browse() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState("Any");
  const [selectedAudience, setSelectedAudience] = useState("Any");
  const [selectedCountry, setSelectedCountry] = useState("Any");

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader title="Browse Creators" showBack={true} />
      
      {/* Search & Filters */}
      <div className="px-6 py-6 sticky top-[84px] bg-white z-20 border-b border-[#1D1D1D]">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1D]" />
            <input 
              type="text" 
              placeholder="SEARCH CREATORS..." 
              className="w-full bg-[#F8F8F8] border border-[#1D1D1D] py-4 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:bg-[#1D1D1D] focus:text-white transition-colors placeholder:text-[#1D1D1D]/40 italic"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`border border-[#1D1D1D] p-4 transition-all active:scale-95 ${showFilters ? "bg-[#1D1D1D] text-white" : "bg-white text-[#1D1D1D]"}`}
          >
            {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4 text-[#389C9A]" />}
          </button>
        </div>

        {/* Filter Drawer/Section */}
        <AnimatePresence mode="wait">
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 flex flex-col gap-8">
                {/* Platforms Filter */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40">Platform</h3>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map(p => (
                      <button
                        key={p}
                        onClick={() => togglePlatform(p)}
                        className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                          selectedPlatforms.includes(p) ? "bg-[#1D1D1D] text-white border-[#1D1D1D]" : "bg-white border-[#1D1D1D]/10"
                        }`}
                      >
                        {selectedPlatforms.includes(p) && <CheckCircle2 className="w-3 h-3 text-[#389C9A]" />}
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map(range => (
                      <button
                        key={range}
                        onClick={() => setSelectedPrice(range)}
                        className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all ${
                          selectedPrice === range ? "bg-[#1D1D1D] text-white border-[#1D1D1D]" : "bg-white border-[#1D1D1D]/10"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audience Size Filter */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40">Avg. Viewers</h3>
                  <div className="flex flex-wrap gap-2">
                    {audienceSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedAudience(size)}
                        className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all ${
                          selectedAudience === size ? "bg-[#1D1D1D] text-white border-[#1D1D1D]" : "bg-white border-[#1D1D1D]/10"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Filter */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40">Country</h3>
                  <div className="flex flex-wrap gap-2">
                    {countries.map(country => (
                      <button
                        key={country}
                        onClick={() => setSelectedCountry(country)}
                        className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all ${
                          selectedCountry === country ? "bg-[#1D1D1D] text-white border-[#1D1D1D]" : "bg-white border-[#1D1D1D]/10"
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 pb-2 border-t border-[#1D1D1D]/10">
                  <button 
                    onClick={() => {
                      setSelectedPlatforms([]);
                      setSelectedPrice("Any");
                      setSelectedAudience("Any");
                      setSelectedCountry("Any");
                      setActiveCategory("All");
                    }}
                    className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40 hover:text-[#1D1D1D] transition-colors italic"
                  >
                    Reset Filters
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-4 bg-[#1D1D1D] text-white text-[10px] font-black uppercase tracking-widest italic"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="py-4 border-b border-[#1D1D1D] overflow-x-auto no-scrollbar flex gap-2 px-6 bg-[#F8F8F8]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all italic ${
              activeCategory === cat 
                ? "bg-[#1D1D1D] text-white" 
                : "bg-white text-[#1D1D1D] border border-[#1D1D1D]/10 hover:border-[#1D1D1D]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Creators Feed - WHITE BACKGROUND SECTION */}
      <div className="flex flex-col border-b border-[#1D1D1D] bg-white flex-1">
        {creators.map((creator, idx) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="border-b last:border-b-0 border-[#1D1D1D]/10 hover:bg-[#F8F8F8] transition-colors"
          >
            <Link 
              to={`/profile/${creator.id}`}
              className="flex items-center gap-4 p-6 group"
            >
              <div className="relative">
                <ImageWithFallback 
                  src={creator.avatar} 
                  alt={creator.name} 
                  className="w-20 h-20 grayscale border border-[#1D1D1D] object-cover" 
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-black text-xl uppercase tracking-tighter leading-none group-hover:italic transition-all text-[#1D1D1D]">
                      {creator.name}
                    </span>
                    <div className="flex gap-1">
                      {creator.platforms.map(p => (
                        <span key={p} className="bg-[#389C9A]/10 text-[#389C9A] text-[7px] font-black px-1 py-0.5 border border-[#389C9A]/20 uppercase tracking-widest leading-none italic">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">
                      <Star className="w-3 h-3 fill-[#FEDB71] text-[#FEDB71]" /> {creator.rating}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1D1D1D] italic">
                      {creator.avgViewers} VIEWERS
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {creator.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-bold uppercase tracking-widest text-[#1D1D1D]/40 bg-[#F8F8F8] px-2 py-0.5 border border-[#1D1D1D]/10 italic">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">From</span>
                <span className="text-xl font-black italic text-[#389C9A]">₦{creator.price}</span>
                <ChevronRight className="w-4 h-4 mt-1 opacity-20 group-hover:opacity-100 transition-opacity text-[#1D1D1D]" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Footer Padding - Removed extra h-20 to eliminate white space gap */}
    </div>
  );
}