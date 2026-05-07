"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView, 
  useSpring 
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Shield, Zap, Radio, Activity, 
  Terminal, Lock, Eye, Crosshair,
  Settings, Power, Info, AlertTriangle,
  ChevronRight, ArrowRight, Share2,
  Maximize2, Download, ExternalLink,
  Archive, Hash, Wifi, BarChart3,
  Microscope, Fingerprint, Scan, Brain,
  Server, Database, Cpu, Network,
  Bug, Search, ShieldAlert, ShieldCheck,
  Key, Globe, Code
} from "lucide-react"

/* ==========================================================================
   AEGIS SHIELD - THREAT INTELLIGENCE DATA (ULTRA DENSITY)
   ========================================================================== */

const ATTACK_VECTORS = [
  {
    id: "v-01",
    name: "Zero-Day Exploitation",
    risk: "CRITICAL",
    desc: "Identification et neutralisation des vulnérabilités non documentées avant leur exploitation par des acteurs étatiques.",
    stats: { detection: "0.4s", neutralization: "12s" }
  },
  {
    id: "v-02",
    name: "Neural Phishing",
    risk: "HIGH",
    desc: "Simulation d'attaques d'ingénierie sociale basées sur l'IA pour tester la résilience psychologique des équipes.",
    stats: { detection: "2.1s", neutralization: "45s" }
  },
  {
    id: "v-03",
    name: "Quantum Decryption",
    risk: "EMERGING",
    desc: "Audit des protocoles post-quantiques face aux nouvelles capacités de déchiffrement à haute vitesse.",
    stats: { detection: "5.8s", neutralization: "140s" }
  }
]

const SYSTEM_STATS = [
  { label: "Packets Scanned", value: "14.2B", suffix: "/sec" },
  { label: "Threats Blocked", value: "402K", suffix: "/hr" },
  { label: "Sync Index", value: "99.99", suffix: "%" },
  { label: "Active Nodes", value: "1,204", suffix: "" }
]

const LOG_ENTRIES = [
  "[14:08:22] INTRUSION_DETECTED: NODE_742",
  "[14:08:24] FIREWALL_ADAPT: INITIALIZING...",
  "[14:08:26] THREAT_NEUTRALIZED: AES-256_SHIELD_ACTIVE",
  "[14:08:30] STATUS: ALL_SYSTEMS_NOMINAL"
]

/* ==========================================================================
   TECHNICAL HUD COMPONENTS
   ========================================================================== */

