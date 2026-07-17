import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  ChevronRight
} from "lucide-react";

import SEO from "../components/SEO";
import { fetchDailyPrices, fetchMaterials } from "@/lib/api";


export default function Home({ onOpenSearch }) {

  const [board, setBoard] = useState([]);
  const [materials, setMaterials] = useState([]);


  useEffect(() => {

    fetchDailyPrices()
      .then((d) => {
        setBoard(d?.board || []);
      })
      .catch(() => {
        setBoard([]);
      });


    fetchMaterials()
      .then((data) => {

        setMaterials(
          Array.isArray(data)
            ? data
            : data?.materials || []
        );

      })
      .catch(() => {
        setMaterials([]);
      });


  }, []);



  return (
    <>

      <SEO
        title="SahiRate - Building Material Prices in Jharkhand"
        description="Check latest cement, steel, sand and construction material prices near you."
        url="https://www.sahirate.in/"
      />



      {/* HERO SECTION */}

      <section className="relative overflow-hidden bg-[#0A192F]">

        <div className="absolute -top-48 -right-48 w-[650px] h-[650px] rounded-full bg-[#FF6B00]/20 blur-[120px]" />


        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[120px]" />


        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-28">


          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm text-orange-300">

            <Sparkles className="w-4 h-4" />

            🇮🇳 India's Building Material Intelligence Platform

          </div>



          <h1
            className="mt-8 text-white font-extrabold leading-tight"
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "clamp(3rem,6vw,5.2rem)"
            }}
          >

            Know the

            <span className="text-[#FF6B00]">
              {" "}Right Price{" "}
            </span>

            before you build.

          </h1>



          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">

            Compare live building material prices from verified dealers,
            discover market trends, and make smarter construction decisions.

            Starting from

            <span className="text-white font-semibold">
              {" "}Deoghar, Jharkhand
            </span>.

          </p>



          <div className="mt-12 flex flex-wrap gap-4">


            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-white font-semibold shadow-xl hover:bg-[#eb5d00] transition"
            >

              <Sparkles size={20}/>

              Ask AI

            </button>



            <Link
              to="/materials"
              className="flex items-center gap-2 rounded-xl border border-white/20 px-7 py-4 text-white hover:bg-white/10 transition"
            >

              Compare Materials

              <ArrowRight size={18}/>

            </Link>


          </div>



          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">


            {[
              {
                value:"15+",
                label:"Verified Dealers"
              },
              {
                value:"100%",
                label:"Price Transparency"
              },
              {
                value:"Daily",
                label:"Market Updates"
              },
              {
                value:"AI",
                label:"Construction Intelligence"
              }

            ].map((item)=>(

              <div key={item.label}>

                <div className="text-4xl font-extrabold text-white">
                  {item.value}
                </div>

                <div className="mt-2 uppercase tracking-widest text-xs text-slate-400">
                  {item.label}
                </div>

              </div>

            ))}


          </div>


        </div>


      </section>      {/* LIVE PRICE STRIP */}


      {board.length > 0 && (

        <section className="border-y border-slate-200 bg-white">

          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">


            <div className="flex items-center gap-3 mb-5">

              <TrendingUp className="text-[#FF6B00]" />

              <h2 className="font-bold text-[#0A192F]">
                Today's Market Prices
              </h2>

            </div>



            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">


              {(board || []).map((item) => (

                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition"
                >


                  <div className="flex justify-between items-center">

                    <h3 className="font-semibold text-[#0A192F]">
                      {item.name}
                    </h3>


                    <TrendingUp
                      className={`w-5 h-5 ${
                        item.trend === "up"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    />

                  </div>



                  <div className="mt-5 text-3xl font-black text-[#0A192F]">
                    ₹{item.avg}
                  </div>


                  <div className="mt-2 text-sm text-slate-500">
                    {item.unit}
                  </div>


                </div>

              ))}


            </div>


          </div>

        </section>

      )}





      {/* MATERIAL CATEGORIES */}


      <section className="py-24 bg-[#F8FAFC]">


        <div className="max-w-7xl mx-auto px-6 lg:px-10">



          <div className="flex items-end justify-between mb-14">


            <div>


              <span className="text-sm font-semibold tracking-[0.25em] uppercase text-[#FF6B00]">
                Categories
              </span>



              <h2
                className="mt-4 text-[#0A192F] font-extrabold"
                style={{
                  fontFamily:"Plus Jakarta Sans",
                  fontSize:"clamp(2rem,4vw,3.3rem)"
                }}
              >
                Compare Every Building Material
              </h2>



              <p className="mt-5 max-w-2xl text-slate-600 leading-8">

                Daily updated prices from verified dealers.
                Everything you need before starting construction.

              </p>


            </div>




            <Link
              to="/materials"
              className="hidden lg:flex items-center gap-2 text-[#FF6B00] font-semibold"
            >

              View All

              <ChevronRight size={18}/>

            </Link>



          </div>





          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">



            {(materials || []).map((item)=>(


              <Link
                key={item.slug}
                to={`/materials/${item.slug}`}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >



                <div className="aspect-[16/10] overflow-hidden bg-slate-100">


                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />


                </div>





                <div className="p-7">


                  <div className="flex justify-between items-center">


                    <h3 className="text-xl font-bold text-[#0A192F]">
                      {item.name}
                    </h3>



                    <ArrowRight
                      className="text-[#FF6B00] group-hover:translate-x-1 transition"
                    />


                  </div>




                  <div className="mt-3 text-slate-500">
                    {item.unit}
                  </div>





                  <div className="mt-5 flex items-end gap-2">


                    <span className="text-3xl font-black text-[#0A192F]">

                      ₹{item.stats?.avg ?? "--"}

                    </span>


                    <span className="text-slate-500 mb-1">
                      Avg Price
                    </span>


                  </div>





                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B00]">

                    Compare Dealers

                    <ArrowRight size={16}/>

                  </div>



                </div>



              </Link>


            ))}



          </div>




        </div>


      </section>      {/* WHY SAHIRATE */}


      <section className="py-24">


        <div className="max-w-7xl mx-auto px-6 lg:px-10">


          <div className="text-center max-w-3xl mx-auto">


            <span className="text-sm uppercase tracking-[0.25em] font-semibold text-[#FF6B00]">
              Why SahiRate
            </span>



            <h2
              className="mt-5 font-extrabold text-[#0A192F]"
              style={{
                fontFamily:"Plus Jakarta Sans",
                fontSize:"clamp(2.2rem,4vw,3.5rem)"
              }}
            >

              Construction decisions backed by data.

            </h2>



            <p className="mt-6 text-slate-600 leading-8">

              No more guessing.
              Compare prices, verify dealers and save money
              before purchasing building materials.

            </p>


          </div>





          <div className="grid md:grid-cols-3 gap-8 mt-20">


            {[

              {
                icon:<TrendingUp size={34}/>,
                title:"Live Market Prices",
                desc:"Updated building material prices from local verified dealers every day."
              },


              {
                icon:<ShieldCheck size={34}/>,
                title:"Verified Dealers",
                desc:"Only trusted suppliers with genuine business profiles."
              },


              {
                icon:<Building2 size={34}/>,
                title:"Construction Intelligence",
                desc:"AI-powered insights helping homeowners and contractors save money."
              }


            ].map((card)=>(


              <div
                key={card.title}
                className="rounded-3xl bg-white border border-slate-200 p-10 hover:shadow-xl transition"
              >


                <div className="w-16 h-16 rounded-2xl bg-[#FFF3EC] flex items-center justify-center text-[#FF6B00]">

                  {card.icon}

                </div>




                <h3 className="mt-8 text-2xl font-bold text-[#0A192F]">

                  {card.title}

                </h3>




                <p className="mt-5 leading-8 text-slate-600">

                  {card.desc}

                </p>



              </div>


            ))}



          </div>


        </div>


      </section>






      {/* EXPANSION ROADMAP */}



      <section className="py-24 bg-[#0A192F] text-white">


        <div className="max-w-7xl mx-auto px-6 lg:px-10">



          <div className="max-w-3xl">


            <span className="uppercase tracking-[0.25em] text-sm text-[#FF6B00] font-semibold">

              Expansion Plan

            </span>




            <h2
              className="mt-5 font-extrabold"
              style={{
                fontFamily:"Plus Jakarta Sans",
                fontSize:"clamp(2.3rem,4vw,3.8rem)"
              }}
            >

              Building India's largest Building Material Intelligence Platform.

            </h2>





            <p className="mt-8 text-slate-300 leading-8 text-lg">

              SahiRate starts from Deoghar, validates the model,
              builds dealer trust and expands district by district
              until every builder in India can compare prices before buying.

            </p>



          </div>





          <div className="grid lg:grid-cols-4 gap-8 mt-20">


            {[

              {
                phase:"Phase 1",
                city:"Deoghar",
                desc:"Pilot launch, dealer onboarding and customer validation."
              },


              {
                phase:"Phase 2",
                city:"Jharkhand",
                desc:"District expansion with live market pricing."
              },


              {
                phase:"Phase 3",
                city:"Bihar",
                desc:"Regional growth with AI recommendations."
              },


              {
                phase:"Phase 4",
                city:"India",
                desc:"Nationwide Building Material Intelligence Platform."
              }


            ].map((step)=>(


              <div
                key={step.phase}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition"
              >


                <div className="text-[#FF6B00] font-bold uppercase tracking-widest">

                  {step.phase}

                </div>



                <h3 className="mt-5 text-2xl font-bold">

                  {step.city}

                </h3>



                <p className="mt-5 text-slate-300 leading-8">

                  {step.desc}

                </p>



              </div>


            ))}



          </div>


        </div>


      </section>      {/* FAQ */}


      <section className="py-24 bg-white">


        <div className="max-w-5xl mx-auto px-6">


          <div className="text-center">


            <span className="uppercase tracking-[0.25em] text-[#FF6B00] font-semibold">
              FAQ
            </span>



            <h2
              className="mt-5 text-[#0A192F] font-extrabold"
              style={{
                fontFamily:"Plus Jakarta Sans",
                fontSize:"clamp(2.2rem,4vw,3.4rem)"
              }}
            >

              Frequently Asked Questions

            </h2>


          </div>





          <div className="mt-16 space-y-6">


            {[

              {
                q:"How often are prices updated?",
                a:"Material prices are updated regularly based on verified local dealer information."
              },


              {
                q:"Are all dealers verified?",
                a:"Yes. Dealers are verified before appearing on the platform."
              },


              {
                q:"Is SahiRate free?",
                a:"Yes. During the launch phase, SahiRate is completely free for users."
              },


              {
                q:"Which cities are currently supported?",
                a:"We are starting from Deoghar, Jharkhand and expanding across India."
              }


            ].map((faq)=>(


              <article
                key={faq.q}
                className="rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition"
              >


                <h3 className="text-xl font-bold text-[#0A192F]">

                  {faq.q}

                </h3>



                <p className="mt-4 text-slate-600 leading-8">

                  {faq.a}

                </p>


              </article>


            ))}


          </div>


        </div>


      </section>







      {/* FINAL CTA */}



      <section className="py-24 bg-[#F8FAFC]">


        <div className="max-w-7xl mx-auto px-6 lg:px-10">


          <div className="rounded-[32px] overflow-hidden bg-[#0A192F] relative">


            <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#10294a] to-[#FF6B00] opacity-95" />



            <div className="relative px-10 py-16 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">


              <div className="max-w-2xl">


                <span className="uppercase tracking-[0.25em] text-[#FFB27A] text-sm font-semibold">

                  Join SahiRate

                </span>




                <h2
                  className="mt-5 text-white font-extrabold"
                  style={{
                    fontFamily:"Plus Jakarta Sans",
                    fontSize:"clamp(2.2rem,4vw,3.6rem)"
                  }}
                >

                  Know the Right Price.
                  <br />
                  Build with Confidence.

                </h2>





                <p className="mt-6 text-slate-300 leading-8">

                  Compare live prices, connect with verified dealers,
                  and make smarter construction decisions with India's
                  Building Material Intelligence Platform.

                </p>


              </div>






              <div className="flex flex-wrap gap-4">


                <button
                  onClick={onOpenSearch}
                  className="px-8 py-4 rounded-xl bg-[#FF6B00] hover:bg-[#eb5d00] text-white font-semibold transition shadow-xl"
                >

                  Ask AI

                </button>




                <Link
                  to="/dealers"
                  className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
                >

                  Find Dealers

                </Link>



              </div>



            </div>



          </div>



        </div>


      </section>



    </>

  );

}