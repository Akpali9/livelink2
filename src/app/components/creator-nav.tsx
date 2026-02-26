import React from "react";
import { Link } from "react-router";
import { Bell } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CreatorNavProps {
  unreadCount?: number;
  avatarUrl?: string;
  initials?: string;
}

export function CreatorNav({ 
  unreadCount = 2, 
  avatarUrl = "https://images.unsplash.com/photo-1758179759979-c0c2235ae172?w=100&h=100&fit=crop",
  initials = "AR"
}: CreatorNavProps) {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-14 bg-[#1B3C53] flex items-center justify-between px-4 z-[100]">
      <Link to="/dashboard" className="text-lg font-black italic tracking-tighter text-white">
        LiveLink
      </Link>
      
      <div className="flex items-center gap-3">
        <button className="relative p-1">
          <Bell className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border border-white translate-x-1/2 -translate-y-1/2">
              <span className="text-[10px] font-bold text-white leading-none">{unreadCount}</span>
            </div>
          )}
        </button>
        
        <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#2C4E68] flex items-center justify-center shrink-0">
          {avatarUrl ? (
            <ImageWithFallback src={avatarUrl} className="w-full h-full object-cover grayscale" />
          ) : (
            <span className="text-[10px] font-black text-white uppercase">{initials}</span>
          )}
        </div>
      </div>
    </nav>
  );
}
