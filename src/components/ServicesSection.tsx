import React, { useState } from 'react';
import { Eye, Sparkles, Activity, Baby, CircleDot, Droplets, Search, X, ArrowRight } from 'lucide-react';
import { servicesData, TranslationSet } from '../translations';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  Sparkles,
  Activity,
  Baby,
  CircleDot,
  Droplets,
  Search
};

interface ServicesSectionProps {
  lang: 'en' | 'te';
  t: TranslationSet;
}

export default function ServicesSection({ lang, t }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);

  return (
    <section id="services" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {t.servicesTitle}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 font-sans">
            {t.servicesSub}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Eye;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title[lang]}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description[lang]}
                  </p>
                </div>
                
                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mt-auto self-start cursor-pointer group"
                >
                  {lang === 'en' ? 'Learn More' : 'మరింత తెలుసుకోండి'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Lightbox for detailed service */}
      {selectedService && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                  {(() => {
                    const ModalIcon = iconMap[selectedService.icon] || Eye;
                    return <ModalIcon className="w-6 h-6" />;
                  })()}
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {selectedService.title[lang]}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                {selectedService.description[lang]}
              </p>

              {/* Supplementary clinical content based on service */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-xs text-slate-500 font-sans space-y-3">
                <p className="font-semibold text-slate-700">
                  {lang === 'en' ? 'Patient Care Guidelines:' : 'రోగులకు సూచనలు:'}
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  {lang === 'en' ? (
                    <>
                      <li>Full scanning diagnostics are conducted using advanced imaging devices before any procedure.</li>
                      <li>Consultation timings: 10:00 AM to 7:00 PM (Monday through Saturday).</li>
                      <li>Affordable payment schemes and complete post-operative checkups are guaranteed.</li>
                    </>
                  ) : (
                    <>
                      <li>చికిత్సకు ముందు అత్యాధునిక పరికరాల ద్వారా పూర్తి కంటి స్క్రీనింగ్ పరీక్షలు నిర్వహించబడతాయి.</li>
                      <li>వైద్యుల సంప్రదింపు సమయాలు: ఉదయం 10:00 నుండి సాయంత్రం 7:00 వరకు (సోమవారం నుండి శనివారం).</li>
                      <li>అత్యంత తక్కువ ఖర్చుతో కూడిన శస్త్రచికిత్స ప్యాకేజీలు మరియు ఆపరేషన్ తర్వాత ఉచిత కంటి పరీక్షలు లభిస్తాయి.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* CTA in Modal */}
            <div className="px-8 py-5 bg-slate-50 flex justify-end border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedService(null);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {t.bookAppointment}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
