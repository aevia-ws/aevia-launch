"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { MagneticButton } from "./AnimationHelpers";
import { Mail, Globe, Phone } from "lucide-react";

interface ThemeWrapperProps {
  session: SessionData;
  children: React.ReactNode;
  navStyle?: "default" | "transparent" | "luxury" | "minimal";
  footerStyle?: "default" | "dark" | "luxury";
  dark?: boolean;
}

export function ThemeWrapper({
  session,
  children,
  navStyle = "default",
  footerStyle = "default",
  dark = false,
}: ThemeWrapperProps) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";

  const bgMain = dark ? "#0a0a0a" : "#fff";
  const textPrimary = dark ? "#fff" : "#111";
  const textSecondary = dark ? "rgba(255,255,255,0.6)" : "#6b7280";
  const borderColor = dark ? "rgba(255,255,255,0.1)" : "#e5e7eb";

  return (
    <div style={{ backgroundColor: bgMain, color: textPrimary, minHeight: "100vh" }}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 backdrop-blur-xl border-b ${dark ? 'bg-black/80' : 'bg-white/80'}`} style={{ borderColor }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            {formData.logoBase64 ? (
              <img src={formData.logoBase64} alt={formData.businessName} className="h-8 object-contain" />
            ) : (
              formData.businessName
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <MagneticButton
              href="#contact"
              style={{ background: brand, color: "#fff" }}
              className="px-6 py-2 rounded-full text-sm font-bold shadow-lg"
            >
              {c?.ctaText || "Contact"}
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className={`py-20 px-6 border-t ${dark ? 'bg-[#050505]' : 'bg-gray-50'}`} style={{ borderColor }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-6">{formData.businessName}</div>
            <p className="text-lg max-w-sm" style={{ color: textSecondary }}>
              {c?.heroSubline}
            </p>
          </div>
          
          <div>
            <div className="font-bold mb-6 uppercase text-xs tracking-widest">Contact</div>
            <div className="flex flex-col gap-4 text-sm" style={{ color: textSecondary }}>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {formData.email}</div>
              {formData.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {formData.phone}</div>}
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {formData.city}</div>
            </div>
          </div>
          
          <div>
            <div className="font-bold mb-6 uppercase text-xs tracking-widest">Follow Us</div>
            <div className="flex gap-4">
              {formData.instagram && <Globe className="w-5 h-5 cursor-pointer hover:opacity-70" />}
              {formData.linkedin && <Globe className="w-5 h-5 cursor-pointer hover:opacity-70" />}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t text-[10px] uppercase tracking-widest opacity-30 flex justify-between" style={{ borderColor }}>
          <span>© 2026 {formData.businessName}</span>
          <span>Powered by AeviaLaunch</span>
        </div>
      </footer>
    </div>
  );
}

function MapPin(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
