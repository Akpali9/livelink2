import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { 
  ChevronLeft, 
  Plus, 
  X, 
  Eye, 
  EyeOff, 
  Upload, 
  CheckCircle2, 
  Instagram, 
  Youtube, 
  Facebook, 
  MessageSquare,
  ArrowRight,
  Info,
  Calendar,
  Mail,
  Smartphone,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import { useForm, useFieldArray } from "react-hook-form";
import { AppHeader } from "../components/app-header";
import { useCreatorRegistration } from "../hooks/useCreatorRegistration";

type CreatorFormData = {
  fullName: string;
  dob: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  city: string;
  platforms: { type: string; username: string; url: string }[];
  frequency: string;
  duration: string;
  days: string[];
  timeOfDay: string;
  avgConcurrent: string;
  avgPeak: string;
  avgWeekly: string;
  categories: string[];
  audienceBio: string;
  referral: string;
};

export function BecomeCreator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  
  const { submitRegistration, loading, error } = useCreatorRegistration();

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<CreatorFormData>({
    defaultValues: {
      platforms: [{ type: "Twitch", username: "", url: "" }],
      days: [],
      categories: []
    },
    mode: "onChange"
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "platforms"
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const dob = watch("dob");
  const fullName = watch("fullName");
  const email = watch("email");
  const mainPlatform = watch("platforms.0.type");

  const getPasswordStrength = () => {
    if (!password) return null;
    if (password.length < 6) return { label: "Weak", color: "text-red-500" };
    if (password.length < 10) return { label: "Fair", color: "text-[#FEDB71]" };
    return { label: "Strong", color: "text-[#389C9A]" };
  };

  const passwordsMatch = password === confirmPassword;

  const isUnder18 = () => {
    if (!dob) return false;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 18;
  };

  const validateStep = () => {
    switch(step) {
      case 1:
        return watch("fullName") && watch("dob") && !isUnder18() && 
               watch("email") && password?.length >= 6 && passwordsMatch &&
               watch("phoneNumber") && watch("country") && watch("city");
      case 2:
        return watch("platforms.0.username") && watch("platforms.0.url");
      case 3:
        return watch("frequency") && watch("duration") && 
               watch("avgConcurrent") && watch("avgPeak") && watch("avgWeekly") &&
               watch("audienceBio");
      case 4:
        return true; // Referral is optional
      case 5:
        return true; // Terms checkbox handled separately
      default:
        return true;
    }
  };

  const onSubmit = async (data: CreatorFormData) => {
    const result = await submitRegistration(data);
    
    if (result.success) {
      // Generate a random application ID for display
      setApplicationId(Math.random().toString(36).substring(2, 10).toUpperCase());
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(s => Math.min(s + 1, 5));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center px-8 text-[#1D1D1D]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-[#1D1D1D] rounded-none flex items-center justify-center mx-auto mb-8 border-2 border-[#FEDB71]">
            <CheckCircle2 className="w-12 h-12 text-[#389C9A]" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Application Submitted!</h1>
          <p className="text-[#1D1D1D]/60 mb-12 italic">
            Thank you for applying to join LiveLink as a creator. Your application ID is <span className="font-bold text-[#389C9A]">{applicationId}</span>. 
            Our team will review your application and get back to you within 48 hours via {email}.
          </p>

          <div className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40 italic">What happens next</h3>
            <div className="relative flex flex-col gap-8 text-left">
              {[
                { step: "01", text: "Our team reviews your application and streaming history" },
                { step: "02", text: "You receive an approval or feedback email within 48 hours" },
                { step: "03", text: "Once approved, you get instant access to your creator dashboard" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="font-black italic text-[#389C9A]">{item.step}</span>
                  <p className="text-sm font-bold uppercase tracking-tight italic">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest mb-4 italic text-[#1D1D1D]/40">While you wait, follow us</p>
          <div className="flex justify-center gap-6 mb-12 text-[#389C9A]">
            <a href="#" className="hover:opacity-70 transition-opacity"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="hover:opacity-70 transition-opacity"><Youtube className="w-6 h-6" /></a>
            <a href="#" className="hover:opacity-70 transition-opacity"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="hover:opacity-70 transition-opacity"><MessageSquare className="w-6 h-6" /></a>
          </div>

          <Link to="/" className="inline-block border-2 border-[#1D1D1D] px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#1D1D1D] hover:text-white transition-all mb-8 italic">
            Back to Home
          </Link>
          <p className="text-[9px] font-medium opacity-40 uppercase tracking-widest">
            Have a question? Contact us at support@livelink.com
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 text-[#1D1D1D]">
      {/* Header */}
      <div className="px-8 pt-12 pb-8 border-b-2 border-[#1D1D1D]">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-6 opacity-40 italic">
          <ChevronLeft className="w-4 h-4 text-[#1D1D1D]" /> Back
        </button>
        <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-tight mb-2">
          Become a Creator on LiveLink
        </h1>
        <p className="text-[#1D1D1D]/60 text-sm font-medium mb-6 italic">
          Join hundreds of live creators already earning through their streams. Fill in your details below and our team will review your application within 48 hours.
        </p>
        <div className="bg-[#FEDB71]/10 border border-[#FEDB71] p-4 flex gap-3">
          <Info className="w-5 h-5 flex-shrink-0 text-[#389C9A]" />
          <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
            All creator accounts are manually reviewed and approved by our team. Incomplete applications will not be reviewed.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-8 py-6 bg-[#F8F8F8] border-b border-[#1D1D1D]/10 sticky top-[84px] z-30 flex justify-between items-center overflow-x-auto whitespace-nowrap gap-4 scrollbar-hide">
        {[1, 2, 3, 4, 5].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 flex items-center justify-center text-[10px] font-black transition-all rounded-none border-2 ${step === s ? 'bg-[#1D1D1D] text-white border-[#1D1D1D]' : step > s ? 'bg-[#389C9A] text-white border-[#389C9A]' : 'bg-white text-[#1D1D1D]/30 border-[#1D1D1D]/10'}`}>
              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
            {step === s && (
              <span className="text-[10px] font-black uppercase tracking-widest italic">
                {s === 1 ? "Personal" : s === 2 ? "Presence" : s === 3 ? "Activity" : s === 4 ? "Proof" : "Final"}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-8 mt-4">
          <div className="bg-red-50 border border-red-200 p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">
              {error}
            </p>
          </div>
        </div>
      )}

      <div className="px-8 mt-12 max-w-[600px] mx-auto w-full flex-1">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-12">
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight italic mb-2">About You</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-8 italic">This information is kept private and is only used for verification purposes.</p>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest italic text-[#1D1D1D]/40">Full Legal Name *</label>
                  <input 
                    {...register("fullName", { required: true })}
                    placeholder="As it appears on your ID"
                    className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-5 text-sm font-bold uppercase tracking-tight outline-none focus:border-[#1D1D1D] transition-all rounded-none italic"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest italic text-[#1D1D1D]/40">Date of Birth *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 text-[#389C9A]" />
                    <input 
                      type="date"
                      {...register("dob", { required: true })}
                      className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-5 pl-12 text-sm font-bold uppercase tracking-tight outline-none focus:border-[#1D1D1D] transition-all rounded-none"
                    />
                  </div>
                  {isUnder18() && (
                    <p className="text-[9px] font-black uppercase text-red-500 mt-1">You must be 18 or over to join LiveLink as a creator.</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest italic text-[#1D1D1D]/40">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 text-[#389C9A]" />
                    <input 
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="This will be your login email"
                      className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-5 pl-12 text-sm font-bold uppercase tracking-tight outline-none focus:border-[#1D1D1D] transition-all rounded-none italic"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest italic text-[#1D1D1D]/40">Create Password *</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        {...register("password", { required: true, minLength: 6 })}
                        className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-5 text-sm font-bold uppercase tracking-tight outline-none focus:border-[#1D1D1D] transition-all rounded-none"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 opacity-30" /> : <Eye className="w-4 h-4 opacity-30" />}
                      </button>
                    </div>
                    {getPasswordStrength() && (
                      <p className={`text-[9px] font-black uppercase mt-1 ${getPasswordStrength()?.color}`}>
                        Strength: {getPasswordStrength()?.label}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest italic text-[#1D1D1D]/40">Confirm Password *</label>
                    <input 
                      type="password"
                      {...register("confirmPassword", { required: true })}
                      className={`w-full bg-[#F8F8F8] border p-5 text-sm font-bold uppercase tracking-tight outline-none focus:border-[#1D1D1D] transition-all rounded-none ${
                        confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-[#1D1D1D]/10'
                      }`}
                    />
                    {confirmPassword && !passwordsMatch && (
                      <p className="text-[9px] font-black uppercase text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest italic text-[#1D1D1D]/40">Phone Number *</label>
                  <div className="relative flex">
                    <select 
                      {...register("phoneNumber")}
                      className="bg-white border border-[#1D1D1D]/10 p-5 text-xs font-black uppercase tracking-tight outline-none border-r-0 rounded-none"
                    >
                      <option value="+44">+44</option>
                      <option value="+1">+1</option>
                      <option value="+33">+33</option>
                      <option value="+49">+49</option>
                    </select>
                    <div className="relative flex-1">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 text-[#389C9A]" />
                      <input 
                        type="tel"
                        {...register("phoneNumber", { required: true })}
                        className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-5 pl-12 text-sm font-bold uppercase tracking-tight outline-none focus:border-[#1D1D1D] transition-all rounded-none"
                      />
                    </div>
                  </div>
                  <p className="text-[9px] font-medium opacity-40 mt-1 italic">Used for account security and important notifications only.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest italic text-[#1D1D1D]/40">Country *</label>
                    <select 
                      {...register("country", { required: true })}
                      className="w-full bg-white border border-[#1D1D1D]/10 p-5 text-xs font-black uppercase tracking-tight outline-none rounded-none"
                    >
                      <option value="">Select Country</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest italic text-[#1D1D1D]/40">City *</label>
                    <input 
                      {...register("city", { required: true })}
                      className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-5 text-sm font-bold uppercase tracking-tight outline-none focus:border-[#1D1D1D] transition-all rounded-none italic"
                    />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Steps 2-4 remain the same as your original code */}
        {/* ... */}

        {step === 5 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-12">
            <section>
              <h2 className="text-2xl font-black uppercase tracking-tight italic mb-2">Final Review</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-8 italic">Please confirm your details are correct before submitting.</p>
              
              <div className="bg-[#F8F8F8] border-2 border-[#1D1D1D] p-8 rounded-none flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-[#1D1D1D]/10 pb-4 italic">
                  <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Name</span>
                  <span className="text-[10px] font-black uppercase">{fullName || "Not entered"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1D1D1D]/10 pb-4 italic">
                  <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Email</span>
                  <span className="text-[10px] font-black uppercase">{email || "Not entered"}</span>
                </div>
                <div className="flex justify-between items-center italic">
                  <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Main Platform</span>
                  <span className="text-[10px] font-black uppercase">{mainPlatform || "Not entered"}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" required className="peer hidden" />
                  <div className="mt-1 w-5 h-5 border-2 border-[#1D1D1D] flex items-center justify-center bg-white peer-checked:bg-[#389C9A] peer-checked:border-[#389C9A] transition-all rounded-none">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-bold leading-tight opacity-60 italic uppercase tracking-tight">
                    I agree to LiveLink's Terms of Service and Privacy Policy. I confirm that all information provided is accurate and my own.
                  </span>
                </label>
              </div>
            </section>
          </motion.div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t-2 border-[#1D1D1D] z-50 max-w-[480px] mx-auto">
        <div className="flex gap-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              disabled={loading}
              className="px-6 py-5 border-2 border-[#1D1D1D] text-[#1D1D1D] font-black uppercase tracking-widest text-[10px] hover:bg-[#F8F8F8] transition-all rounded-none italic disabled:opacity-50"
            >
              Back
            </button>
          )}
          <button 
            onClick={step === 5 ? handleSubmit(onSubmit) : nextStep}
            disabled={!validateStep() || loading}
            className={`flex-1 flex items-center justify-between p-6 font-black uppercase tracking-tight transition-all rounded-none italic ${
              validateStep() && !loading
                ? 'bg-[#1D1D1D] text-white active:scale-[0.98]' 
                : 'bg-[#1D1D1D]/30 text-white/50 cursor-not-allowed'
            }`}
          >
            <span>{loading ? 'Submitting...' : (step === 5 ? 'Submit Application' : 'Continue')}</span>
            {!loading && <ArrowRight className="w-5 h-5 text-[#FEDB71]" />}
          </button>
        </div>
        
        {/* Validation messages */}
        {!validateStep() && step < 5 && (
          <p className="text-[9px] font-black uppercase text-red-500 mt-3 text-center">
            Please fill in all required fields before continuing
          </p>
        )}
      </div>
    </div>
  );
}
