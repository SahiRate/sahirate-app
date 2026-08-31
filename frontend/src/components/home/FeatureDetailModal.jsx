import {
  X,
  CheckCircle2,
  BarChart3,
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  Heart,
  Lightbulb,
  Handshake,
  Search,
  ShoppingCart,
} from "lucide-react";

const iconMap = {
  prices: BarChart3,
  ai: BrainCircuit,
  trends: TrendingUp,
  network: ShieldCheck,

  howSearch: Search,
  howCompare: BarChart3,
  howAI: BrainCircuit,
  howBuy: ShoppingCart,
};

const details = {
  prices: {
    title: "Transparent Market Prices",
    headline: (
      <>
        à¤–à¤°à¥€à¤¦à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¸à¤¹à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€,
        <br />
        <span className="text-[#FF6B00]">
          à¤¤à¤­à¥€ à¤¹à¤° à¤–à¤°à¥à¤š à¤¹à¥‹à¤—à¤¾ à¤¸à¤®à¤à¤¦à¤¾à¤°à¥€ à¤­à¤°à¤¾à¥¤
        </span>
      </>
    ),
    description: (
      <>
        <BrandName /> à¤†à¤ªà¤•à¥‹ à¤†à¤ªà¤•à¥‡ à¤¶à¤¹à¤° à¤•à¥‡ à¤…à¤¸à¤²à¥€ à¤”à¤° à¤²à¥‡à¤Ÿà¥‡à¤¸à¥à¤Ÿ à¤®à¤¾à¤°à¥à¤•à¥‡à¤Ÿ à¤°à¥‡à¤Ÿ à¤¦à¤¿à¤–à¤¾à¤¤à¤¾ à¤¹à¥ˆ,
        à¤¤à¤¾à¤•à¤¿ à¤†à¤ª à¤¬à¤¿à¤¨à¤¾ à¤…à¤‚à¤¦à¤¾à¤œà¤¼à¥‡ à¤•à¥‡, à¤¸à¤¹à¥€ à¤¦à¤¾à¤® à¤ªà¤° à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¤° à¤¸à¤•à¥‡à¤‚à¥¤
      </>
    ),
    pointsTitle: (
      <>
        <BrandName /> à¤†à¤ªà¤•à¥‡ à¤¸à¤¾à¤¥
      </>
    ),
    points: [
      "à¤†à¤œ à¤•à¤¾ à¤¸à¤¹à¥€ à¤¬à¤¾à¤œà¤¼à¤¾à¤° à¤­à¤¾à¤µ à¤†à¤¸à¤¾à¤¨à¥€ à¤¸à¥‡ à¤œà¤¾à¤¨à¥‡à¤‚à¥¤",
      "à¤…à¤²à¤—-à¤…à¤²à¤— à¤¦à¥à¤•à¤¾à¤¨à¤¦à¤¾à¤°à¥‹à¤‚ à¤•à¥‡ à¤°à¥‡à¤Ÿ à¤•à¥€ à¤¤à¥à¤²à¤¨à¤¾ à¤•à¤°à¥‡à¤‚à¥¤",
      "à¤•à¤¹à¥€à¤‚ à¤†à¤ªà¤¸à¥‡ à¤œà¤¼à¥à¤¯à¤¾à¤¦à¤¾ à¤ªà¥ˆà¤¸à¥‡ à¤¤à¥‹ à¤¨à¤¹à¥€à¤‚ à¤²à¤¿à¤ à¤œà¤¾ à¤°à¤¹à¥‡, à¤¯à¤¹ à¤ªà¤¹à¤šà¤¾à¤¨à¥‡à¤‚à¥¤",
      "à¤¬à¤¡à¤¼à¥€ à¤®à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‡à¤‚ à¤–à¤°à¥€à¤¦à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¬à¥‡à¤¹à¤¤à¤° à¤°à¥‡à¤Ÿ à¤¤à¤¯ à¤•à¤°à¥‡à¤‚à¥¤",
    ],
    footerIcon: Heart,
    footerText: "à¤†à¤ªà¤•à¤¾ à¤­à¤°à¥‹à¤¸à¤¾, à¤¹à¤®à¤¾à¤°à¥€ à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ — à¤¹à¤° à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤¬à¤¨à¥‡ à¤«à¤¾à¤¯à¤¦à¥‡ à¤•à¤¾ à¤¸à¥Œà¤¦à¤¾à¥¤",
  },

  ai: {
    title: "Powered by SahiAI",
    headline: (
      <>
        à¤¬à¤¾à¤œà¤¼à¤¾à¤° à¤•à¥‹ à¤¸à¤®à¤à¤¨à¤¾ à¤…à¤¬ à¤¹à¥à¤† à¤†à¤¸à¤¾à¤¨,
        <br />
        à¤•à¥à¤¯à¥‹à¤‚à¤•à¤¿ à¤†à¤ªà¤•à¥‡ à¤¸à¤¾à¤¥ à¤¹à¥ˆ{" "}
        <span className="text-[#FF6B00]">SahiAI</span>
      </>
    ),
    description: (
      <>
        <span className="font-semibold text-slate-900">SahiAI</span> à¤¬à¤¾à¤œà¤¼à¤¾à¤° à¤•à¥‡
        à¤¡à¥‡à¤Ÿà¤¾ à¤”à¤° à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‹ à¤¸à¤®à¤à¤•à¤° à¤†à¤ªà¤•à¥‹ à¤¸à¤¹à¥€ à¤¸à¤®à¤¯ à¤ªà¤° à¤¸à¤¹à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¦à¥‡à¤¨à¥‡ à¤®à¥‡à¤‚ à¤®à¤¦à¤¦ à¤•à¤°à¤¤à¤¾
        à¤¹à¥ˆà¥¤
      </>
    ),
    pointsTitle: (
      <>
        <span className="font-semibold text-[#0A2342]">SahiAI</span> à¤†à¤ªà¤•à¥‡ à¤¸à¤¾à¤¥
      </>
    ),
    points: [
      "à¤°à¥‡à¤Ÿ à¤•à¤¬ à¤¬à¤¢à¤¼ à¤°à¤¹à¤¾ à¤¹à¥ˆ à¤”à¤° à¤•à¤¬ à¤•à¤®, à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤¸à¤®à¤à¥‡à¤‚à¥¤",
      "à¤¬à¤¾à¤œà¤¼à¤¾à¤° à¤•à¥‡ à¤¸à¤‚à¤•à¥‡à¤¤ à¤”à¤° à¤œà¤¼à¤°à¥‚à¤°à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¸à¤¹à¥€ à¤¸à¤®à¤¯ à¤ªà¤° à¤ªà¤¾à¤à¤‚à¥¤",
      "à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¥‡ à¤¸à¤¹à¥€ à¤¸à¤®à¤¯ à¤•à¥€ à¤ªà¤¹à¤šà¤¾à¤¨ à¤•à¤°à¥‡à¤‚à¥¤",
      "à¤®à¥à¤¶à¥à¤•à¤¿à¤² à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‹ à¤†à¤¸à¤¾à¤¨ à¤”à¤° à¤¸à¤¾à¤« à¤¤à¤°à¥€à¤•à¥‡ à¤¸à¥‡ à¤¸à¤®à¤à¥‡à¤‚à¥¤",
    ],
    footerIcon: Lightbulb,
    footerText: "à¤¸à¤¹à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€, à¤¸à¤¹à¥€ à¤¸à¤®à¤¯ — à¤¸à¤®à¤à¤¦à¤¾à¤°à¥€ à¤¸à¥‡ à¤‰à¤ à¤¾à¤¯à¤¾ à¤¹à¤° à¤•à¤¦à¤®à¥¤",
  },

  trends: {
    title: "Price Trends & Analytics",
    headline: (
      <>
        à¤¸à¤¿à¤°à¥à¤« à¤†à¤œ à¤•à¤¾ à¤°à¥‡à¤Ÿ à¤¨à¤¹à¥€à¤‚,
        <br />
        <span className="text-[#FF6B00]">
          à¤•à¤² à¤•à¤¾ à¤…à¤‚à¤¦à¤¾à¤œà¤¼à¤¾ à¤­à¥€ à¤œà¤¼à¤°à¥‚à¤°à¥€à¥¤
        </span>
      </>
    ),
    description: (
      <>
        à¤¬à¤¾à¤œà¤¼à¤¾à¤° à¤¬à¤¦à¤²à¤¤à¤¾ à¤¹à¥ˆ, à¤•à¥€à¤®à¤¤à¥‡à¤‚ à¤¬à¤¦à¤²à¤¤à¥€ à¤¹à¥ˆà¤‚ — à¤«à¥ˆà¤¸à¤²à¤¾ à¤†à¤ªà¤•à¤¾ à¤¹à¥‹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤à¥¤ <BrandName /> à¤¡à¥‡à¤Ÿà¤¾ à¤”à¤° à¤à¤¨à¤¾à¤²à¤¿à¤Ÿà¤¿à¤•à¥à¤¸ à¤•à¥‡ à¤œà¤¼à¤°à¤¿à¤ à¤†à¤ªà¤•à¥‹
        à¤†à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤°à¥à¤à¤¾à¤¨à¥‹à¤‚ à¤•à¥€ à¤¸à¤¹à¥€ à¤¤à¤¸à¥à¤µà¥€à¤° à¤¦à¤¿à¤–à¤¾à¤¤à¤¾ à¤¹à¥ˆ, à¤¤à¤¾à¤•à¤¿ à¤†à¤ª à¤¸à¤¹à¥€ à¤¸à¤®à¤¯ à¤ªà¤° à¤¸à¤¹à¥€ à¤«à¥ˆà¤¸à¤²à¤¾
        à¤²à¥‡à¤•à¤° à¤œà¤¼à¥à¤¯à¤¾à¤¦à¤¾ à¤¬à¤šà¤¤ à¤•à¤° à¤¸à¤•à¥‡à¤‚à¥¤
      </>
    ),
    pointsTitle: (
      <>
        <BrandName /> à¤†à¤ªà¤•à¥‡ à¤¸à¤¾à¤¥
      </>
    ),
    points: [
      "à¤°à¥‡à¤Ÿ à¤®à¥‡à¤‚ à¤¹à¥‹ à¤°à¤¹à¥‡ à¤¬à¤¦à¤²à¤¾à¤µ à¤ªà¤° à¤²à¤—à¤¾à¤¤à¤¾à¤° à¤¨à¤œà¤¼à¤° à¤°à¤–à¥‡à¤‚à¥¤",
      "à¤¬à¤¢à¤¼à¤¤à¥‡ à¤”à¤° à¤—à¤¿à¤°à¤¤à¥‡ à¤Ÿà¥à¤°à¥‡à¤‚à¤¡ à¤•à¥‹ à¤ªà¤¹à¤²à¥‡ à¤¸à¥‡ à¤¸à¤®à¤à¥‡à¤‚à¥¤",
      "à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¥€ à¤¬à¥‡à¤¹à¤¤à¤° à¤ªà¥à¤²à¤¾à¤¨à¤¿à¤‚à¤— à¤•à¤°à¥‡à¤‚à¥¤",
      "à¤¬à¤¦à¤²à¤¤à¥‡ à¤¬à¤¾à¤œà¤¼à¤¾à¤° à¤•à¥‡ à¤¹à¤¿à¤¸à¤¾à¤¬ à¤¸à¥‡ à¤¸à¤¹à¥€ à¤«à¥ˆà¤¸à¤²à¤¾ à¤²à¥‡à¤‚à¥¤",
    ],
    footerIcon: TrendingUp,
    footerText: "à¤†à¤œ à¤•à¥€ à¤¸à¤®à¤à¤¦à¤¾à¤°à¥€, à¤•à¤² à¤•à¥€ à¤¬à¤šà¤¤à¥¤",
  },

  network: {
    title: "Trusted Supplier Network",
    headline: (
      <>
        à¤¸à¤¹à¥€ à¤¸à¤ªà¥à¤²à¤¾à¤¯à¤° à¤•à¤¾ à¤šà¥à¤¨à¤¾à¤µ,
        <br />
        <span className="text-[#FF6B00]">
          à¤¹à¤° à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤•à¥€ à¤¸à¤«à¤²à¤¤à¤¾ à¤•à¥€ à¤ªà¤¹à¤šà¤¾à¤¨à¥¤
        </span>
      </>
    ),
    description: (
      <>
        à¤¹à¤® à¤†à¤ªà¤•à¥‡ à¤²à¤¿à¤ à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤¸à¤ªà¥à¤²à¤¾à¤¯à¤°à¥à¤¸ à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤²à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤¤à¤¾à¤•à¤¿ à¤†à¤ªà¤•à¥‹ à¤…à¤šà¥à¤›à¤¾
        à¤°à¥‡à¤Ÿ, à¤…à¤šà¥à¤›à¥€ à¤•à¥à¤µà¤¾à¤²à¤¿à¤Ÿà¥€ à¤”à¤° à¤¸à¤®à¤¯ à¤ªà¤° à¤¸à¤ªà¥à¤²à¤¾à¤ˆ à¤®à¤¿à¤² à¤¸à¤•à¥‡à¥¤
      </>
    ),
    pointsTitle: (
      <>
        <BrandName /> à¤†à¤ªà¤•à¥‡ à¤¸à¤¾à¤¥
      </>
    ),
    points: [
      "à¤…à¤ªà¤¨à¥‡ à¤†à¤¸à¤ªà¤¾à¤¸ à¤•à¥‡ à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤¸à¤ªà¥à¤²à¤¾à¤¯à¤°à¥à¤¸ à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤ªà¤¾à¤à¤‚à¥¤",
      "à¤…à¤²à¤—-à¤…à¤²à¤— à¤¸à¤ªà¥à¤²à¤¾à¤¯à¤°à¥à¤¸ à¤•à¥‡ à¤°à¥‡à¤Ÿ à¤•à¥€ à¤¤à¥à¤²à¤¨à¤¾ à¤•à¤°à¥‡à¤‚à¥¤",
      "à¤•à¥à¤µà¤¾à¤²à¤¿à¤Ÿà¥€ à¤”à¤° à¤­à¤°à¥‹à¤¸à¥‡ à¤•à¥‡ à¤†à¤§à¤¾à¤° à¤ªà¤° à¤¸à¤¹à¥€ à¤µà¤¿à¤•à¤²à¥à¤ª à¤šà¥à¤¨à¥‡à¤‚à¥¤",
      "à¤…à¤ªà¤¨à¥‡ à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤¹à¥€ à¤¸à¤ªà¥à¤²à¤¾à¤¯à¤° à¤šà¥à¤¨à¤•à¤° à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤‚à¤¤ à¤°à¤¹à¥‡à¤‚à¥¤",
    ],
    footerIcon: Handshake,
    footerText: "à¤­à¤°à¥‹à¤¸à¤¾, à¤ªà¤¾à¤°à¤¦à¤°à¥à¤¶à¤¿à¤¤à¤¾ à¤”à¤° à¤¸à¤¹à¥€ à¤šà¥à¤¨à¤¾à¤µ — à¤†à¤ªà¤•à¥‡ à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤•à¥€ à¤…à¤¸à¤²à¥€ à¤¤à¤¾à¤•à¤¤à¥¤",
  },


  howSearch: {
    title: "Search Material",
    headline: "à¤–à¤°à¥€à¤¦à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¸à¤¹à¥€ material à¤”à¤° à¤¸à¤¹à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¸à¥‡ à¤¶à¥à¤°à¥à¤†à¤¤ à¤•à¥€à¤œà¤¿à¤à¥¤",
    description:
      "à¤œà¤¿à¤¸ building material à¤•à¥€ à¤†à¤ªà¤•à¥‹ à¤œà¤°à¥‚à¤°à¤¤ à¤¹à¥ˆ, à¤‰à¤¸à¥‡ SahiRate à¤ªà¤° à¤–à¥‹à¤œà¤¿à¤ à¤”à¤° à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤‰à¤¸à¤•à¥‡ market rate à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¸à¤®à¤à¤¿à¤à¥¤",
    pointsTitle: "SahiRate à¤†à¤ªà¤•à¥‡ à¤²à¤¿à¤",
    points: [
      "à¤…à¤ªà¤¨à¥€ à¤œà¤°à¥‚à¤°à¤¤ à¤•à¤¾ building material à¤†à¤¸à¤¾à¤¨à¥€ à¤¸à¥‡ à¤–à¥‹à¤œà¤¿à¤à¥¤",
      "à¤‰à¤¸ material à¤•à¥€ market price information à¤¦à¥‡à¤–à¤¿à¤à¥¤",
      "à¤–à¤°à¥€à¤¦à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ rate à¤•à¤¾ à¤¬à¥‡à¤¹à¤¤à¤° reference à¤ªà¤¾à¤‡à¤à¥¤",
      "à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤…à¤—à¤²à¤¾ à¤•à¤¦à¤® à¤¤à¤¯ à¤•à¥€à¤œà¤¿à¤à¥¤",
    ],
    footerIcon: Search,
    footerText: "à¤¸à¤¹à¥€ à¤¶à¥à¤°à¥à¤†à¤¤, à¤¬à¥‡à¤¹à¤¤à¤° à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¥€ à¤ªà¤¹à¤²à¥€ à¤¸à¥€à¤¢à¤¼à¥€à¥¤",
  },

  howCompare: {
    title: "Compare Market Prices",
    headline: "à¤à¤• à¤¹à¥€ rate à¤¦à¥‡à¤–à¤•à¤° à¤«à¥ˆà¤¸à¤²à¤¾ à¤²à¥‡à¤¨à¥‡ à¤•à¥€ à¤œà¤°à¥‚à¤°à¤¤ à¤¨à¤¹à¥€à¤‚à¥¤",
    description:
      "à¤…à¤²à¤—-à¤…à¤²à¤— dealers à¤”à¤° market rates à¤•à¥‹ à¤¸à¤®à¤à¤•à¤° à¤†à¤ª à¤…à¤ªà¤¨à¥€ à¤œà¤°à¥‚à¤°à¤¤ à¤”à¤° budget à¤•à¥‡ à¤¹à¤¿à¤¸à¤¾à¤¬ à¤¸à¥‡ à¤¬à¥‡à¤¹à¤¤à¤° à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¤¾ à¤«à¥ˆà¤¸à¤²à¤¾ à¤²à¥‡ à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
    pointsTitle: "SahiRate à¤†à¤ªà¤•à¥‡ à¤²à¤¿à¤",
    points: [
      "à¤…à¤²à¤—-à¤…à¤²à¤— available rates à¤•à¥‹ compare à¤•à¥€à¤œà¤¿à¤à¥¤",
      "Local market à¤®à¥‡à¤‚ à¤šà¤² à¤°à¤¹à¥‡ price levels à¤•à¥‹ à¤¸à¤®à¤à¤¿à¤à¥¤",
      "Quoted rate à¤•à¥‹ market information à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¦à¥‡à¤–à¤¿à¤à¥¤",
      "à¤–à¤°à¥€à¤¦à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¬à¥‡à¤¹à¤¤à¤° à¤«à¥ˆà¤¸à¤²à¤¾ à¤²à¥€à¤œà¤¿à¤à¥¤",
    ],
    footerIcon: BarChart3,
    footerText: "à¤¤à¥à¤²à¤¨à¤¾ à¤¸à¤¾à¤« à¤¹à¥‹, à¤¤à¥‹ à¤«à¥ˆà¤¸à¤²à¤¾ à¤†à¤¸à¤¾à¤¨ à¤¹à¥‹ à¤œà¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤",
  },

  howAI: {
    title: "Get SahiAI Insights",
    headline: "à¤¸à¤¿à¤°à¥à¤« rate à¤œà¤¾à¤¨à¤¨à¤¾ à¤•à¤¾à¤«à¥€ à¤¨à¤¹à¥€à¤‚, market à¤•à¥‹ à¤¸à¤®à¤à¤¨à¤¾ à¤­à¥€ à¤œà¤°à¥‚à¤°à¥€ à¤¹à¥ˆà¥¤",
    description:
      "SahiAI market information, price trends à¤”à¤° à¤‰à¤ªà¤²à¤¬à¥à¤§ data à¤•à¥‹ à¤¸à¤®à¤à¤¨à¥‡ à¤®à¥‡à¤‚ à¤†à¤ªà¤•à¥€ à¤®à¤¦à¤¦ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ, à¤¤à¤¾à¤•à¤¿ à¤†à¤ª à¤œà¤°à¥‚à¤°à¥€ à¤¬à¤¾à¤¤à¥‹à¤‚ à¤ªà¤° à¤¬à¥‡à¤¹à¤¤à¤° à¤§à¥à¤¯à¤¾à¤¨ à¤¦à¥‡ à¤¸à¤•à¥‡à¤‚à¥¤",
    pointsTitle: "SahiRate à¤†à¤ªà¤•à¥‡ à¤²à¤¿à¤",
    points: [
      "Price movement à¤•à¥‹ à¤¸à¤®à¤à¤¨à¥‡ à¤®à¥‡à¤‚ à¤®à¤¦à¤¦ à¤ªà¤¾à¤‡à¤à¥¤",
      "à¤¬à¤¢à¤¼à¤¤à¥‡ à¤”à¤° à¤˜à¤Ÿà¤¤à¥‡ trends à¤ªà¤° à¤¨à¤œà¤° à¤°à¤–à¤¿à¤à¥¤",
      "Market information à¤•à¥‹ à¤†à¤¸à¤¾à¤¨ à¤¤à¤°à¥€à¤•à¥‡ à¤¸à¥‡ à¤¸à¤®à¤à¤¿à¤à¥¤",
      "à¤¬à¥‡à¤¹à¤¤à¤° à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¥€ à¤¤à¥ˆà¤¯à¤¾à¤°à¥€ à¤•à¥€à¤œà¤¿à¤à¥¤",
    ],
    footerIcon: BrainCircuit,
    footerText: "à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¸à¤®à¤ à¤®à¥‡à¤‚ à¤†à¤, à¤¤à¤­à¥€ à¤‰à¤¸à¤•à¤¾ à¤¸à¤¹à¥€ à¤«à¤¾à¤¯à¤¦à¤¾ à¤®à¤¿à¤²à¤¤à¤¾ à¤¹à¥ˆà¥¤",
  },

  howBuy: {
    title: "Buy with Confidence",
    headline: "à¤œà¤¬ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¸à¤¾à¤« à¤¹à¥‹, à¤¤à¥‹ à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¤¾ à¤­à¤°à¥‹à¤¸à¤¾ à¤­à¥€ à¤¬à¤¢à¤¼à¤¤à¤¾ à¤¹à¥ˆà¥¤",
    description:
      "Market rate, comparison à¤”à¤° à¤œà¤°à¥‚à¤°à¥€ insights à¤¸à¤®à¤à¤¨à¥‡ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤…à¤ªà¤¨à¥€ à¤œà¤°à¥‚à¤°à¤¤ à¤”à¤° budget à¤•à¥‡ à¤¹à¤¿à¤¸à¤¾à¤¬ à¤¸à¥‡ à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¤¾ à¤«à¥ˆà¤¸à¤²à¤¾ à¤…à¤§à¤¿à¤• confidence à¤•à¥‡ à¤¸à¤¾à¤¥ à¤²à¥€à¤œà¤¿à¤à¥¤",
    pointsTitle: "SahiRate à¤†à¤ªà¤•à¥‡ à¤²à¤¿à¤",
    points: [
      "à¤–à¤°à¥€à¤¦à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ market rate à¤¸à¤®à¤à¤¿à¤à¥¤",
      "à¤œà¤°à¥‚à¤°à¥€ price comparison à¤ªà¥‚à¤°à¤¾ à¤•à¥€à¤œà¤¿à¤à¥¤",
      "à¤…à¤ªà¤¨à¥€ à¤œà¤°à¥‚à¤°à¤¤ à¤”à¤° budget à¤•à¥‡ à¤¹à¤¿à¤¸à¤¾à¤¬ à¤¸à¥‡ à¤¸à¥‹à¤šà¤¿à¤à¥¤",
      "à¤¬à¥‡à¤¹à¤¤à¤° à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‡ à¤¸à¤¾à¤¥ final decision à¤²à¥€à¤œà¤¿à¤à¥¤",
    ],
    footerIcon: ShieldCheck,
    footerText: "à¤¸à¤¹à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤²à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤«à¥ˆà¤¸à¤²à¤¾ à¤œà¥à¤¯à¤¾à¤¦à¤¾ à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆà¥¤",
  },
};

