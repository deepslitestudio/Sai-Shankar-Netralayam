import { useState } from 'react';
import { TranslationSet } from '../translations';
import { X, ZoomIn, Eye } from 'lucide-react';

// Import generated asset paths
import clinicInterior from '../assets/images/clinic_interior_1782885195016.jpg';
import heroSlitLamp from '../assets/images/hero_slit_lamp_1782885157457.jpg';

interface GallerySectionProps {
  lang: 'en' | 'te';
  t: TranslationSet;
}

export default function GallerySection({ lang, t }: GallerySectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      src: clinicInterior,
      title: {
        en: "Modern Patient Waiting Area",
        te: "ఆధునిక వెయిటింగ్ హాల్ మరియు రిసెప్షన్"
      },
      desc: {
        en: "Clean, hygienic, and climate-controlled reception space for patient convenience.",
        te: "రోగుల సౌకర్యం కొరకు ఎయిర్ కండిషన్డ్ చేయబడిన అత్యంత పరిశుభ్రమైన ప్రాంగణం."
      }
    },
    {
      src: heroSlitLamp,
      title: {
        en: "Slit Lamp Biomicroscope Eye Exam",
        te: "స్లిట్ ల్యాంప్ మైక్రోస్కోప్ కంటి పరీక్ష"
      },
      desc: {
        en: "Detailed micro-imaging examination for cataracts, cornea, and interior eye structures.",
        te: "కంటి శుక్లాలు మరియు లోపలి కంటి పొరలను కచ్చితంగా పరీక్షించే ఆధునిక స్క్రీనింగ్."
      }
    },
    {
      src: "https://picsum.photos/seed/eyescan/800/600",
      title: {
        en: "Autorefractor Vision Diagnostics",
        te: "కంప్యూటర్ కంటి పరీక్ష పరికరం"
      },
      desc: {
        en: "Automated optical refraction scanning for high-precision spectacle power testing.",
        te: "కళ్లజోళ్ల సైజును సులువగా మరియు కచ్చితత్వంతో నిర్ధారించే అత్యాధునిక కంప్యూటర్ మిషన్."
      }
    },
    {
      src: "https://picsum.photos/seed/optometrydevice/800/600",
      title: {
        en: "Ophthalmoscope Inspection",
        te: "ఆఫ్తాల్మోస్కోపిక్ పరీక్షా పరికరాలు"
      },
      desc: {
        en: "Advanced optic nerve and retina checkup equipment.",
        te: "కంటి నరాలు మరియు రెటీనా పొరలను విశ్లేషించే ప్రొఫెషనల్ పరికరాలు."
      }
    },
    {
      src: "https://picsum.photos/seed/clinicroom/800/600",
      title: {
        en: "Consultation & Exam Room",
        te: "వైద్యుల సంప్రదింపు గది"
      },
      desc: {
        en: "Private, clean clinical rooms for personal diagnostics and doctor analysis.",
        te: "వ్యక్తిగత కంటి సమస్యలను చర్చించడానికి సురక్షితమైన, ప్రశాంతమైన గది."
      }
    },
    {
      src: "https://picsum.photos/seed/spectacleshop/800/600",
      title: {
        en: "Spectacle & Frame Collection",
        te: "కళ్లజోళ్లు & ఫ్రేమ్స్ కలెక్షన్"
      },
      desc: {
        en: "Affordable, high-durability optical lens materials and stylish frames on-site.",
        te: "నాణ్యమైన కంటి అద్దాలు మరియు ట్రెండీ ఫ్రేమ్స్ ఆసుపత్రిలోనే అందుబాటులో ఉన్నాయి."
      }
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {t.galleryTitle}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 font-sans">
            {t.gallerySub}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer relative"
            >
              {/* Image box */}
              <div className="relative overflow-hidden aspect-4/3">
                <img
                  src={item.src}
                  alt={item.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-teal-600 shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5">
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  {item.title[lang]}
                </h4>
                <p className="text-slate-500 text-xs font-sans line-clamp-2">
                  {item.desc[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Zoom Overlay */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-50 p-4">
          
          {/* Close button top right */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Picture Box */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <img
              src={galleryItems[activeImageIndex].src}
              alt={galleryItems[activeImageIndex].title[lang]}
              className="max-h-[70vh] rounded-2xl object-contain max-w-full shadow-2xl animate-in fade-in duration-200"
              referrerPolicy="no-referrer"
            />
            
            {/* Context bar */}
            <div className="mt-6 text-center max-w-2xl px-4">
              <h3 className="text-white text-xl font-bold mb-2">
                {galleryItems[activeImageIndex].title[lang]}
              </h3>
              <p className="text-slate-300 text-sm font-sans">
                {galleryItems[activeImageIndex].desc[lang]}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-8 mt-6">
              <button
                onClick={() => setActiveImageIndex((prev) => prev !== null ? (prev === 0 ? galleryItems.length - 1 : prev - 1) : null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
              >
                {lang === 'en' ? 'Previous' : 'వెనుకకు'}
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => prev !== null ? (prev === galleryItems.length - 1 ? 0 : prev + 1) : null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
              >
                {lang === 'en' ? 'Next' : 'ముందుకు'}
              </button>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