function Reveal({ children, delay = 0, y = 40, x = 0 }: { children: React.ReactNode, delay?: number, y?: number, x?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function GlitchText({ text }: { text: string }) {
  return (
    <motion.span
      animate={{ 
        opacity: [1, 0.5, 1, 0.8, 1],
        x: [0, -2, 2, -1, 0]
      }}
      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
    >
      {text}
    </motion.span>
  )
}

function ScanningBar() {
  return (
    <motion.div
      animate={{ y: ["0%", "100%", "0%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 right-0 h-[1px] bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.5)] z-20 pointer-events-none"
    />
  )
}

/* ==========================================================================
   THE AEGIS SHIELD - MAIN INTERFACE
   ========================================================================== */

export default function AegisShieldPremium() {
  const [activeLog, setActiveLog] = useState(0)
  const [handshakeStatus, setHandshakeStatus] = useState("PENDING")
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // HUD Parallax
  const hudY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLog(prev => (prev + 1) % LOG_ENTRIES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#e0e0e0] font-mono selection:bg-red-500/30 selection:text-white min-h-screen overflow-x-hidden">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay activeLog={activeLog} />

      {/* ==========================================
          1. SYSTEM INITIALIZATION (HERO)
          ========================================== */}
      <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
        <ScanningBar />
        
        {/* Background Grid & Particles */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0 flex items-center justify-center">
           <div className="w-[70vw] h-[70vw] border border-white/5 rounded-full animate-spin-slow opacity-20" />
           <div className="absolute w-[50vw] h-[50vw] border border-white/5 rounded-full animate-reverse-spin opacity-10" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ShieldAlert className="w-[20vw] h-[20vw] text-red-500/5" />
           </div>
        </motion.div>

        <div className="relative z-10 text-center max-w-7xl">
           <Reveal>
              <div className="inline-flex items-center gap-4 px-4 py-1 border border-red-500/30 bg-red-500/5 text-[10px] font-bold uppercase tracking-[0.5em] text-red-500 mb-12">
                 <ShieldCheck className="w-3 h-3" /> Firewall_Level: Maximum // AES-256_ACTIVE
              </div>
              <h1 className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                Aegis <br/> <span className="text-white/5 italic">Shield.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                 Intelligence offensive et cyber-défense souveraine. Nous protégeons les infrastructures critiques là où la guerre numérique ne connaît pas de trêve.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                 <button className="px-12 py-5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(220,38,38,0.3)] flex items-center gap-4">
                    <Power className="w-4 h-4" /> Initialize Shield
                 </button>
                 <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4">
                    <Search className="w-4 h-4" /> Threat Database
                 </button>
              </div>
           </Reveal>
        </div>

        {/* BOTTOM HUD DATA */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8">
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                 <div className="w-12 h-px bg-white/10" />
                 Secure_Channel: ENCR_TLS_v1.3
              </div>
              <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                 <div className="w-12 h-px bg-white/10" />
                 Global_Nodes: 4,092_SYNCED
              </div>
           </div>
           <div className="text-right flex flex-col items-end gap-2">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-red-500">Live_Network_Packet_Visualizer</span>
              <div className="flex gap-2 h-10 items-end">
                 {[...Array(16)].map((_, i) => (
                   <motion.div 
                    key={i}
                    animate={{ height: ["20%", "100%", "40%", "90%", "20%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.05 }}
                    className="w-1.5 bg-red-500/20"
                   />
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ==========================================
          2. THREAT MATRIX (INTERACTIVE DENSITY)
          ========================================== */}
      <section className="py-60 bg-[#080808] relative border-y border-white/5 overflow-hidden">
         <div className="max-w-[1600px] mx-auto px-8 md:px-24">
            <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
               <Reveal>
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-red-500 block mb-6 italic underline underline-offset-8">Offensive // Vectors</span>
                  <h2 className="text-6xl md:text-[9vw] font-black uppercase tracking-tighter italic leading-none">Matrix.</h2>
               </Reveal>
               <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Attack_Vectors</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">L'Architecture de la Menace</p>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
               {ATTACK_VECTORS.map((vector, i) => (
                 <Reveal key={vector.id} delay={i * 0.1}>
                    <div className="bg-[#050505] p-16 flex flex-col h-full hover:bg-white/5 transition-all group cursor-crosshair">
                       <div className="flex justify-between items-start mb-16">
                          <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all">
                             <Bug className="w-6 h-6 text-red-500 group-hover:text-white" />
                          </div>
                          <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[8px] font-black uppercase tracking-widest">{vector.risk}</span>
                       </div>
                       
                       <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">{vector.name}</h3>
                       <p className="text-sm font-light text-white/30 leading-relaxed uppercase tracking-widest italic mb-12">
                          {vector.desc}
                       </p>

                       <div className="space-y-6 mb-16 border-l border-white/10 pl-6">
                          {Object.entries(vector.stats).map(([key, val]) => (
                            <div key={key} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">{key}</span>
                               <span className="text-white group-hover:text-red-500 transition-colors">{val}</span>
                            </div>
                          ))}
                       </div>

                       <div className="mt-auto flex justify-between items-center pt-8 border-t border-white/5">
                          <div className="flex items-center gap-3">
                             <Fingerprint className="w-4 h-4 text-white/20" />
                             <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Audit_Ref: {vector.id}</span>
                          </div>
                          <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-red-500 group-hover:translate-x-2 transition-all" />
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* ==========================================
          3. SECURE HANDSHAKE (SIMULATED PORTAL)
          ========================================== */}
      <section className="py-60 bg-black relative overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-8 md:px-24">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <div>
                  <Reveal>
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500 block mb-12 italic underline underline-offset-8">Access // Secure_Vault</span>
                     <h2 className="text-6xl md:text-[8vw] font-light italic leading-none text-white mb-12 uppercase tracking-tighter">
                        The <br/> <span className="not-italic font-black text-white/5 italic">Encrypted_Hub.</span>
                     </h2>
                     <p className="text-xl font-light text-white/20 leading-relaxed mb-20 italic uppercase tracking-widest">
                        Un portail d'accès chiffré pour nos clients gouvernementaux et industriels. Gérez vos incidents et consultez vos audits de vulnérabilité en toute sécurité.
                     </p>
                     <div className="grid grid-cols-2 gap-8 mb-20">
                        {SYSTEM_STATS.map((stat, i) => (
                          <div key={i} className="p-10 bg-[#080808] border border-white/5 group hover:border-red-600/30 transition-all">
                             <div className="text-[9px] font-black uppercase text-red-500 mb-4 tracking-[0.3em]">{stat.label}</div>
                             <div className="text-4xl font-light text-white italic">{stat.value}<span className="text-[12px] opacity-20 not-italic ml-2">{stat.suffix}</span></div>
                          </div>
                        ))}
                     </div>
                     <button 
                      onClick={() => setHandshakeStatus("LOADING")}
                      className="w-full py-6 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4"
                     >
                        <Key className="w-4 h-4" /> Start Handshake Protocol
                     </button>
                  </Reveal>
               </div>
               
               <div className="relative">
                  <Reveal delay={0.3} x={40}>
                     <div className="aspect-square bg-[#080808] border border-white/10 p-16 flex flex-col justify-between relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-60 bg-red-600 opacity-[0.03] blur-[120px] rounded-full group-hover:opacity-[0.1] transition-opacity" />
                        
                        <div className="flex justify-between items-start z-10">
                           <div className="flex flex-col gap-2">
                              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Protocol // SECURE-HANDSHAKE-V2</span>
                              <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Vault_Encryption_Key_Gen</span>
                           </div>
                           <Wifi className="w-5 h-5 text-red-500" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center gap-12">
                           <div className="w-32 h-32 border-2 border-dashed border-red-500/20 rounded-full flex items-center justify-center relative">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-red-600 rounded-full" 
                              />
                              <Lock className="w-12 h-12 text-red-600" />
                           </div>
                           <div className="text-center space-y-4">
                              <div className={`text-4xl font-black italic tracking-tighter ${handshakeStatus === "LOADING" ? "text-red-500 animate-pulse" : "text-white/20"}`}>
                                 {handshakeStatus === "LOADING" ? "ENCRYPTING..." : "STANDBY"}
                              </div>
                              <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">Auth_Node: ZURICH_CENTRAL</span>
                           </div>
                        </div>

                        <div className="relative z-10 flex gap-4">
                           <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                              <motion.div 
                                animate={handshakeStatus === "LOADING" ? { x: ["-100%", "100%"] } : {}}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-1/2 h-full bg-red-600"
                              />
                           </div>
                        </div>
                     </div>
                  </Reveal>
               </div>
            </div>
         </div>
      </section>

      {/* ==========================================
          4. INCIDENT RESPONSE (WORKFLOW DENSITY)
          ========================================== */}
      <section className="py-60 bg-[#050505] relative border-y border-white/5">
         <div className="max-w-[1400px] mx-auto px-8 md:px-24">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <div className="relative aspect-[4/5] overflow-hidden group border border-white/10">
                  <Image 
                     src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200&auto=format&fit=crop" 
                     alt="Server Room Glow" 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-red-900/40 mix-blend-color group-hover:opacity-0 transition-opacity" />
                  <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                     <div className="text-white">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-red-500 mb-6 block italic underline underline-offset-8">Critical // Response // Unit</span>
                        <h4 className="text-5xl font-black tracking-tighter uppercase italic mb-8">System <br/> Breach Control.</h4>
                        <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-b border-red-500 pb-2">
                           Incident Protocols <ExternalLink className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>

               <div>
                  <Reveal>
                     <SectionTitle subtitle="Chapitre III // Response" title="Rapid_Neutralize." alignment="left" />
                     <p className="text-xl font-light text-white/30 leading-relaxed italic mb-16 uppercase tracking-widest">
                        Chaque seconde compte lors d'une intrusion. Nos protocoles de réponse automatique neutralisent les menaces en moins de 400ms, isolant instantanément les segments infectés.
                     </p>
                     <div className="space-y-16">
                        {[
                          { t: "Automated Isolation", d: "Segmentation instantanée du réseau dès la détection d'une anomalie comportementale non autorisée." },
                          { t: "Forensic Analysis", d: "Collecte de preuves chiffrées pour traçabilité judiciaire et analyse post-mortem de l'attaque." },
                          { t: "Adaptive Firewalling", d: "Mise à jour en temps réel des règles de filtrage sur l'ensemble de la flotte de nœuds mondiaux." }
                        ].map((step, i) => (
                          <div key={i} className="group flex gap-12 border-b border-white/5 pb-12 hover:border-red-600/30 transition-all">
                             <div className="text-5xl font-black text-white/5 group-hover:text-red-500/20 transition-colors italic">0{i+1}</div>
                             <div>
                                <h5 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 italic group-hover:text-red-500 transition-colors">{step.t}</h5>
                                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold leading-relaxed">{step.d}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </Reveal>
               </div>
            </div>
         </div>
      </section>

      {/* MEGA FOOTER */}
      <footer className="bg-black pt-60 pb-12 px-8 md:px-24 relative z-50">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-32 mb-60 text-white">
            <div className="lg:col-span-2">
               <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-red-600 flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-black uppercase tracking-tighter italic">AEGIS<span className="text-red-600">_SHIELD.</span></span>
               </div>
               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm mb-16 italic">
                  "La sécurité n'est pas un produit, c'est un processus d'adaptation permanent face à l'adversité." — Archive Aegis V.4
               </p>
               <div className="flex gap-12">
                  {["SecurityLog", "BugBounty", "GitHub", "X_Protocol"].map(s => (
                    <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-red-500 transition-colors italic">{s}</Link>
                  ))}
               </div>
            </div>

            {[
              { t: "OFFENSIVE", l: ["Red Teaming", "Zero-Day Research", "Neural Phishing", "Exploit Dev"] },
              { t: "DEFENSIVE", l: ["SOC v4", "Adaptive Firewall", "Vault Registry", "DDoS Shield"] },
              { t: "NODES", l: ["Zurich Central", "Singapore Hub", "Tokyo Node", "US-East Gate"] }
            ].map((col, i) => (
              <div key={i} className="flex flex-col gap-12">
                <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em] italic">{col.t}</h4>
                <ul className="flex flex-col gap-6">
                  {col.l.map(link => (
                    <li key={link} className="text-[10px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-widest italic">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
         </div>

         <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-12 text-[8px] font-black text-white/10 uppercase tracking-[0.4em] italic">
            <span>© 2026 AEGIS OFFENSIVE CYBER-DEFENSE GROUP. // ALL_RIGHTS_RESERVED</span>
            <div className="flex gap-12">
               <span>STATUS: ALL_SYSTEMS_OPTIMAL</span>
               <span>THREAT_LEVEL: ELEVATED</span>
               <span>v4.2.0-STABLE</span>
            </div>
         </div>
      </footer>
    </div>
  )
}

/* ==========================================
   TECHNICAL SUB-COMPONENTS
   ========================================== */

function HUD_Overlay({ activeLog }: { activeLog: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-white/10" />
       <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-white/10" />
       <div className="absolute bottom-12 left-12 w-16 h-16 border-b border-l border-white/10" />
       <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-white/10" />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-16 bg-black/40 backdrop-blur-md px-10 py-3 border border-white/5 rounded-full">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Offensive_Mode: Active</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
             <Wifi className="w-3 h-3" /> Link: Secure
          </div>
       </div>

       {/* Left Live Logs */}
       <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 hidden lg:flex">
          {LOG_ENTRIES.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: i === activeLog ? 1 : 0.15, x: i === activeLog ? 0 : -10 }}
              className={`text-[8px] font-mono font-bold ${i === activeLog ? "text-red-500" : "text-white"}`}
            >
              {log}
            </motion.div>
          ))}
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white/5 italic">Unauthorized_Access_Will_Be_Traced_And_Neutralized_By_Aegis_Offensive_Protocols</span>
       </div>
    </div>
  )
}