import React from "react";
import { motion } from "motion/react";
import { Video as VideoIcon, Building, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export function LoginPortal() {

  const handleLogin = async (userType: "creator" | "business") => {
    const redirectTo = `${window.location.origin}/dashboard?role=${userType}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google", // you can choose github, google, etc.
      options: {
        redirectTo,
      },
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-8 pt-20 pb-12">
      {/* Logo & Heading */}
      <div className="flex flex-col items-center mb-16">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[#1D1D1D] flex items-center justify-center">
            <div className="w-5 h-5 bg-[#389C9A]" />
          </div>
          <span className="text-3xl font-black uppercase tracking-tighter italic text-[#1D1D1D]">LiveLink</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black uppercase tracking-tighter leading-none mb-4 italic text-[#1D1D1D]">
          Who are you logging in as?
        </motion.h1>
      </div>

      {/* Portal Cards */}
      <div className="flex flex-col gap-6 flex-1">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => handleLogin("creator")}
          className="group relative flex items-center justify-between p-8 bg-white border-2 border-[#1D1D1D] transition-all active:scale-[0.98] text-left hover:bg-[#1D1D1D] hover:text-white"
        >
          <div className="flex flex-col gap-4">
            <VideoIcon className="w-8 h-8 text-[#389C9A]" />
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight italic mb-1">I'm a Creator</h3>
              <p className="text-xs font-medium italic opacity-60 leading-tight pr-8">
                Access your campaigns, earnings and brand partnerships.
              </p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => handleLogin("business")}
          className="group relative flex items-center justify-between p-8 bg-white border-2 border-[#1D1D1D] transition-all active:scale-[0.98] text-left hover:bg-[#1D1D1D] hover:text-white"
        >
          <div className="flex flex-col gap-4">
            <Building className="w-8 h-8 text-[#FEDB71]" />
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight italic mb-1">I'm a Business</h3>
              <p className="text-xs font-medium italic opacity-60 leading-tight pr-8">
                Manage your campaigns and find live creators for your brand.
              </p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
}