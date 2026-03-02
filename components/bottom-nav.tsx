import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Home, Search, MessageSquare, User } from "lucide-react";
import { supabase } from "../lib/supabase"; // Ensure you have a supabase client instance

export function BottomNav() {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const tabs = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Search, label: "Opportunities", path: "/browse-businesses" },
    { icon: MessageSquare, label: "Messages", path: "/messages", badge: unreadCount },
    { icon: User, label: "Profile", path: "/profile/1" },
  ];

  useEffect(() => {
    // Fetch unread messages count from Supabase
    const fetchUnreadMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id")
        .eq("read", false);  // Assuming 'read' is a boolean field indicating unread messages

      if (error) {
        console.error("Error fetching unread messages:", error);
      } else {
        setUnreadCount(data?.length ?? 0);
      }
    };

    fetchUnreadMessages();

    // Optionally, set up real-time listener for new unread messages
    const messageListener = supabase
      .from("messages")
      .on("INSERT", (payload) => {
        if (payload.new.read === false) {
          setUnreadCount((prevCount) => prevCount + 1);
        }
      })
      .on("UPDATE", (payload) => {
        if (payload.new.read === true) {
          setUnreadCount((prevCount) => prevCount - 1);
        }
      })
      .subscribe();

    // Cleanup the listener on component unmount
    return () => {
      supabase.removeSubscription(messageListener);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[60px] bg-[#1D1D1D] border-t border-white/10 flex items-center z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path || (tab.path === "/messages" && location.pathname.startsWith("/messages"));
        return (
          <Link 
            key={tab.path}
            to={tab.path}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? "text-[#389C9A]" : "text-white/40"}`}
          >
            <div className="relative">
              <tab.icon className="w-6 h-6" strokeWidth={isActive ? 3 : 2} />
              {tab.badge && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FEDB71] rounded-full flex items-center justify-center border border-[#1D1D1D]">
                  <span className="text-[9px] font-black text-[#1D1D1D]">{tab.badge}</span>
                </div>
              )}
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest italic">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}