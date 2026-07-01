import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  MessageSquare,
  Menu,
  X,
  ShieldCheck,
  Cpu,
  Award,
  Coins,
  ChevronRight,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

import { translations, whyChooseData, servicesData } from './translations';
import ServicesSection from './components/ServicesSection';
import DoctorSection from './components/DoctorSection';
import LocationSection from './components/LocationSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';

// Import assets
import logoImage from './assets/images/hospital_logo_1782885175992.jpg';
import heroBgImage from './assets/images/hero_slit_lamp_1782885157457.jpg';

export default function App() {
  const [lang, setLang] = useState<'en' | 'te'>('te');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  // Guest booking form state
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestDate, setGuestDate] = useState('');
  const [guestTimeSlot, setGuestTimeSlot] = useState('Morning (10:00 AM - 1:00 PM)');
  const [guestService, setGuestService] = useState('cataract');
  const [guestSymptoms, setGuestSymptoms] = useState('');

  // Handle language toggle
  const toggleLanguage = (selectedLang: 'en' | 'te') => {
    setLang(selectedLang);
  };

  // Pre-fill WhatsApp message for guest bookings
  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim() || !guestDate) return;

    const selectedSvcName = servicesData.find(s => s.id === guestService)?.title[lang] || guestService;
    const whatsappMsg = `Hello Sai Shankar Netralayam, I want to book an eye appointment:\n\n` +
      `- Patient Name: ${guestName.trim()}\n` +
      `- Phone Number: ${guestPhone.trim()}\n` +
      `- Preferred Date: ${guestDate}\n` +
      `- Time Slot: ${guestTimeSlot}\n` +
      `- Eye Care Service: ${selectedSvcName}\n` +
      (guestSymptoms.trim() ? `- Symptoms: ${guestSymptoms.trim()}\n` : '') +
      `Please let me know if this slot is available. Thank you!`;

    const encodedText = encodeURIComponent(whatsappMsg);
    const waUrl = `https://wa.me/919490786566?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className={`min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white ${lang === 'te' ? 'lang-te' : 'lang-en'}`}>
      
      {/* ==========================================
          HEADER (STICKY)
          ========================================== */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo & Name */}
          <a href="#home" className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer">
            <img
              src={logoImage}
              alt="Sai Shankar Netralayam Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <span className="block font-sans font-extrabold text-teal-800 text-sm sm:text-lg tracking-tight leading-tight group-hover:text-teal-700 transition-colors">
                {t.hospitalName}
              </span>
              <span className="block text-[9px] sm:text-[11px] font-medium text-slate-500 tracking-wider">
                {lang === 'en' ? 'COMPLETE EYE CARE' : 'కంటి ఆరోగ్యం • సంపూర్ణ దృష్టి'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link anchors */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-teal-600 transition-colors">
              {lang === 'en' ? 'About Us' : 'మా గురించి'}
            </a>
            <a href="#services" className="hover:text-teal-600 transition-colors">
              {lang === 'en' ? 'Services' : 'మా సేవలు'}
            </a>
            <a href="#doctor" className="hover:text-teal-600 transition-colors">
              {lang === 'en' ? 'Meet Doctor' : 'మా వైద్యులు'}
            </a>
            <a href="#gallery" className="hover:text-teal-600 transition-colors">
              {lang === 'en' ? 'Gallery' : 'గ్యాలరీ'}
            </a>
            <a href="#testimonials" className="hover:text-teal-600 transition-colors">
              {lang === 'en' ? 'Testimonials' : 'రోగుల అభిప్రాయాలు'}
            </a>
            <a href="#booking" className="hover:text-teal-600 transition-colors">
              {lang === 'en' ? 'Book Slot' : 'అపాయింట్మెంట్'}
            </a>
            <a href="#location" className="hover:text-teal-600 transition-colors">
              {lang === 'en' ? 'Location' : 'చిరునామా'}
            </a>
          </nav>

          {/* Right Action Block (Language toggle + Call CTA) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Language Toggle (Persistent) */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => toggleLanguage('te')}
                className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  lang === 'te'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Call icon button desktop */}
            <a
              href="tel:+919490786566"
              className="hidden xs:inline-flex items-center space-x-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl border border-teal-100 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-teal-600 animate-pulse" />
              <span className="hidden md:inline">+91 94907 86566</span>
            </a>

            {/* Hamburger button (Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-50 border border-slate-100 text-slate-600 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3 font-semibold text-slate-700">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {lang === 'en' ? 'About Our Hospital' : 'మా ఆసుపత్రి గురించి'}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {lang === 'en' ? 'Services Offered' : 'మా వైద్య సేవలు'}
              </a>
              <a
                href="#doctor"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {lang === 'en' ? 'Meet the Specialist' : 'మా కంటి వైద్యులు'}
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {lang === 'en' ? 'Clinic Gallery' : 'ఆసుపత్రి గ్యాలరీ'}
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {lang === 'en' ? 'Patient Testimonials' : 'రోగుల అనుభవాలు'}
              </a>
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {lang === 'en' ? 'Patient Portal / Booking' : 'అపాయింట్మెంట్ పోర్టల్'}
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {lang === 'en' ? 'Location & Hours' : 'మ్యాప్ & సమయాలు'}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section id="home" className="relative min-h-[500px] lg:min-h-[640px] flex items-center bg-slate-900 text-white overflow-hidden">
        
        {/* Background Image with darken gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt="Doctor examining patient with slit lamp"
            className="w-full h-full object-cover object-center opacity-40 scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
          <div className="max-w-2xl text-left">
            
            {/* Dynamic animation of specs frame */}
            <span className="inline-flex flex-col items-start mb-6 select-none relative group">
              <div className="flex items-center space-x-3.5 bg-slate-950/60 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-teal-500/30 shadow-xl shadow-teal-950/50">
                {/* Specs Frame Container */}
                <motion.div
                  className="relative w-16 h-8 flex items-center justify-center shrink-0"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Glowing lens backlights */}
                  <div className="absolute inset-0 flex justify-between px-3 pointer-events-none">
                    <motion.div 
                      className="w-5 h-5 bg-teal-500/25 blur-md rounded-full mt-1.5"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="w-5 h-5 bg-teal-500/25 blur-md rounded-full mt-1.5"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3
                      }}
                    />
                  </div>

                  {/* SVG Spectacles Frame */}
                  <svg
                    viewBox="0 0 120 60"
                    className="w-full h-full text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Frame Paths with stroke-draw entry effect */}
                    <motion.path
                      d="M 5 25 C 10 25, 15 20, 18 20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.rect
                      x="18"
                      y="14"
                      width="34"
                      height="24"
                      rx="12"
                      className="stroke-teal-300"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M 52 25 Q 60 17 68 25"
                      className="stroke-teal-400"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.0, ease: "easeInOut" }}
                    />
                    <motion.rect
                      x="68"
                      y="14"
                      width="34"
                      height="24"
                      rx="12"
                      className="stroke-teal-300"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M 102 20 C 105 20, 110 25, 115 25"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Lens Scanline / Healing Wave */}
                    <g style={{ clipPath: 'inset(14px 18px 22px 18px)' }}>
                      <motion.line
                        x1="18"
                        y1="14"
                        x2="102"
                        y2="14"
                        stroke="#2dd4bf"
                        strokeWidth="1.5"
                        opacity="0.8"
                        animate={{
                          y: [0, 24, 0],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </g>
                  </svg>
                </motion.div>

                {/* Text Label */}
                <div className="flex flex-col text-left">
                  <span className="text-teal-300 font-extrabold text-[11px] tracking-wider uppercase font-sans flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                    <span>{t.tagline}</span>
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase tracking-widest">
                    {lang === 'en' ? 'Laser Sight • Advanced Care' : 'లేజర్ విజన్ • అత్యాధునిక చికిత్స'}
                  </span>
                </div>
              </div>
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none text-white mb-6">
              {t.heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-xl font-sans">
              {t.heroSupporting}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col xs:flex-row gap-4 items-stretch xs:items-center">
              <a
                href="#booking"
                className="inline-flex items-center justify-center space-x-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold px-8 py-4 rounded-2xl transition-all cursor-pointer shadow-lg shadow-teal-500/10 hover:shadow-teal-500/25 hover:translate-y-[-1px]"
              >
                <span>{t.bookAppointment}</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+919490786566"
                className="inline-flex items-center justify-center space-x-2 bg-slate-800/80 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl border border-slate-700 transition-all cursor-pointer hover:translate-y-[-1px]"
              >
                <Phone className="w-4.5 h-4.5 text-teal-400 shrink-0" />
                <span>{t.callNow}</span>
              </a>
            </div>

          </div>
        </div>

      </section>

      {/* ==========================================
          TRUST STRIP BAR / STATS BAR
          ========================================== */}
      <section className="border-y border-slate-200 relative z-10 shrink-0 font-sans">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 text-center">
          
          {/* Experience */}
          <div className="bg-[#F1F8E9] py-8 px-6 text-center border-r border-b md:border-b-0 border-slate-200 flex flex-col items-center justify-center">
            <Award className="w-6 h-6 text-[#33691E] mb-2 shrink-0" />
            <span className="text-2xl sm:text-3xl font-extrabold text-[#33691E] tracking-tight leading-none mb-1 font-sans">10+ Years</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#558B2F] tracking-wide uppercase">{t.experienceTitle}</span>
          </div>

          {/* Advanced tech */}
          <div className="bg-white py-8 px-6 text-center border-r-0 sm:border-r border-b md:border-b-0 border-slate-200 flex flex-col items-center justify-center">
            <Cpu className="w-6 h-6 text-[#006064] mb-2 shrink-0" />
            <span className="text-2xl sm:text-3xl font-extrabold text-[#006064] tracking-tight leading-none mb-1 font-sans">Modern</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#00838F] tracking-wide uppercase">{t.equipmentTitle}</span>
          </div>

          {/* Patient trust */}
          <div className="bg-[#E1F5FE] py-8 px-6 text-center border-r border-slate-200 flex flex-col items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#01579B] mb-2 shrink-0" />
            <span className="text-2xl sm:text-3xl font-extrabold text-[#01579B] tracking-tight leading-none mb-1 font-sans">1000+</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#0277BD] tracking-wide uppercase">{t.patientTitle}</span>
          </div>

          {/* Affordable */}
          <div className="bg-white py-8 px-6 text-center flex flex-col items-center justify-center">
            <Coins className="w-6 h-6 text-[#4527A0] mb-2 shrink-0" />
            <span className="text-2xl sm:text-3xl font-extrabold text-[#4527A0] tracking-tight leading-none mb-1 font-sans">Affordable</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#6A1B9A] tracking-wide uppercase">{t.affordableTitle}</span>
          </div>

        </div>
      </section>

      {/* ==========================================
          ABOUT THE HOSPITAL
          ========================================== */}
      <section id="about" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual indicators */}
            <div className="lg:col-span-5 relative">
              <div className="bg-slate-100 border border-slate-200 rounded-3xl p-8 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full mb-4 inline-block font-sans">
                  {lang === 'en' ? 'OUR MISSION' : 'మన ధ్యేయం'}
                </span>
                
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                  {t.trustBadgeTitle}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                  {t.trustBadgeDesc}
                </p>

                {/* Bullets with icons */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-6 h-6 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{lang === 'en' ? 'Zero-Stitch Surgery' : 'కుట్లు లేని శస్త్రచికిత్స'}</p>
                      <p className="text-xs text-slate-500 font-sans">{lang === 'en' ? 'Advanced micro-incision cataract procedures' : 'ఫెకో పద్ధతి ద్వారా కుట్టు లేని కంటి శుక్లాల ట్రీట్మెంట్'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-6 h-6 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{lang === 'en' ? 'Automated Diagnostics' : 'ఆటోమేటిక్ టెస్టింగ్'}</p>
                      <p className="text-xs text-slate-500 font-sans">{lang === 'en' ? 'Exact computer vision readings for high accuracy' : 'కచ్చితమైన పవర్ టెస్టింగ్ మరియు కంటి ఒత్తిడి పరీక్షలు'}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: About content text */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full mb-4 inline-block font-sans">
                {lang === 'en' ? 'CLINIC PROFILE' : 'క్లినిక్ సమాచారం'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2 mb-6">
                {t.aboutTitle}
              </h2>
              <div className="w-12 h-1 bg-teal-600 mb-6 rounded-full"></div>
              <p className="text-slate-600 text-base leading-relaxed font-sans">
                {t.aboutDesc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          MEET THE DOCTOR SECTION
          ========================================== */}
      <DoctorSection lang={lang} t={t} />

      {/* ==========================================
          SERVICES / TREATMENTS GRID
          ========================================== */}
      <ServicesSection lang={lang} t={t} />

      {/* ==========================================
          WHY CHOOSE US SECTION
          ========================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full mb-4 inline-block font-sans">
              {lang === 'en' ? 'OUR STANDARDS' : 'మన ప్రమాణాలు'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2 mb-4">
              {t.whyChooseTitle}
            </h2>
            <div className="w-16 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-slate-600 font-sans">
              {t.whyChooseSub}
            </p>
          </div>

          {/* Standards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseData.map((item) => {
              // Map icons dynamically
              let IconComp = ShieldCheck;
              if (item.icon === 'UserCheck') IconComp = Award;
              if (item.icon === 'Cpu') IconComp = Cpu;
              if (item.icon === 'ShieldCheck') IconComp = ShieldCheck;
              if (item.icon === 'Coins') IconComp = Coins;

              return (
                <div
                  key={item.id}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-xs transition-shadow"
                >
                  <div className="w-11 h-11 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-5 shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {item.title[lang]}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    {item.description[lang]}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================================
          FACILITY PHOTO GALLERY SECTION
          ========================================== */}
      <GallerySection lang={lang} t={t} />

      {/* ==========================================
          PATIENT TESTIMONIALS SECTION
          ========================================== */}
      <TestimonialsSection lang={lang} t={t} />

      {/* ==========================================
          BOOKING & APPOINTMENT SECTION
          ========================================== */}
      <section id="booking" className="py-20 bg-slate-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full mb-4 inline-block font-sans">
              {lang === 'en' ? 'APPOINTMENTS' : 'బుకింగ్ సమాచారం'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-2 mb-4">
              {lang === 'en' ? 'Book an Appointment' : 'అపాయింట్‌మెంట్ బుక్ చేసుకోండి'}
            </h2>
            <div className="w-16 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-slate-600 font-sans">
              {lang === 'en' 
                ? 'Fill out the form below to schedule a consultation with our specialist optometrist doctor.'
                : 'మా కంటి వైద్య నిపుణులతో సంప్రదించడానికి క్రింది ఫారమ్‌ను పూరించండి.'}
            </p>
          </div>

          {/* Direct Guest Booking Form */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto font-sans">
            <div className="text-center mb-8">
              <span className="inline-flex items-center space-x-1 text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1.5 rounded-full font-sans">
                <span>⚡</span>
                <span>{lang === 'en' ? 'Quick Booking (No Login Required)' : 'త్వరిత బుకింగ్ (లాగిన్ అవసరం లేదు)'}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-2">
                {t.contactTitle}
              </h3>
              <p className="text-slate-500 text-sm">
                {t.contactSub}
              </p>
            </div>

            <form onSubmit={handleGuestSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide font-sans">{t.formName}</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500"
                  placeholder="e.g. Ln. Anusuri Nageswarao"
                />
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide font-sans">{t.formPhone}</label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500"
                  placeholder="9490786566"
                />
              </div>

              {/* Appt Date */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide font-sans">{t.formDate}</label>
                <input
                  type="date"
                  required
                  value={guestDate}
                  onChange={(e) => setGuestDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500"
                />
              </div>

              {/* Time slot dropdown */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide font-sans">{t.formTimeSlot}</label>
                <select
                  value={guestTimeSlot}
                  onChange={(e) => setGuestTimeSlot(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500 cursor-pointer"
                >
                  <option value="Morning (10:00 AM - 1:00 PM)">{lang === 'en' ? 'Morning (10:00 AM - 1:00 PM)' : 'ఉదయం (10:00 నుండి 1:00 వరకు)'}</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">{lang === 'en' ? 'Afternoon (1:00 PM - 4:00 PM)' : 'మధ్యాహ్నం (1:00 నుండి 4:00 వరకు)'}</option>
                  <option value="Evening (4:00 PM - 7:00 PM)">{lang === 'en' ? 'Evening (4:00 PM - 7:00 PM)' : 'సాయంత్రం (4:00 నుండి 7:00 వరకు)'}</option>
                </select>
              </div>

              {/* Services Dropdown */}
              <div className="sm:col-span-2 flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide font-sans">{t.formService}</label>
                <select
                  value={guestService}
                  onChange={(e) => setGuestService(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500 cursor-pointer"
                >
                  {servicesData.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.title[lang]}
                    </option>
                  ))}
                </select>
              </div>

              {/* symptoms details textarea */}
              <div className="sm:col-span-2 flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide font-sans">{t.formSymptoms}</label>
                <textarea
                  rows={4}
                  value={guestSymptoms}
                  onChange={(e) => setGuestSymptoms(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-sans font-medium text-slate-800 focus:outline-hidden focus:border-teal-500 resize-none"
                  placeholder={lang === 'en' ? "List any symptoms briefly (e.g. blurry vision, cataract concerns)..." : "మీ కంటి సమస్య వివరాలను ఇక్కడ వివరించండి..."}
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="sm:col-span-2 pt-4 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-10 py-4 rounded-2xl transition-all cursor-pointer shadow-lg shadow-emerald-600/15"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-100" />
                  <span>{t.submitWhatsApp}</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* ==========================================
          LOCATION & WORKING HOURS SECTION
          ========================================== */}
      <LocationSection lang={lang} t={t} />

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer className="bg-slate-900 text-slate-400 py-16 shrink-0 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            
            {/* Col 1: Hospital profile */}
            <div className="md:col-span-5 text-left space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt={t.hospitalName}
                  className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                  referrerPolicy="no-referrer"
                />
                <span className="font-extrabold text-white text-lg tracking-tight">
                  {t.hospitalName}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
                {lang === 'en'
                  ? 'Bilingual primary eye care center based in Yeleswaram. Offering modern diagnostics, experienced ophthalmological specialists, and budget-friendly cataract operations.'
                  : 'ఏలేశ్వరం చుట్టుపక్కల ప్రజలందరికీ నమ్మకమైన, ఆధునిక మరియు అత్యంత తక్కువ ఖర్చుతో కూడిన కంటి వైద్య చికిత్సలు అందించే ఏకైక సంస్థ.'}
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="md:col-span-3 text-left space-y-3">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider font-sans">
                {lang === 'en' ? 'Quick Navigation' : 'త్వరిత నావిగేషన్'}
              </h4>
              <ul className="space-y-2 text-xs font-sans">
                <li><a href="#about" className="hover:text-teal-400 transition-colors">About Hospital</a></li>
                <li><a href="#services" className="hover:text-teal-400 transition-colors">Eye Care Services</a></li>
                <li><a href="#doctor" className="hover:text-teal-400 transition-colors">Specialist Doctor</a></li>
                <li><a href="#gallery" className="hover:text-teal-400 transition-colors">Facility Photos</a></li>
              </ul>
            </div>

            {/* Col 3: Quick Contacts */}
            <div className="md:col-span-4 text-left space-y-3">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider font-sans">
                {lang === 'en' ? 'Immediate Assistance' : 'త్యవసర సంప్రదింపులకు'}
              </h4>
              <div className="space-y-2 text-xs font-sans">
                <p className="text-slate-300 font-semibold flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>+91 94907 86566</span>
                </p>
                <p className="text-slate-400 flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Lingamparthi Road, Yeleswaram</span>
                </p>
                <p className="text-slate-400 flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>10:00 AM – 7:00 PM</span>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom section */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <div className="space-y-1">
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                {t.footerRights}
              </p>
              <p className="text-[10px] text-slate-600 font-sans">
                {lang === 'en' ? 'Designed and Developed by ' : 'రూపకల్పన మరియు అభివృద్ధి: '}<span className="text-teal-500/80 font-semibold">Deepslite Studio</span>
              </p>
            </div>
            <div className="text-[11px] text-slate-600 font-sans">
              <span>Bilingual: EN | TE </span>
            </div>
          </div>

        </div>
      </footer>

      {/* ==========================================
          STICKY FLOATING MOBILE CTA BAR (MOBILE-CRITICAL)
          ========================================== */}
      <div className="xs:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 p-3 grid grid-cols-2 gap-3 z-30 shadow-2xl">
        <a
          href="tel:+919490786566"
          className="inline-flex items-center justify-center space-x-2 bg-teal-600 active:bg-teal-700 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md cursor-pointer"
        >
          <Phone className="w-4 h-4 text-teal-100" />
          <span>{lang === 'en' ? 'Call Now' : 'కాల్ చేయండి'}</span>
        </a>
        <a
          href="https://wa.me/919490786566?text=Hello%20Sai%20Shankar%20Netralayam%2C%20I%20would%20like%20to%20book%20an%20appointment%20or%20ask%20about%20your%20services."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-emerald-600 active:bg-emerald-700 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-emerald-100" />
          <span>WhatsApp</span>
        </a>
      </div>

    </div>
  );
}
