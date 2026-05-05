"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, TrendingUp, Users, MessageSquare, Zap, Award, ArrowRight, Globe, Heart, Share2, Eye } from "lucide-react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const step = target / 90;
    const t = setInterval(() =>
      setCount((c) => {
        const n = c + step;
        if (n >= target) {
          clearInterval(t);
          return target;
        }
        return n;
      }),
      16
    );
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {prefix}
      {Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

function MagneticBtn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 20 });
  const sy = useSpring(y, { stiffness: 400, damping: 20 });
  const ref = useRef<HTMLButtonElement>(null);
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.button>
  );
}

const metricCards = [
  { icon: Eye, label: "Subscribers", value: "2.4M", color: "#f97316" },
  { icon: TrendingUp, label: "Monthly Views", value: "18.5M", color: "#ec4899" },
  { icon: Heart, label: "Engagement Rate", value: "8.2%", color: "#f97316" },
  { icon: Globe, label: "Global Reach", value: "145 Countries", color: "#ec4899" },
  { icon: Award, label: "ROI Generated", value: "4.2x", color: "#f97316" },
  { icon: Users, label: "Collaborations", value: "320+", color: "#ec4899" },
];

const platformData = [
  {
    name: "Globe",
    engagement: "7.8%",
    campaigns: ["Feed Posts", "Reels", "Stories", "IGTV"],
    caseStudy: { client: "Fashion Brand XL", results: "340% engagement lift", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1500" }
  },
  {
    name: "TikTok",
    engagement: "9.4%",
    campaigns: ["Trending Challenges", "Duets", "Stitches", "Live Streams"],
    caseStudy: { client: "Beauty Startup", results: "520% brand awareness growth", image: "https://images.unsplash.com/photo-1611087437281-687acc636f8c?auto=format&fit=crop&q=80&w=1500" }
  },
  {
    name: "YouTube",
    engagement: "6.2%",
    campaigns: ["Long Form", "Shorts", "Sponsorships", "Collaborations"],
    caseStudy: { client: "Tech Company", results: "850K subscriber growth", image: "https://images.unsplash.com/photo-1618519266859-3794278e47e3?auto=format&fit=crop&q=80&w=1500" }
  },
  {
    name: "LinkedIn",
    engagement: "5.9%",
    campaigns: ["Thought Leadership", "B2B Partnerships", "Industry Insights"],
    caseStudy: { client: "SaaS Leader", results: "12M impressions/month", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1500" }
  },
  {
    name: "Podcast",
    engagement: "12.1%",
    campaigns: ["Sponsored Episodes", "Guest Appearances", "Ad Reads"],
    caseStudy: { client: "Premium Brand", results: "75K new listeners", image: "https://images.unsplash.com/photo-1624997997946-a1bc658deed3?auto=format&fit=crop&q=80&w=1500" }
  },
  {
    name: "Newsletter",
    engagement: "14.3%",
    campaigns: ["Sponsored Content", "Product Launches", "Exclusive Offers"],
    caseStudy: { client: "Digital Creator", results: "32% conversion rate", image: "https://images.unsplash.com/photo-1614008375890-cb53b6c5f8f5?auto=format&fit=crop&q=80&w=1500" }
  },
];

const creators = [
  { name: "Sophia Chen", niche: "Fashion & Lifestyle", followers: "2.3M", engagement: "8.4%", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=500" },
  { name: "Marcus Johnson", niche: "Tech & Innovation", followers: "1.8M", engagement: "7.2%", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500" },
  { name: "Elena Rodriguez", niche: "Wellness & Beauty", followers: "3.1M", engagement: "9.1%", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=500" },
  { name: "David Park", niche: "Gaming & Esports", followers: "2.7M", engagement: "10.3%", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500" },
  { name: "Isabella Santos", niche: "Food & Travel", followers: "1.5M", engagement: "11.2%", image: "https://images.unsplash.com/photo-1517492712202-14dd9538aa97?auto=format&fit=crop&q=80&w=500" },
  { name: "James Liu", niche: "Fitness & Lifestyle", followers: "2.9M", engagement: "8.7%", image: "https://images.unsplash.com/photo-1506026613408-eca07ce68773?auto=format&fit=crop&q=80&w=500" },
];

const campaigns = [
  { name: "Summer Collection Launch", brand: "Fashion Brand XL", roas: "3.8x", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800" },
  { name: "Product Release Event", brand: "Tech Innovators", roas: "4.2x", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800" },
  { name: "Holiday Campaign", brand: "Luxury Goods Inc", roas: "5.1x", image: "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?auto=format&fit=crop&q=80&w=800" },
  { name: "Wellness Initiative", brand: "Health & Wellness Co", roas: "3.5x", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" },
];

const faqData = [
  { q: "Are creators exclusive to one brand?", a: "No. Our creators maintain their independence while working on your campaigns. Exclusive partnerships are available upon negotiation." },
  { q: "What are typical creator rates?", a: "Rates vary by platform, follower count, and engagement metrics. Entry-level starts at $2K-$5K per post, scaling to $50K+ for top-tier creators." },
  { q: "How are contracts structured?", a: "We offer flexible models: flat fees, revenue-share, or hybrid arrangements. All terms are negotiated and customized to campaign objectives." },
  { q: "Is FTC compliance handled?", a: "Yes. All campaigns include FTC-compliant disclosures (#ad, #sponsored). We audit all content before publication." },
];

export default function LuminartCreativePlatform() {
  const [selectedCreator, setSelectedCreator] = useState<(typeof creators)[0] | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<(typeof campaigns)[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="min-h-screen bg-[#080810] text-white selection:bg-orange-600"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden pt-20">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-pink-600/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.15),transparent_50%)]" />
        </motion.div>

        <Reveal delay={0}>
          <div className="relative z-10 max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30 px-4 py-2 font-mono text-xs">
                INFLUENCER MARKETING PLATFORM
              </Badge>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              LUMINARY
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with authentic creators, amplify your brand, measure every impression with AI-powered insights
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {metricCards.map((metric, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-white/5 border border-orange-600/20 rounded-lg backdrop-blur cursor-pointer hover:border-orange-600/50 transition-all duration-200"
                  >
                    <metric.icon className="w-6 h-6 mx-auto mb-2" style={{ color: metric.color }} />
                    <div className="text-2xl font-black mb-1">{metric.value}</div>
                    <div className="text-xs text-gray-400">{metric.label}</div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <MagneticBtn className="px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 rounded-lg font-black text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-600/50">
              Start Your Campaign
            </MagneticBtn>
          </div>
        </Reveal>
      </section>

      {/* Platform Tabs */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Platform Ecosystem</h2>
            <p className="text-gray-400 max-w-xl">
              Reach audiences across every major social platform with platform-optimized strategies
            </p>
          </div>
        </Reveal>

        <Tabs defaultValue="Globe" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-transparent p-0 h-auto">
            {platformData.map((platform) => (
              <TabsTrigger
                key={platform.name}
                value={platform.name}
                className="px-4 py-3 bg-white/5 border border-orange-600/20 rounded-lg hover:bg-white/10 hover:border-orange-600/50 transition-all duration-200 cursor-pointer data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:border-orange-600"
              >
                <span className="text-sm font-bold">{platform.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {platformData.map((platform) => (
            <TabsContent key={platform.name} value={platform.name} className="mt-8">
              <Reveal>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Badge className="bg-orange-600/20 text-orange-400 mb-3">Avg Engagement</Badge>
                      <div className="text-4xl font-black mb-2">{platform.engagement}</div>
                      <p className="text-gray-400">Higher than industry standard</p>
                    </div>

                    <div>
                      <h4 className="font-black mb-3 text-sm">Campaign Types</h4>
                      <ul className="space-y-2">
                        {platform.campaigns.map((campaign, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <Zap className="w-4 h-4 text-orange-400" />
                            {campaign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="font-black mb-4">Recent Case Study</h4>
                    <div className="bg-white/5 border border-orange-600/20 rounded-lg overflow-hidden cursor-pointer hover:border-orange-600/50 transition-all duration-200">
                      <div className="relative h-64">
                        <Image
                          src={platform.caseStudy.image}
                          alt={platform.caseStudy.client}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      <div className="p-6">
                        <h5 className="font-black mb-2">{platform.caseStudy.client}</h5>
                        <Badge className="bg-green-600/20 text-green-400">{platform.caseStudy.results}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Creator Marketplace */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Creator Marketplace</h2>
            <p className="text-gray-400 max-w-xl">
              Browse and book from our network of 5,000+ verified creators
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCreator(creator)}
                className="bg-white/5 border border-orange-600/20 rounded-lg overflow-hidden cursor-pointer hover:border-orange-600/50 transition-all duration-200"
              >
                <div className="relative h-48">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-black mb-1">{creator.name}</h4>
                  <Badge className="bg-orange-600/20 text-orange-400 mb-3 text-xs">{creator.niche}</Badge>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Followers</span>
                      <span className="font-bold">{creator.followers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Engagement</span>
                      <span className="font-bold text-green-400">{creator.engagement}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 bg-orange-600 text-white rounded font-bold text-xs hover:bg-orange-700 transition-colors duration-200">
                    View Profile
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Dialog open={!!selectedCreator} onOpenChange={() => setSelectedCreator(null)}>
          <DialogContent className="bg-[#080810] border-orange-600/20">
            <DialogHeader>
              <DialogTitle className="text-white">{selectedCreator?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-gray-200">
              <p className="text-sm">{selectedCreator?.niche}</p>
              <p className="text-4xl font-black text-orange-400">{selectedCreator?.followers}</p>
              <p className="text-sm">Followers • {selectedCreator?.engagement} Engagement Rate</p>
              <button className="w-full py-3 bg-orange-600 text-white font-black rounded hover:bg-orange-700 transition-colors duration-200">
                Start Collaboration
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Campaign Carousel */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Recent Campaigns</h2>
            <p className="text-gray-400 max-w-xl">
              Proven results across industries with measurable ROI
            </p>
          </div>
        </Reveal>

        <Carousel className="w-full">
          <CarouselContent>
            {campaigns.map((campaign, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Reveal delay={i * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedCampaign(campaign)}
                    className="bg-white/5 border border-orange-600/20 rounded-lg overflow-hidden cursor-pointer hover:border-orange-600/50 transition-all duration-200"
                  >
                    <div className="relative h-64">
                      <Image
                        src={campaign.image}
                        alt={campaign.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-black mb-2">{campaign.name}</h4>
                      <p className="text-sm text-gray-400 mb-4">{campaign.brand}</p>
                      <Badge className="bg-green-600/20 text-green-400 font-black">
                        {campaign.roas} ROI
                      </Badge>
                    </div>
                  </motion.div>
                </Reveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer border-orange-600/20 hover:border-orange-600/50" />
          <CarouselNext className="cursor-pointer border-orange-600/20 hover:border-orange-600/50" />
        </Carousel>

        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="bg-[#080810] border-orange-600/20">
            <DialogHeader>
              <DialogTitle className="text-white">{selectedCampaign?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-gray-200">
              <p className="text-sm">{selectedCampaign?.brand}</p>
              <p className="text-4xl font-black text-orange-400">{selectedCampaign?.roas}</p>
              <p className="text-sm">Return on Ad Spend</p>
              <button className="w-full py-3 bg-orange-600 text-white font-black rounded hover:bg-orange-700 transition-colors duration-200">
                View Full Report
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Vetting Accordion */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Creator Vetting Process</h2>
            <p className="text-gray-400 max-w-xl">
              All creators undergo comprehensive analysis to ensure authenticity and brand safety
            </p>
          </div>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4 max-w-2xl">
          <AccordionItem value="authenticity" className="bg-white/5 border border-orange-600/20 px-6 rounded cursor-pointer hover:border-orange-600/50 transition-all duration-200">
            <AccordionTrigger className="hover:text-orange-400 transition-colors duration-200 font-black">
              Authenticity Score Analysis
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              We analyze growth patterns, engagement quality, and audience composition using proprietary AI. All followers are verified as real, active accounts with meaningful engagement history.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="audience" className="bg-white/5 border border-orange-600/20 px-6 rounded cursor-pointer hover:border-orange-600/50 transition-all duration-200">
            <AccordionTrigger className="hover:text-orange-400 transition-colors duration-200 font-black">
              Audience Demographic Deep-Dive
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              We review age distribution, geographic location, interests, and engagement patterns. Ensures perfect alignment with your target market and campaign objectives.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="safety" className="bg-white/5 border border-orange-600/20 px-6 rounded cursor-pointer hover:border-orange-600/50 transition-all duration-200">
            <AccordionTrigger className="hover:text-orange-400 transition-colors duration-200 font-black">
              Brand Safety Compliance
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Content moderation scan for brand violations, controversial topics, and audience sentiment. Safety score ensures creators align with your brand values.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contract" className="bg-white/5 border border-orange-600/20 px-6 rounded cursor-pointer hover:border-orange-600/50 transition-all duration-200">
            <AccordionTrigger className="hover:text-orange-400 transition-colors duration-200 font-black">
              Contract & Performance Terms
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Flexible agreements including exclusivity clauses, performance bonuses, and usage rights. Full legal review included in every partnership.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-gradient-to-r from-orange-600/10 to-pink-600/10 rounded-2xl">
        <div className="grid md:grid-cols-4 gap-12">
          {[
            { label: "Active Creators", value: 5000 },
            { label: "Brand Partners", value: 500 },
            { label: "Years Experience", value: 8 },
            { label: "Avg Campaign ROI", value: 4.2, suffix: "x" }
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">
                  <Counter target={stat.value} suffix={stat.suffix || ""} />
                </div>
                <p className="text-gray-400 font-black text-sm">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Frequently Asked Questions</h2>
          </div>
        </Reveal>

        <Accordion type="single" collapsible className="space-y-4 max-w-3xl">
          {faqData.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-white/5 border border-orange-600/20 px-6 rounded cursor-pointer hover:border-orange-600/50 transition-all duration-200">
              <AccordionTrigger className="hover:text-orange-400 transition-colors duration-200 font-bold text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Launch Your Campaign?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get matched with the perfect creators for your brand in minutes
          </p>
          <MagneticBtn className="px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 rounded-lg font-black text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-600/50">
            Schedule Demo Today
          </MagneticBtn>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-600/10 py-12 px-6 md:px-12 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-black mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Creators</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Brands</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">About</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Blog</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Documentation</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">API</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer flex items-center gap-2"><Share2 className="w-4 h-4" /> Globe</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer flex items-center gap-2"><Share2 className="w-4 h-4" /> Globe</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer flex items-center gap-2"><Share2 className="w-4 h-4" /> LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-600/10 pt-8 flex justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 LUMINARY. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Privacy</Link>
              <Link href="#" className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
