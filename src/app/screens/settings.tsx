import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, HelpCircle, FileText, Shield, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Settings() {
  const navigate = useNavigate();
  
  // Account section state
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [email, setEmail] = useState("alex@email.com");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPasswordEmail, setCurrentPasswordEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber] = useState("+234 801 234 5678");

  // Profile section state
  const [editingBio, setEditingBio] = useState(false);
  const [editingNiche, setEditingNiche] = useState(false);
  const [editingPlatforms, setEditingPlatforms] = useState(false);
  const [bio, setBio] = useState("Gaming content creator specializing in FPS games. I stream 5 days a week with an engaged community that loves tech and gaming products.");
  const [bioExpanded, setBioExpanded] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [selectedNiches, setSelectedNiches] = useState(["Gaming", "Tech Reviews", "Lifestyle"]);
  const [platforms, setPlatforms] = useState([
    { id: 1, name: "Twitch", handle: "@alexgames" },
    { id: 2, name: "YouTube", handle: "@alexgaming" },
    { id: 3, name: "TikTok", handle: "@alex_streams" },
  ]);

  // Gig pricing state
  const [gig1Enabled] = useState(true); // Always enabled
  const [gig2Enabled, setGig2Enabled] = useState(true);
  const [gig3Enabled, setGig3Enabled] = useState(false);
  
  const [gig1Name, setGig1Name] = useState("Bronze Package");
  const [gig1Streams, setGig1Streams] = useState(4);
  const [gig1Price, setGig1Price] = useState("15000");
  const [gig1Description, setGig1Description] = useState("Perfect for testing the partnership");
  
  const [gig2Name, setGig2Name] = useState("Silver Package");
  const [gig2Streams, setGig2Streams] = useState(8);
  const [gig2Price, setGig2Price] = useState("28000");
  const [gig2Description, setGig2Description] = useState("Best value for ongoing campaigns");
  
  const [gig3Name, setGig3Name] = useState("");
  const [gig3Streams, setGig3Streams] = useState(4);
  const [gig3Price, setGig3Price] = useState("");
  const [gig3Description, setGig3Description] = useState("");

  // Notifications state
  const [notifCampaigns, setNotifCampaigns] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifPayments, setNotifPayments] = useState(true);
  const [notifAnnouncements, setNotifAnnouncements] = useState(false);

  // Modals state
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const nicheOptions = [
    "Gaming", "Tech Reviews", "Lifestyle", "Fashion", "Beauty",
    "Fitness", "Food & Cooking", "Travel", "Music", "Education",
    "Business", "Sports", "Comedy", "Art & Design", "DIY & Crafts"
  ];

  const truncateBio = (text: string, lines: number = 2) => {
    const words = text.split(" ");
    if (words.length <= 15) return text;
    return bioExpanded ? text : words.slice(0, 15).join(" ") + "...";
  };

  const handleUpdateEmail = () => {
    setEmail(newEmail);
    setEditingEmail(false);
    setNewEmail("");
    setConfirmEmail("");
    setCurrentPasswordEmail("");
  };

  const handleUpdatePassword = () => {
    setEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveBio = () => {
    setBio(bioInput);
    setEditingBio(false);
  };

  const handleSaveNiche = () => {
    setEditingNiche(false);
  };

  const handleRemovePlatform = (id: number) => {
    setPlatforms(platforms.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-white pb-24 max-w-md mx-auto">
      {/* TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#1D1D1D]/10 z-50 px-4 py-3 max-w-md mx-auto">
        <div className="flex items-center justify-center relative">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-0 p-1"
          >
            <ArrowLeft className="w-5 h-5 text-[#1D1D1D]" />
          </button>
          <h1 className="text-base font-black uppercase tracking-tighter italic text-[#1D1D1D]">
            SETTINGS
          </h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="mt-14 px-4 py-6 space-y-8">
        
        {/* SECTION 1: ACCOUNT */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/50 mb-4 italic">
            ACCOUNT
          </h2>

          <div className="space-y-6">
            {/* Email Address */}
            <div className="border-b border-[#1D1D1D]/10 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-[#1D1D1D] mb-1 italic">
                    EMAIL ADDRESS
                  </label>
                  <p className="text-sm text-[#1D1D1D]/60">
                    {email}
                  </p>
                </div>
                {!editingEmail && (
                  <button 
                    onClick={() => setEditingEmail(true)}
                    className="text-[10px] font-black uppercase tracking-wider text-[#389C9A] italic"
                  >
                    CHANGE
                  </button>
                )}
              </div>

              <AnimatePresence>
                {editingEmail && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                        NEW EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                        CONFIRM NEW EMAIL
                      </label>
                      <input
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                        CURRENT PASSWORD
                      </label>
                      <input
                        type="password"
                        value={currentPasswordEmail}
                        onChange={(e) => setCurrentPasswordEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                      />
                    </div>
                    <button
                      onClick={handleUpdateEmail}
                      className="w-full py-2.5 bg-[#1D1D1D] text-white text-[10px] font-black uppercase tracking-wider italic"
                    >
                      UPDATE EMAIL
                    </button>
                    <button
                      onClick={() => setEditingEmail(false)}
                      className="w-full text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/50 italic"
                    >
                      CANCEL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div className="border-b border-[#1D1D1D]/10 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-[#1D1D1D] mb-1 italic">
                    PASSWORD
                  </label>
                  <p className="text-sm text-[#1D1D1D]/60">
                    ••••••••
                  </p>
                </div>
                {!editingPassword && (
                  <button 
                    onClick={() => setEditingPassword(true)}
                    className="text-[10px] font-black uppercase tracking-wider text-[#389C9A] italic"
                  >
                    CHANGE
                  </button>
                )}
              </div>

              <AnimatePresence>
                {editingPassword && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                        CURRENT PASSWORD
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                        NEW PASSWORD
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                      />
                      {newPassword && (
                        <div className="mt-1 flex gap-1">
                          <div className={`h-1 flex-1 ${newPassword.length >= 8 ? 'bg-[#389C9A]' : 'bg-[#1D1D1D]/10'}`} />
                          <div className={`h-1 flex-1 ${newPassword.length >= 10 && /[A-Z]/.test(newPassword) ? 'bg-[#389C9A]' : 'bg-[#1D1D1D]/10'}`} />
                          <div className={`h-1 flex-1 ${newPassword.length >= 12 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? 'bg-[#389C9A]' : 'bg-[#1D1D1D]/10'}`} />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                        CONFIRM NEW PASSWORD
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                      />
                    </div>
                    <button
                      onClick={handleUpdatePassword}
                      className="w-full py-2.5 bg-[#1D1D1D] text-white text-[10px] font-black uppercase tracking-wider italic"
                    >
                      UPDATE PASSWORD
                    </button>
                    <button
                      onClick={() => setEditingPassword(false)}
                      className="w-full text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/50 italic"
                    >
                      CANCEL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phone Number */}
            <div className="border-b border-[#1D1D1D]/10 pb-4">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#1D1D1D] mb-1 italic">
                PHONE NUMBER
              </label>
              <p className="text-sm text-[#1D1D1D]/60 mb-2">
                {phoneNumber}
              </p>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#389C9A] mt-0.5 flex-shrink-0" />
                <p className="text-[9px] text-[#1D1D1D]/50 leading-relaxed">
                  To change your phone number please contact our team at{" "}
                  <a href="mailto:support@livelink.com" className="text-[#389C9A] underline">
                    support@livelink.com
                  </a>
                  {" "}— this requires identity verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PROFILE */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/50 mb-4 italic">
            PROFILE
          </h2>

          <div className="space-y-6">
            {/* Bio */}
            <div className="border-b border-[#1D1D1D]/10 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-[#1D1D1D] mb-1 italic">
                    YOUR BIO
                  </label>
                  <p className="text-sm text-[#1D1D1D]/60 leading-relaxed">
                    {truncateBio(bio)}
                    {bio.split(" ").length > 15 && !editingBio && (
                      <button 
                        onClick={() => setBioExpanded(!bioExpanded)}
                        className="ml-1 text-[#389C9A] text-xs font-bold"
                      >
                        {bioExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </p>
                </div>
                {!editingBio && (
                  <button 
                    onClick={() => {
                      setBioInput(bio);
                      setEditingBio(true);
                    }}
                    className="text-[10px] font-black uppercase tracking-wider text-[#389C9A] italic ml-3"
                  >
                    EDIT
                  </button>
                )}
              </div>

              <AnimatePresence>
                {editingBio && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    <div>
                      <textarea
                        value={bioInput}
                        onChange={(e) => setBioInput(e.target.value.slice(0, 200))}
                        rows={4}
                        maxLength={200}
                        className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none resize-none"
                      />
                      <div className="text-right text-[9px] font-bold text-[#1D1D1D]/40 mt-1">
                        {bioInput.length}/200
                      </div>
                    </div>
                    <button
                      onClick={handleSaveBio}
                      className="w-full py-2.5 bg-[#1D1D1D] text-white text-[10px] font-black uppercase tracking-wider italic"
                    >
                      SAVE BIO
                    </button>
                    <button
                      onClick={() => setEditingBio(false)}
                      className="w-full text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/50 italic"
                    >
                      CANCEL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Niche */}
            <div className="border-b border-[#1D1D1D]/10 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-[#1D1D1D] mb-2 italic">
                    CONTENT NICHE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedNiches.map((niche, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-[#389C9A] text-white text-[9px] font-black uppercase tracking-wider italic"
                      >
                        {niche}
                      </span>
                    ))}
                  </div>
                </div>
                {!editingNiche && (
                  <button 
                    onClick={() => setEditingNiche(true)}
                    className="text-[10px] font-black uppercase tracking-wider text-[#389C9A] italic ml-3"
                  >
                    EDIT
                  </button>
                )}
              </div>

              <AnimatePresence>
                {editingNiche && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2">
                      {nicheOptions.map((niche) => (
                        <button
                          key={niche}
                          onClick={() => {
                            if (selectedNiches.includes(niche)) {
                              setSelectedNiches(selectedNiches.filter(n => n !== niche));
                            } else if (selectedNiches.length < 3) {
                              setSelectedNiches([...selectedNiches, niche]);
                            }
                          }}
                          className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider italic border transition-colors ${
                            selectedNiches.includes(niche)
                              ? "bg-[#389C9A] border-[#389C9A] text-white"
                              : "bg-white border-[#1D1D1D]/20 text-[#1D1D1D]"
                          }`}
                        >
                          {niche}
                        </button>
                      ))}
                    </div>
                    <p className="text-[8px] text-[#1D1D1D]/50 italic">
                      Select up to 3 niches
                    </p>
                    <button
                      onClick={handleSaveNiche}
                      className="w-full py-2.5 bg-[#1D1D1D] text-white text-[10px] font-black uppercase tracking-wider italic"
                    >
                      SAVE NICHE
                    </button>
                    <button
                      onClick={() => setEditingNiche(false)}
                      className="w-full text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/50 italic"
                    >
                      CANCEL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Streaming Platforms */}
            <div className="border-b border-[#1D1D1D]/10 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-[#1D1D1D] mb-2 italic">
                    YOUR PLATFORMS
                  </label>
                  <div className="space-y-2">
                    {platforms.map((platform) => (
                      <div key={platform.id} className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-[#1D1D1D] text-white text-[9px] font-black uppercase tracking-wider italic">
                          {platform.name}
                        </div>
                        <span className="text-xs text-[#1D1D1D]/60">{platform.handle}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {!editingPlatforms && (
                  <button 
                    onClick={() => setEditingPlatforms(true)}
                    className="text-[10px] font-black uppercase tracking-wider text-[#389C9A] italic ml-3"
                  >
                    MANAGE
                  </button>
                )}
              </div>

              <AnimatePresence>
                {editingPlatforms && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    {platforms.map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between p-3 border border-[#1D1D1D]/10">
                        <div>
                          <p className="text-xs font-bold text-[#1D1D1D]">{platform.name}</p>
                          <p className="text-[10px] text-[#1D1D1D]/60">{platform.handle}</p>
                        </div>
                        <button
                          onClick={() => handleRemovePlatform(platform.id)}
                          className="text-[9px] font-black uppercase tracking-wider text-red-600 italic"
                        >
                          REMOVE
                        </button>
                      </div>
                    ))}
                    <button
                      className="w-full py-2.5 border-2 border-[#1D1D1D] text-[#1D1D1D] text-[10px] font-black uppercase tracking-wider italic"
                    >
                      ADD PLATFORM
                    </button>
                    <button
                      onClick={() => setEditingPlatforms(false)}
                      className="w-full text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/50 italic"
                    >
                      DONE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SECTION 3: GIG PRICING */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/50 mb-2 italic">
            GIG PRICING
          </h2>
          <p className="text-[9px] text-[#1D1D1D]/60 mb-4 leading-relaxed">
            Set up to 3 pricing tiers for your gigs. Each tier is priced per 4 live streams minimum. Businesses will see these when viewing your profile.
          </p>

          <div className="space-y-4">
            {/* GIG 1 */}
            <div className="border-2 border-[#1D1D1D]/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#1D1D1D] italic">
                  GIG 1
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black uppercase tracking-wider text-[#1D1D1D]/40 italic">
                    ALWAYS ON
                  </span>
                  <div className="w-10 h-5 bg-[#389C9A] rounded-full flex items-center justify-end px-0.5">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                    PACKAGE NAME
                  </label>
                  <input
                    type="text"
                    value={gig1Name}
                    onChange={(e) => setGig1Name(e.target.value)}
                    placeholder="e.g. Bronze"
                    className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                    NUMBER OF LIVE STREAMS
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGig1Streams(Math.max(4, gig1Streams - 1))}
                      className="w-10 h-10 border-2 border-[#1D1D1D] flex items-center justify-center text-lg font-black"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center text-2xl font-black italic text-[#1D1D1D]">
                      {gig1Streams}
                    </div>
                    <button
                      onClick={() => setGig1Streams(gig1Streams + 1)}
                      className="w-10 h-10 border-2 border-[#1D1D1D] flex items-center justify-center text-lg font-black"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[8px] text-[#1D1D1D]/50 mt-1 italic">
                    Minimum 4 live streams per package
                  </p>
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                    YOUR PRICE (₦)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-black text-[#1D1D1D]">
                      ₦
                    </span>
                    <input
                      type="number"
                      value={gig1Price}
                      onChange={(e) => setGig1Price(e.target.value)}
                      placeholder="Enter your price"
                      className="w-full pl-8 pr-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                    />
                  </div>
                  <p className="text-[8px] text-[#1D1D1D]/50 mt-1 italic">
                    This is what you charge per package — not per stream.
                  </p>
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                    PACKAGE DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={gig1Description}
                    onChange={(e) => setGig1Description(e.target.value.slice(0, 60))}
                    placeholder="e.g. Great for testing the partnership"
                    maxLength={60}
                    className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-[#1D1D1D]/10">
                  <button className="w-full py-2.5 bg-[#1D1D1D] text-white text-[10px] font-black uppercase tracking-wider italic">
                    SAVE GIG
                  </button>
                </div>
              </div>
            </div>

            {/* GIG 2 */}
            <div className="border-2 border-[#1D1D1D]/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#1D1D1D] italic">
                  GIG 2
                </h3>
                <button
                  onClick={() => setGig2Enabled(!gig2Enabled)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                    gig2Enabled ? 'bg-[#389C9A] justify-end' : 'bg-[#1D1D1D]/20 justify-start'
                  }`}>
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </button>
              </div>

              {gig2Enabled && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                      PACKAGE NAME
                    </label>
                    <input
                      type="text"
                      value={gig2Name}
                      onChange={(e) => setGig2Name(e.target.value)}
                      placeholder="e.g. Silver"
                      className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                      NUMBER OF LIVE STREAMS
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGig2Streams(Math.max(4, gig2Streams - 1))}
                        className="w-10 h-10 border-2 border-[#1D1D1D] flex items-center justify-center text-lg font-black"
                      >
                        −
                      </button>
                      <div className="flex-1 text-center text-2xl font-black italic text-[#1D1D1D]">
                        {gig2Streams}
                      </div>
                      <button
                        onClick={() => setGig2Streams(gig2Streams + 1)}
                        className="w-10 h-10 border-2 border-[#1D1D1D] flex items-center justify-center text-lg font-black"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[8px] text-[#1D1D1D]/50 mt-1 italic">
                      Minimum 4 live streams per package
                    </p>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                      YOUR PRICE (₦)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-black text-[#1D1D1D]">
                        ₦
                      </span>
                      <input
                        type="number"
                        value={gig2Price}
                        onChange={(e) => setGig2Price(e.target.value)}
                        placeholder="Enter your price"
                        className="w-full pl-8 pr-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                      />
                    </div>
                    <p className="text-[8px] text-[#1D1D1D]/50 mt-1 italic">
                      This is what you charge per package — not per stream.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                      PACKAGE DESCRIPTION
                    </label>
                    <input
                      type="text"
                      value={gig2Description}
                      onChange={(e) => setGig2Description(e.target.value.slice(0, 60))}
                      placeholder="e.g. Best value for ongoing campaigns"
                      maxLength={60}
                      className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#1D1D1D]/10">
                    <button className="w-full py-2.5 bg-[#1D1D1D] text-white text-[10px] font-black uppercase tracking-wider italic">
                      SAVE GIG
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* GIG 3 */}
            <div className="border-2 border-[#1D1D1D]/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#1D1D1D] italic">
                  GIG 3
                </h3>
                <button
                  onClick={() => setGig3Enabled(!gig3Enabled)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                    gig3Enabled ? 'bg-[#389C9A] justify-end' : 'bg-[#1D1D1D]/20 justify-start'
                  }`}>
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </button>
              </div>

              {gig3Enabled && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                      PACKAGE NAME
                    </label>
                    <input
                      type="text"
                      value={gig3Name}
                      onChange={(e) => setGig3Name(e.target.value)}
                      placeholder="e.g. Gold"
                      className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                      NUMBER OF LIVE STREAMS
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGig3Streams(Math.max(4, gig3Streams - 1))}
                        className="w-10 h-10 border-2 border-[#1D1D1D] flex items-center justify-center text-lg font-black"
                      >
                        −
                      </button>
                      <div className="flex-1 text-center text-2xl font-black italic text-[#1D1D1D]">
                        {gig3Streams}
                      </div>
                      <button
                        onClick={() => setGig3Streams(gig3Streams + 1)}
                        className="w-10 h-10 border-2 border-[#1D1D1D] flex items-center justify-center text-lg font-black"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[8px] text-[#1D1D1D]/50 mt-1 italic">
                      Minimum 4 live streams per package
                    </p>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                      YOUR PRICE (₦)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-black text-[#1D1D1D]">
                        ₦
                      </span>
                      <input
                        type="number"
                        value={gig3Price}
                        onChange={(e) => setGig3Price(e.target.value)}
                        placeholder="Enter your price"
                        className="w-full pl-8 pr-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                      />
                    </div>
                    <p className="text-[8px] text-[#1D1D1D]/50 mt-1 italic">
                      This is what you charge per package — not per stream.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/70 mb-1 italic">
                      PACKAGE DESCRIPTION
                    </label>
                    <input
                      type="text"
                      value={gig3Description}
                      onChange={(e) => setGig3Description(e.target.value.slice(0, 60))}
                      placeholder="e.g. Premium package for major brands"
                      maxLength={60}
                      className="w-full px-3 py-2 border border-[#1D1D1D]/20 text-sm focus:border-[#389C9A] outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#1D1D1D]/10">
                    <button className="w-full py-2.5 bg-[#1D1D1D] text-white text-[10px] font-black uppercase tracking-wider italic">
                      SAVE GIG
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Note */}
            <div className="border border-[#389C9A]/30 bg-[#389C9A]/5 p-4 flex gap-3">
              <Info className="w-4 h-4 text-[#389C9A] flex-shrink-0 mt-0.5" />
              <p className="text-[9px] text-[#1D1D1D]/70 leading-relaxed">
                Your pricing is reviewed by our team. Prices that do not reflect your viewer tier may be flagged. Minimum price per 4 streams is ₦5,000.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: NOTIFICATIONS */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/50 mb-4 italic">
            NOTIFICATIONS
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-[#1D1D1D]">New campaign requests</span>
              <button
                onClick={() => setNotifCampaigns(!notifCampaigns)}
                className="flex items-center gap-2"
              >
                <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                  notifCampaigns ? 'bg-[#389C9A] justify-end' : 'bg-[#1D1D1D]/20 justify-start'
                }`}>
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-[#1D1D1D]">Messages from businesses</span>
              <button
                onClick={() => setNotifMessages(!notifMessages)}
                className="flex items-center gap-2"
              >
                <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                  notifMessages ? 'bg-[#389C9A] justify-end' : 'bg-[#1D1D1D]/20 justify-start'
                }`}>
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-[#1D1D1D]">Payment and payout alerts</span>
              <button
                onClick={() => setNotifPayments(!notifPayments)}
                className="flex items-center gap-2"
              >
                <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                  notifPayments ? 'bg-[#389C9A] justify-end' : 'bg-[#1D1D1D]/20 justify-start'
                }`}>
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-[#1D1D1D]">Platform announcements</span>
              <button
                onClick={() => setNotifAnnouncements(!notifAnnouncements)}
                className="flex items-center gap-2"
              >
                <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                  notifAnnouncements ? 'bg-[#389C9A] justify-end' : 'bg-[#1D1D1D]/20 justify-start'
                }`}>
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 5: ACCOUNT STATUS */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/50 mb-4 italic">
            ACCOUNT STATUS
          </h2>

          <div className="space-y-6">
            {/* Pause Account */}
            <div>
              <h3 className="text-sm font-black text-[#1D1D1D] mb-2">PAUSE YOUR ACCOUNT</h3>
              <p className="text-[9px] text-[#1D1D1D]/60 mb-3 leading-relaxed">
                Pausing hides your profile from businesses and stops new campaign requests. Active campaigns are not affected.
              </p>
              <button
                onClick={() => setShowPauseModal(true)}
                className="w-full py-2.5 border-2 border-[#D2691E] text-[#D2691E] text-[10px] font-black uppercase tracking-wider italic hover:bg-[#D2691E] hover:text-white transition-colors"
              >
                PAUSE MY ACCOUNT
              </button>
            </div>

            {/* Delete Account */}
            <div>
              <h3 className="text-sm font-black text-[#1D1D1D] mb-2">DELETE ACCOUNT</h3>
              <p className="text-[9px] text-[#1D1D1D]/60 mb-3 leading-relaxed">
                Permanently deletes your account and all associated data. This cannot be undone. Any pending payouts will be processed before deletion.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-2.5 border-2 border-red-600 text-red-600 text-[10px] font-black uppercase tracking-wider italic hover:bg-red-600 hover:text-white transition-colors"
              >
                REQUEST ACCOUNT DELETION
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 6: SUPPORT */}
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/50 mb-4 italic">
            SUPPORT
          </h2>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 border border-[#1D1D1D]/10 hover:border-[#389C9A] transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4.5 h-4.5 text-[#1D1D1D]" />
                <span className="text-sm font-bold text-[#1D1D1D]">Help Centre</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-[#1D1D1D] rotate-180" />
            </button>

            <button className="w-full flex items-center justify-between p-4 border border-[#1D1D1D]/10 hover:border-[#389C9A] transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-4.5 h-4.5 text-[#1D1D1D]" />
                <span className="text-sm font-bold text-[#1D1D1D]">Terms of Service</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-[#1D1D1D] rotate-180" />
            </button>

            <button className="w-full flex items-center justify-between p-4 border border-[#1D1D1D]/10 hover:border-[#389C9A] transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-4.5 h-4.5 text-[#1D1D1D]" />
                <span className="text-sm font-bold text-[#1D1D1D]">Privacy Policy</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-[#1D1D1D] rotate-180" />
            </button>
          </div>
        </div>

        {/* BOTTOM INFO */}
        <div className="text-center space-y-2 pt-6">
          <p className="text-[9px] text-[#1D1D1D]/40">
            LiveLink v1.0.0
          </p>
          <p className="text-[9px] text-[#1D1D1D]/60">
            Logged in as Alex · Not you?{" "}
            <button className="text-[#389C9A] font-bold">
              Log out
            </button>
          </p>
        </div>
      </div>

      {/* PAUSE ACCOUNT MODAL */}
      <AnimatePresence>
        {showPauseModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowPauseModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white p-6 z-50"
            >
              <h3 className="text-lg font-black uppercase tracking-tighter italic text-[#1D1D1D] mb-3">
                Pause Your Account?
              </h3>
              <p className="text-sm text-[#1D1D1D]/70 mb-6 leading-relaxed">
                Your profile will be hidden from businesses. You can reactivate at any time from Settings.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPauseModal(false)}
                  className="w-full py-2.5 bg-[#D2691E] text-white text-[10px] font-black uppercase tracking-wider italic"
                >
                  YES, PAUSE ACCOUNT
                </button>
                <button
                  onClick={() => setShowPauseModal(false)}
                  className="w-full py-2.5 border-2 border-[#1D1D1D] text-[#1D1D1D] text-[10px] font-black uppercase tracking-wider italic"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DELETE ACCOUNT MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white p-6 z-50"
            >
              <h3 className="text-lg font-black uppercase tracking-tighter italic text-[#1D1D1D] mb-3">
                Delete Your Account?
              </h3>
              <p className="text-sm text-[#1D1D1D]/70 mb-6 leading-relaxed">
                This is permanent and cannot be undone. All your data, campaigns and earnings history will be removed. Any pending payouts will be processed within 5 business days.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-2.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider italic"
                >
                  YES, DELETE MY ACCOUNT
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-2.5 border-2 border-[#1D1D1D] text-[#1D1D1D] text-[10px] font-black uppercase tracking-wider italic"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
