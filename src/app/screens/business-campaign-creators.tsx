import React from "react";
import { useNavigate, useParams } from "react-router";
import { 
  ArrowLeft, 
  Users, 
  ChevronRight, 
  Star,
  Tv,
  MessageSquare
} from "lucide-react";
import { AppHeader } from "../components/app-header";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function BusinessCampaignCreators() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for the campaign and its creators
  const campaign = {
    id: id || "c1",
    name: id === "c1" ? "SUMMER SALE BLAST" : "SPRING LAUNCH",
    type: id === "c1" ? "Banner + Code" : "Banner Only",
    creators: [
      {
        id: "cr1",
        name: "Alex Rivers",
        handle: "@alexrivers",
        avatar: "https://images.unsplash.com/photo-1758179759979-c0c2235ae172?w=100&h=100&fit=crop",
        status: "ACTIVE",
        streams: "6/12",
        rating: 4.9
      },
      {
        id: "cr2",
        name: "Sarah Stream",
        handle: "@sarahstream",
        avatar: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop",
        status: "ACTIVE",
        streams: "4/8",
        rating: 4.8
      },
      {
        id: "cr3",
        name: "Jordan Plays",
        handle: "@jordanplays",
        avatar: "https://images.unsplash.com/photo-1571171637448-4a6ef83cd9c7?w=100&h=100&fit=crop",
        status: "NOT STARTED",
        streams: "0/4",
        rating: 4.7
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-24">
      <AppHeader showBack backPath="/business/dashboard" title="Campaign Creators" />
      
      <main className="flex-1">
        {/* Campaign Header Summary */}
        <section className="px-8 py-8 border-b-2 border-[#1D1D1D] bg-[#F8F8F8]/30">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic leading-none">{campaign.name}</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#389C9A] italic">{campaign.type}</p>
          </div>
        </section>

        {/* Creators List */}
        <section className="px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40 italic">Active Creators</h3>
            <span className="text-[10px] font-black uppercase tracking-tight italic">{campaign.creators.length} Partners</span>
          </div>

          <div className="flex flex-col gap-4">
            {campaign.creators.map((creator) => (
              <div 
                key={creator.id}
                onClick={() => navigate(`/business/campaign/${campaign.id}/creator/${creator.id}`)}
                className="bg-white border-2 border-[#1D1D1D] p-5 flex items-center gap-5 cursor-pointer active:scale-[0.98] transition-all group"
              >
                {/* Avatar */}
                <div className="w-14 h-14 border-2 border-[#1D1D1D] overflow-hidden shrink-0">
                  <ImageWithFallback src={creator.avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-black uppercase tracking-tight text-lg italic leading-none truncate">{creator.name}</h4>
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-[#FEDB71] border border-[#1D1D1D]/10 text-[7px] font-black italic">
                      <Star className="w-2 h-2 fill-[#1D1D1D]" />
                      {creator.rating}
                    </div>
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#1D1D1D]/40 italic mb-2">{creator.handle}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Tv className="w-3 h-3 text-[#389C9A]" />
                      <span className="text-[9px] font-black uppercase tracking-tight italic">Streams: {creator.streams}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Arrow */}
                <div className="flex flex-col items-end gap-3">
                  <div className={`px-2 py-0.5 text-[7px] font-black uppercase tracking-widest italic border ${
                    creator.status === 'ACTIVE' ? 'bg-[#389C9A] text-white border-[#389C9A]' : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}>
                    {creator.status}
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Support */}
          <div className="mt-12 p-8 bg-[#1D1D1D] text-white flex flex-col gap-4 italic">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Need more creators?</h4>
            <p className="text-lg font-black uppercase tracking-tighter leading-tight italic">Your campaign is still accepting applications.</p>
            <button 
              onClick={() => navigate("/browse")}
              className="mt-2 text-[10px] font-black uppercase tracking-widest text-[#FEDB71] border-b border-[#FEDB71] w-fit flex items-center gap-2"
            >
              BROWSE MARKETPLACE <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
