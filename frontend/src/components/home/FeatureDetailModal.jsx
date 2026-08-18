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
        खरीदने से पहले सही जानकारी,
        <br />
        <span className="text-[#FF6B00]">
          तभी हर खर्च होगा समझदारी भरा।
        </span>
      </>
    ),
    description: (
      <>
        <BrandName /> आपको आपके शहर के असली और लेटेस्ट मार्केट रेट दिखाता है,
        ताकि आप बिना अंदाज़े के, सही दाम पर खरीदारी कर सकें।
      </>
    ),
    pointsTitle: (
      <>
        <BrandName /> आपके साथ
      </>
    ),
    points: [
      "आज का सही बाज़ार भाव आसानी से जानें।",
      "अलग-अलग दुकानदारों के रेट की तुलना करें।",
      "कहीं आपसे ज़्यादा पैसे तो नहीं लिए जा रहे, यह पहचानें।",
      "बड़ी मात्रा में खरीदने से पहले बेहतर रेट तय करें।",
    ],
    footerIcon: Heart,
    footerText: "आपका भरोसा, हमारी प्राथमिकता — हर खरीदारी बने फायदे का सौदा।",
  },

  ai: {
    title: "Powered by SahiAI",
    headline: (
      <>
        बाज़ार को समझना अब हुआ आसान,
        <br />
        क्योंकि आपके साथ है{" "}
        <span className="text-[#FF6B00]">SahiAI</span>
      </>
    ),
    description: (
      <>
        <span className="font-semibold text-slate-900">SahiAI</span> बाज़ार के
        डेटा और जानकारी को समझकर आपको सही समय पर सही जानकारी देने में मदद करता
        है।
      </>
    ),
    pointsTitle: (
      <>
        <span className="font-semibold text-[#0A2342]">SahiAI</span> आपके साथ
      </>
    ),
    points: [
      "रेट कब बढ़ रहा है और कब कम, स्पष्ट समझें।",
      "बाज़ार के संकेत और ज़रूरी जानकारी सही समय पर पाएं।",
      "खरीदारी के सही समय की पहचान करें।",
      "मुश्किल जानकारी को आसान और साफ तरीके से समझें।",
    ],
    footerIcon: Lightbulb,
    footerText: "सही जानकारी, सही समय — समझदारी से उठाया हर कदम।",
  },

  trends: {
    title: "Price Trends & Analytics",
    headline: (
      <>
        सिर्फ आज का रेट नहीं,
        <br />
        <span className="text-[#FF6B00]">
          कल का अंदाज़ा भी ज़रूरी।
        </span>
      </>
    ),
    description: (
      <>
        बाज़ार बदलता है, कीमतें बदलती हैं — फैसला आपका होना चाहिए। <BrandName /> डेटा और एनालिटिक्स के ज़रिए आपको
        आने वाले रुझानों की सही तस्वीर दिखाता है, ताकि आप सही समय पर सही फैसला
        लेकर ज़्यादा बचत कर सकें।
      </>
    ),
    pointsTitle: (
      <>
        <BrandName /> आपके साथ
      </>
    ),
    points: [
      "रेट में हो रहे बदलाव पर लगातार नज़र रखें।",
      "बढ़ते और गिरते ट्रेंड को पहले से समझें।",
      "खरीदारी की बेहतर प्लानिंग करें।",
      "बदलते बाज़ार के हिसाब से सही फैसला लें।",
    ],
    footerIcon: TrendingUp,
    footerText: "आज की समझदारी, कल की बचत।",
  },

  network: {
    title: "Trusted Supplier Network",
    headline: (
      <>
        सही सप्लायर का चुनाव,
        <br />
        <span className="text-[#FF6B00]">
          हर प्रोजेक्ट की सफलता की पहचान।
        </span>
      </>
    ),
    description: (
      <>
        हम आपके लिए भरोसेमंद सप्लायर्स की जानकारी लाते हैं, ताकि आपको अच्छा
        रेट, अच्छी क्वालिटी और समय पर सप्लाई मिल सके।
      </>
    ),
    pointsTitle: (
      <>
        <BrandName /> आपके साथ
      </>
    ),
    points: [
      "अपने आसपास के भरोसेमंद सप्लायर्स की जानकारी पाएं।",
      "अलग-अलग सप्लायर्स के रेट की तुलना करें।",
      "क्वालिटी और भरोसे के आधार पर सही विकल्प चुनें।",
      "अपने प्रोजेक्ट के लिए सही सप्लायर चुनकर निश्चिंत रहें।",
    ],
    footerIcon: Handshake,
    footerText: "भरोसा, पारदर्शिता और सही चुनाव — आपके प्रोजेक्ट की असली ताकत।",
  },


  howSearch: {
    title: "Search Material",
    headline: "खरीदने से पहले सही material और सही जानकारी से शुरुआत कीजिए।",
    description:
      "जिस building material की आपको जरूरत है, उसे SahiRate पर खोजिए और खरीदारी से पहले उसके market rate की जानकारी समझिए।",
    pointsTitle: "SahiRate आपके लिए",
    points: [
      "अपनी जरूरत का building material आसानी से खोजिए।",
      "उस material की market price information देखिए।",
      "खरीदने से पहले rate का बेहतर reference पाइए।",
      "जानकारी के साथ अगला कदम तय कीजिए।",
    ],
    footerIcon: Search,
    footerText: "सही शुरुआत, बेहतर खरीदारी की पहली सीढ़ी।",
  },

  howCompare: {
    title: "Compare Market Prices",
    headline: "एक ही rate देखकर फैसला लेने की जरूरत नहीं।",
    description:
      "अलग-अलग dealers और market rates को समझकर आप अपनी जरूरत और budget के हिसाब से बेहतर खरीदारी का फैसला ले सकते हैं।",
    pointsTitle: "SahiRate आपके लिए",
    points: [
      "अलग-अलग available rates को compare कीजिए।",
      "Local market में चल रहे price levels को समझिए।",
      "Quoted rate को market information के साथ देखिए।",
      "खरीदने से पहले बेहतर फैसला लीजिए।",
    ],
    footerIcon: BarChart3,
    footerText: "तुलना साफ हो, तो फैसला आसान हो जाता है।",
  },

  howAI: {
    title: "Get SahiAI Insights",
    headline: "सिर्फ rate जानना काफी नहीं, market को समझना भी जरूरी है।",
    description:
      "SahiAI market information, price trends और उपलब्ध data को समझने में आपकी मदद करता है, ताकि आप जरूरी बातों पर बेहतर ध्यान दे सकें।",
    pointsTitle: "SahiRate आपके लिए",
    points: [
      "Price movement को समझने में मदद पाइए।",
      "बढ़ते और घटते trends पर नजर रखिए।",
      "Market information को आसान तरीके से समझिए।",
      "बेहतर जानकारी के साथ खरीदारी की तैयारी कीजिए।",
    ],
    footerIcon: BrainCircuit,
    footerText: "जानकारी समझ में आए, तभी उसका सही फायदा मिलता है।",
  },

  howBuy: {
    title: "Buy with Confidence",
    headline: "जब जानकारी साफ हो, तो खरीदारी का भरोसा भी बढ़ता है।",
    description:
      "Market rate, comparison और जरूरी insights समझने के बाद अपनी जरूरत और budget के हिसाब से खरीदारी का फैसला अधिक confidence के साथ लीजिए।",
    pointsTitle: "SahiRate आपके लिए",
    points: [
      "खरीदने से पहले market rate समझिए।",
      "जरूरी price comparison पूरा कीजिए।",
      "अपनी जरूरत और budget के हिसाब से सोचिए।",
      "बेहतर जानकारी के साथ final decision लीजिए।",
    ],
    footerIcon: ShieldCheck,
    footerText: "सही जानकारी के साथ लिया गया फैसला ज्यादा भरोसेमंद होता है।",
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