import { useNavigate } from "react-router";
import { 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Bell, 
  Clock, 
  ShieldCheck,
  LayoutDashboard,
  Search
} from "lucide-react";
import { motion } from "motion/react";
import { AppHeader } from "../components/app-header";

export function BusinessSubmissionSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-[100px]">
      <AppHeader title="Campaign Submitted" />
      
      <main className="max-w-[480px] mx-auto w-full px-6 pt-12 flex flex-col items-center">
        {/* SUCCESS ICON ANIMATION */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-24 h-24 bg-[#389C9A] border-4 border-[#1D1D1D] flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-[#FEDB71]" />
        </motion.div>

        {/* MAIN MESSAGE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 leading-none">
            Payment Held
          </h1>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4 leading-none">
            Campaign Under Review
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="h-px w-8 bg-[#1D1D1D]/10" />
            <Clock className="w-4 h-4 text-[#D2691E]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D2691E] italic">Under Admin Review</span>
            <span className="h-px w-8 bg-[#1D1D1D]/10" />
          </div>
          <p className="text-sm font-medium italic text-[#1D1D1D]/60 leading-relaxed uppercase tracking-tight max-w-[320px] mx-auto mb-4">
            Your payment has been held securely. Your campaign is now being reviewed by the LiveLink team before going live to creators.
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#389C9A] italic">
            Please watch for updates in your email and the app inbox.
          </p>
        </div>

        {/* WHAT HAPPENS NEXT SECTION */}
        <div className="w-full bg-[#F8F8F8] border-2 border-[#1D1D1D] p-8 mb-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-center">What Happens Next?</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white border border-[#1D1D1D]/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#389C9A]" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-tight mb-1 italic">Admin Review — Within 24 Hours</h3>
                <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest leading-relaxed italic">
                  Our team will review your campaign and banner within 24 hours. If there are any issues we will contact you by email before making any changes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white border border-[#1D1D1D]/10 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-[#389C9A]" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-tight mb-1 italic">Campaign Goes Live to Creators</h3>
                <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest leading-relaxed italic">
                  Once approved your campaign will be visible to creators in your selected tier. Creators can then apply to your campaign.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white border border-[#1D1D1D]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#389C9A]" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-tight mb-1 italic">Payment Security</h3>
                <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest leading-relaxed italic">
                  Your funds are held securely in escrow. If no creator applies within your open period or work is not completed a full refund is issued automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* INFO CARD */}
        <div className="w-full bg-[#FFF8DC] border border-[#D2691E]/20 p-6 flex items-start gap-4 italic mb-12">
          <Mail className="w-6 h-6 text-[#D2691E] shrink-0" />
          <p className="text-[10px] font-bold text-[#D2691E] leading-relaxed uppercase tracking-tight">
            Check your email for a copy of your campaign brief, payment receipt and transaction ID. We've sent a confirmation to your registered business email address.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="w-full flex flex-col gap-4">
          <button 
            onClick={() => navigate("/business/dashboard")}
            className="w-full py-6 bg-[#1D1D1D] text-white text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all italic border-2 border-[#1D1D1D]"
          >
            <LayoutDashboard className="w-4 h-4 text-[#FEDB71]" /> Return to Dashboard
          </button>
          
          <button 
            onClick={() => navigate("/campaigns")}
            className="w-full py-6 bg-white text-[#1D1D1D] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 active:bg-[#F8F8F8] transition-all italic border-2 border-[#1D1D1D]"
          >
            <Search className="w-4 h-4 text-[#389C9A]" /> View My Campaigns
          </button>
        </div>

        <p className="mt-8 text-[8px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/20 text-center italic">
          Transaction ID: LL-CAM-88291-SUCCESS
        </p>
      </main>
    </div>
  );
}