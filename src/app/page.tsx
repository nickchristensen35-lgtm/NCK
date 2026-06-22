import dynamic from "next/dynamic";
import Image from "next/image";
import GallerySlider from "@/components/GallerySlider";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import SiteHeader from "@/components/SiteHeader";
import CreativeAgencyHero from "@/components/lightswind/creative-agency-hero";
import {
  Clock, CheckCircle, MapPin, Phone, Mail, ChevronRight,
  BookOpen, Calculator, Play,
} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import { getContent } from "@/lib/content";

const InstagramSlider = dynamic(() => import("@/components/InstagramSlider"), { ssr: false });
const TestimonialSlider = dynamic(() => import("@/components/TestimonialSlider"), { ssr: false });


const CHECK = (
  <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
  </svg>
);

export default async function Home() {
  const content = await getContent();
  return (
    <div className="bg-white text-gray-900">

      <SiteHeader />

      {/* ── HERO ── */}
      <CreativeAgencyHero content={content} />

      {/* ── STATS BAR ── */}
      <section className="bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$45", label: "Per hour (min 3hrs)" },
              { value: "24/7", label: "Kitchen access" },
              { value: "0", label: "Lock-in contracts" },
              { value: "5★", label: "Google reviews" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-red-400 font-display">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1 tracking-wide uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              From booking to business — in three steps
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Getting started with commercial kitchen hire in Adelaide has never been easier.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gray-200 z-0" />
            {[
              {
                step: "01",
                title: "Book Your Session",
                desc: "Email us with your preferred date and time. Sessions confirmed once payment is received — simple, transparent, no surprises.",
                icon: (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Arrive & Create",
                desc: "Walk into a fully equipped, council-approved commercial kitchen ready for you. Everything included — just bring your ingredients.",
                icon: (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Grow Your Business",
                desc: "Sell at markets, deliver to customers, run classes or scale into retail. NCK is the launchpad for Adelaide's best food businesses.",
                icon: (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
            ].map(item => (
              <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-cream rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-red-600 tracking-[0.2em] uppercase mb-2">{item.step}</span>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm tracking-wide">
              Start Your Food Business <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Commercial Kitchen Hire Adelaide</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything you need to launch your food business
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Skip the overheads of owning your own kitchen. Our licensed commercial kitchen hire gives Adelaide food entrepreneurs the space, equipment and compliance to trade legally — from day one.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-6 h-6 text-white" />,
                title: "Flexible Kitchen Hire",
                desc: "Rent our commercial kitchen by the hour with no lock-in contracts. Book casually or lock in a regular weekly slot — you're in control.",
                items: ["From $45/hr + GST", "3-hour minimum booking", "No lock-in contracts"],
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-white" />,
                title: "Council-Approved & Compliant",
                desc: "Our purpose-built kitchen is fully licensed, council-approved and food-safety compliant — so you can sell, deliver and trade with confidence.",
                items: ["Council approved facility", "Food-safe & fully licensed", "Notification of Food Business support"],
              },
              {
                icon: <MapPin className="w-6 h-6 text-white" />,
                title: "Prime Adelaide Location",
                desc: "Located on a busy pedestrian street in Norwood, minutes from the Adelaide CBD — with onsite parking, loading access and front-fence advertising.",
                items: ["59 Queen St, Norwood SA 5067", "5 onsite parking spaces", "Front fence advertising included"],
              },
            ].map(card => (
              <div key={card.title} className="bg-cream rounded-2xl p-8 hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-5">{card.icon}</div>
                <h3 className="font-semibold text-xl text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.desc}</p>
                <ul className="space-y-2">
                  {card.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">{CHECK}{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="min-w-0">
              <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Commercial-Grade Equipment</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Professional grade.<br/>Everything included.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our Adelaide commercial kitchen is stocked with top-tier equipment — combi ovens, bratt pan, blast chiller, planetary mixer and more. Everything you need to produce at scale, included in your hire rate.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "5-tray combi oven (UNOX)", "Baker's oven", "50L bratt pan", "6-burner range",
                  "Gas oven (900mm)", "Planetary mixer", "Pass-through dishwasher", "Walk-in cool room",
                  "Blast chiller/freezer", "Dry storage", "~15m bench space", "WiFi",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">{CHECK}{item}</div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/PHOTO-2023-01-28-21-28-37.jpg"
                  alt="Norwood Commercial Kitchen interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-3 left-3 md:-bottom-4 md:-left-4 bg-white rounded-xl shadow-lg px-5 py-3 border border-gray-100">
                <p className="text-2xl font-bold text-red-600">$45<span className="text-sm text-gray-500 font-normal">/hr</span></p>
                <p className="text-xs text-gray-500">min. 3 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Who Uses Our Kitchen</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Adelaide&apos;s food entrepreneurs, bakers &amp; caterers</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">From home bakers going pro to established caterers scaling up — NCK is Adelaide&apos;s go-to commercial kitchen hire for every stage of your food business journey.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { img: "PHOTO-2023-02-19-10-57-27.jpg",   label: "Caterers" },
              { img: "PHOTO-2023-03-01-11-19-23.jpg",   label: "Bakers" },
              { img: "PHOTO-2023-02-24-19-19-55.jpg",   label: "Market Stalls" },
              { img: "Sam @ bratt pan.jpeg",             label: "Small Producers" },
              { img: "PHOTO-2023-02-19-10-57-27 2.jpg", label: "Cooking Classes" },
              { img: "PHOTO-2023-01-28-21-30-14.jpg",   label: "Product Dev" },
            ].map(item => (
              <div key={item.label} className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-default">
                <Image
                  src={`/images/${encodeURIComponent(item.img)}`}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-4 text-white font-semibold text-sm drop-shadow">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="min-w-0">
              <p className="text-red-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Georgie &amp; Louise</h2>
              <p className="text-gray-300 leading-relaxed mb-5">
                Georgie and Louise founded Norwood Commercial Kitchen with one clear purpose:{" "}
                <strong className="text-white">"Small businesses needed to be able to pursue business without the crippling overheads of running their own kitchens."</strong>
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Their Adelaide commercial kitchen hire was built for caterers, bakers, food truck operators, market stall holders, small-batch producers and cooking class instructors — so they can focus on their craft, not the overheads.
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="inline-flex items-center px-5 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                  Get in Touch
                </a>
                <a href="https://my.matterport.com/show/?m=NYMyUQ42dtt&sr=.1.,07&ss=7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-white hover:text-white transition-colors duration-200 text-sm">
                  <Play className="w-4 h-4" /> Virtual Tour
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { initial: "G", name: "Georgie", role: "Co-founder", phone: "0475 517 995", href: "tel:0475517995" },
                { initial: "L", name: "Louise", role: "Co-founder", phone: "0412 300 490", href: "tel:0412300490" },
              ].map(p => (
                <div key={p.name} className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">{p.initial}</div>
                  <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{p.role}</p>
                  <a href={p.href} className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors">{p.phone}</a>
                </div>
              ))}
              <div className="col-span-2 bg-gray-800 rounded-2xl p-6 text-center">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "Supportive, flexible &amp; knowledgeable — with top notch facilities."
                </p>
                <p className="text-gray-500 text-xs mt-3">— A happy kitchen client</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">The Space</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">#cook #create #collaborate</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              We'd love to show you around in person — but until then, take a look at our purpose-built space.
            </p>
          </div>
        </div>

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <GallerySlider />
        </div>

        <div className="text-center mt-10">
          <a href="https://my.matterport.com/show/?m=NYMyUQ42dtt&sr=.1.,07&ss=7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200">
            <Play className="w-5 h-5" /> Watch Virtual Tour
          </a>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-20 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">What Our Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Loved by food entrepreneurs</h2>
          </div>

          <TestimonialSlider />

          <div className="mt-10 text-center">
            <a
              href="https://www.google.com/search?sca_esv=850143cf7043b25d&rlz=1C5GCEM_enAU1105AU1106&sxsrf=ANbL-n7VvDNy0FOHX_WzQARI7e_qNKpWfw:1781671390284&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOU2h-D-w3Itgo6wYYiTh1xAZjrI8L2cOUn25-Pg9272_D3XU1ZnHej8iNXaL8-bMJ0muywLC1lPw9M6VhAokgARlsv3NBvlS5wytYFuGdpUmSWnIBQ%3D%3D&q=Norwood+Commercial+Kitchen+Reviews&sa=X&ved=2ahUKEwig1suSu42VAxVPe_UHHZvQNGcQ0bkNegQINRAH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold text-gray-700">See all our Google Reviews</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => (
                  <svg key={n} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Follow Along</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">@norwoodcommercialkitchen</h2>
              <p className="text-gray-500 mt-2 text-sm">Real people, real kitchens, real food businesses.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="https://www.instagram.com/norwoodcommercialkitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white text-sm font-semibold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/102043932657134"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] text-white text-sm font-semibold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
                Facebook
              </a>
            </div>
          </div>
          <InstagramSlider />
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Free Resources</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tools to help you grow</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="https://img1.wsimg.com/blobby/go/fcc43e64-195c-4fe2-bb85-ba45fef6db14/downloads/ed509c01-8393-4d32-80af-8acf04efec55/Starting%20a%20Food%20Business.pdf?ver=1770179501249"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer group block"
            >
              <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <BookOpen className="w-5 h-5 text-red-600"/>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Start Guide</h3>
              <p className="text-sm text-gray-500 mb-3">Free guide on starting and growing your food business from scratch.</p>
              <span className="text-red-600 text-sm font-semibold">Get Free Guide →</span>
            </a>
            <a
              href="https://img1.wsimg.com/blobby/go/fcc43e64-195c-4fe2-bb85-ba45fef6db14/downloads/9b9f5aab-8e97-492e-a943-a92693b2bd70/Cost%20Analysis.xlsx?ver=1770179501249"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer group block"
            >
              <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <Calculator className="w-5 h-5 text-red-600"/>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cost Analysis</h3>
              <p className="text-sm text-gray-500 mb-3">Spreadsheet tool to calculate costs and profitability for your food business.</p>
              <span className="text-red-600 text-sm font-semibold">Download Spreadsheet →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-4">Everything you need to know about renting Norwood Commercial Kitchen.</p>
          </div>
          <FAQAccordion />
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm mb-4">Still have questions? We'd love to hear from you.</p>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
              Get in Touch <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Book Your Kitchen Hire</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Ready to start your food business?</h2>
            <p className="text-gray-500">Adelaide&apos;s most accessible commercial kitchen hire — 59 Queen Street, Norwood SA 5067</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md mb-12 h-72">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.39883565678!2d138.6358423760478!3d-34.9215330743527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0c9fb0f9405db%3A0xf070e900ca6aeec2!2sNorwood%20Commercial%20Kitchen!5e0!3m2!1sen!2sau!4v1782004822937!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Norwood Commercial Kitchen location"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-3">Get in Touch</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact us to book</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Contact Georgie or Louise to discuss bookings, arrange a visit, or ask any questions about the facility.
              </p>
              <div className="space-y-5">
                {[
                  { icon: <Phone className="w-5 h-5 text-red-600"/>, label: "Phone", content: (
                    <>
                      <a href={`tel:${content.contact_georgie.replace(/\s/g,'')}`} className="text-gray-600 text-sm hover:text-red-600 transition-colors block">Georgie: {content.contact_georgie}</a>
                      <a href={`tel:${content.contact_louise.replace(/\s/g,'')}`} className="text-gray-600 text-sm hover:text-red-600 transition-colors block">Louise: {content.contact_louise}</a>
                    </>
                  )},
                  { icon: <Mail className="w-5 h-5 text-red-600"/>, label: "Email", content: (
                    <a href={`mailto:${content.contact_email}`} className="text-gray-600 text-sm hover:text-red-600 transition-colors">
                      {content.contact_email}
                    </a>
                  )},
                  { icon: <MapPin className="w-5 h-5 text-red-600"/>, label: "Address", content: (
                    <div>
                      <p className="text-gray-600 text-sm">{content.contact_address}<br/>{content.contact_suburb}</p>
                      <a
                        href="https://www.google.com/maps?rlz=1C5GCEM_enAU1105AU1106&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBBzE5NGowajSoAgCwAgE&um=1&ie=UTF-8&fb=1&gl=au&sa=X&geocode=KdsFlA_7ybBqMcLuasoA6XDw&daddr=59+Queen+St,+Norwood+SA+5067"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-red-600 text-sm font-medium hover:text-red-700 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" /> Get Directions
                      </a>
                    </div>
                  )},
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-white font-semibold mb-1">Norwood Commercial Kitchen</p>
              <p className="text-sm text-gray-400">Adelaide&apos;s premier commercial kitchen hire</p>
              <p className="text-sm mt-1">59 Queen Street, Norwood SA 5067</p>
              <p className="text-sm">hello@norwoodcommercialkitchen.com.au</p>
              {/* Social links */}
              <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
                <a
                  href="https://www.instagram.com/norwoodcommercialkitchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/102043932657134"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#1877F2] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              {["Home","About","Gallery","FAQ","Contact"].map(item => (
                <a key={item} href={`/#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-200">{item}</a>
              ))}
            </nav>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-600">
            <p>&copy; 2026 Norwood Commercial Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
