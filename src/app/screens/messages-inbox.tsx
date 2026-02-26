import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Search as SearchIcon } from "lucide-react";
import { BottomNav } from "../components/bottom-nav";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AppHeader } from "../components/app-header";

export function MessagesInbox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const userType = role === 'business' ? 'business' : 'creator';
  const backPath = userType === 'business' ? '/business/dashboard' : '/dashboard';
  
  const conversations = [
    {
      id: 1,
      name: "CloudSaaS",
      campaign: "Spring Property Showcase",
      lastMessage: "Hi, just checking you received the banner...",
      time: "2h",
      unread: true,
      logo: "https://images.unsplash.com/photo-1644088379091-d574269d422f?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "PrimeNest",
      campaign: "Summer Brand Campaign",
      lastMessage: "Stream 3 confirmed — payment processing",
      time: "Yesterday",
      unread: false,
      logo: "https://images.unsplash.com/photo-1622651132634-a7ed1fbb86dd?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "FitLife",
      campaign: "New Year Fitness Push",
      lastMessage: "Thanks for the great streams this week!",
      time: "Mon",
      unread: false,
      logo: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-[60px]">
      <AppHeader showBack title="Messages" backPath={backPath} userType={userType} />
      <main>
        <div className="px-6 py-8">
          <div className="relative mb-6">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1D]/40" />
            <input 
              type="text" 
              placeholder="SEARCH CONVERSATIONS..."
              className="w-full h-12 bg-[#F8F8F8] border border-[#1D1D1D]/10 rounded-none pl-11 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#1D1D1D] transition-colors italic"
            />
          </div>
        </div>
        
        <div className="bg-white border-y border-[#1D1D1D]/10">
          {conversations.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => navigate(`/messages/${conv.id}`)}
              className="h-[80px] flex items-center px-6 gap-4 border-b border-[#1D1D1D]/10 last:border-0 active:bg-[#F8F8F8] transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-none overflow-hidden border-2 border-[#1D1D1D]/10 shrink-0 bg-[#F8F8F8]">
                <ImageWithFallback src={conv.logo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2 mb-1">
                  <h3 className="font-black text-sm uppercase tracking-tight group-hover:italic transition-all">{conv.name}</h3>
                  <span className="text-[9px] text-[#1D1D1D]/40 font-bold uppercase tracking-widest shrink-0">{conv.time}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="text-[11px] text-[#1D1D1D]/60 truncate leading-none font-medium italic">
                    {conv.lastMessage}
                  </p>
                  {conv.unread && (
                    <div className="w-2 h-2 bg-[#389C9A] rounded-none shrink-0 border border-[#1D1D1D]/10" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