function BrandName() {
  return (
    <span className="font-semibold">
      <span className="text-[#0A2342]">Sahi</span>
      <span className="text-[#FF5A00]">Rate</span>
    </span>
  );
}

export default function FeatureDetailModal({
  feature,
  onClose,
}) {
  if (!feature || !details[feature]) {
    return null;
  }

  const data = details[feature];
  const Icon = iconMap[feature];
  const FooterIcon = data.footerIcon;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/55
        px-4
        py-6
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          max-h-[92vh]
          w-full
          max-w-[760px]
          overflow-y-auto
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-[0_30px_100px_rgba(15,23,42,0.28)]
        "
        onClick={(event) => event.stopPropagation()}
      >

        {/* Top Brand Line */}
        <div className="h-1.5 w-full bg-[#FF6B00]" />

        <div className="px-7 pb-7 pt-7 md:px-9 md:pb-8 md:pt-8">

          {/* Header */}
          <div className="flex items-start justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50">
                <Icon
                  size={28}
                  strokeWidth={2}
                  className="text-[#FF6B00]"
                />
              </div>

              <div>

                <div className="text-[24px] font-extrabold leading-none tracking-[-0.03em]">
                  <span className="text-[#0A2342]">Sahi</span>
                  <span className="text-[#FF5A00]">Rate</span>
                </div>

                <h2 className="mt-1 text-[24px] font-bold leading-tight tracking-[-0.03em] text-slate-900 md:text-[28px]">
                  {data.title}
                </h2>

              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-slate-500
                transition
                hover:bg-slate-200
                hover:text-slate-900
              "
            >
              <X size={20} />
            </button>

          </div>

          {/* Emotional Headline */}
          <div className="mt-7">

            <h3 className="text-[23px] font-bold leading-[1.35] tracking-[-0.025em] text-slate-900 md:text-[26px]">
              {data.headline}
            </h3>

            <p className="mt-4 text-[16px] leading-7 text-slate-600 md:text-[17px]">
              {data.description}
            </p>

          </div>

          {/* Helpful Information */}
          <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-5 md:p-6">

            <div className="text-[16px] font-bold text-slate-700">
              {data.pointsTitle}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              {data.points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <span className="text-[15px] leading-6 text-slate-600">
                    {point}
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* Emotional Footer */}
          <div className="mt-6 border-t border-slate-200 pt-5">

            <div className="flex items-center gap-2 text-[14px] font-medium text-slate-600">

              <FooterIcon
                size={18}
                className="shrink-0 text-[#FF6B00]"
              />

              <span>
                {data.footerText}
              </span>

            </div>

            <div className="mt-4 flex items-center justify-between gap-4">

              {/* IMPORTANT:
                  Always English/Latin brand wording here.
                  Never Hindi font.
              */}
              <p className="text-[16px] font-medium text-slate-500">
                Har Material ka{" "}
                <span className="font-extrabold text-[#0A2342]">
                  Sahi
                </span>
                <span className="font-extrabold text-[#FF5A00]">
                  Rate
                </span>
                .
              </p>

              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-xl
                  bg-[#FF6B00]
                  px-6
                  py-3
                  text-[15px]
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#E55F00]
                  hover:shadow-lg
                "
              >
                Got It
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
